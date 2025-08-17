-- Create data versioning and archival system
-- This migration sets up tables for managing dynamic K-beauty data updates

-- Data versions table for active data
CREATE TABLE IF NOT EXISTS data_versions (
  id TEXT PRIMARY KEY,
  version TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  data_type TEXT NOT NULL CHECK (data_type IN ('trends', 'products', 'market', 'community', 'insights')),
  data JSONB NOT NULL,
  source TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Data archive table for historical data
CREATE TABLE IF NOT EXISTS data_archive (
  id TEXT PRIMARY KEY,
  version TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  data_type TEXT NOT NULL,
  data JSONB NOT NULL,
  source TEXT NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  archived_at TIMESTAMPTZ DEFAULT NOW(),
  original_created_at TIMESTAMPTZ NOT NULL
);

-- Update configurations table
CREATE TABLE IF NOT EXISTS update_configs (
  id SERIAL PRIMARY KEY,
  data_type TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  update_interval INTEGER NOT NULL, -- in minutes
  retry_attempts INTEGER DEFAULT 3,
  is_enabled BOOLEAN DEFAULT TRUE,
  last_update TIMESTAMPTZ,
  next_update TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update logs table for monitoring
CREATE TABLE IF NOT EXISTS update_logs (
  id SERIAL PRIMARY KEY,
  data_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'partial')),
  message TEXT,
  execution_time INTEGER, -- in milliseconds
  records_updated INTEGER DEFAULT 0,
  error_details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Data quality metrics table
CREATE TABLE IF NOT EXISTS data_quality_metrics (
  id SERIAL PRIMARY KEY,
  data_type TEXT NOT NULL,
  version TEXT NOT NULL,
  completeness_score DECIMAL(5,2), -- percentage
  accuracy_score DECIMAL(5,2), -- percentage
  freshness_hours INTEGER, -- how many hours old the data is
  source_reliability TEXT CHECK (source_reliability IN ('high', 'medium', 'low')),
  validation_errors JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_data_versions_type_active ON data_versions(data_type, is_active);
CREATE INDEX IF NOT EXISTS idx_data_versions_timestamp ON data_versions(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_data_archive_type_archived ON data_archive(data_type, archived_at);
CREATE INDEX IF NOT EXISTS idx_update_logs_type_created ON update_logs(data_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_data_quality_type_created ON data_quality_metrics(data_type, created_at DESC);

-- Insert default update configurations
INSERT INTO update_configs (data_type, source, update_interval, retry_attempts, is_enabled) VALUES
  ('trends', 'k-beauty-api', 60, 3, TRUE),
  ('products', 'product-api', 240, 3, TRUE),
  ('market', 'market-research-api', 1440, 2, TRUE),
  ('community', 'internal-analytics', 30, 3, TRUE),
  ('insights', 'ai-research-api', 360, 2, TRUE)
ON CONFLICT (data_type) DO UPDATE SET
  source = EXCLUDED.source,
  update_interval = EXCLUDED.update_interval,
  retry_attempts = EXCLUDED.retry_attempts,
  updated_at = NOW();

-- Function to automatically update next_update timestamp
CREATE OR REPLACE FUNCTION update_next_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.next_update = NEW.last_update + (NEW.update_interval || ' minutes')::INTERVAL;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update next_update when last_update changes
DROP TRIGGER IF EXISTS trigger_update_next_update ON update_configs;
CREATE TRIGGER trigger_update_next_update
  BEFORE UPDATE OF last_update ON update_configs
  FOR EACH ROW
  EXECUTE FUNCTION update_next_update_timestamp();

-- Function to clean up old archive data (older than 1 year)
CREATE OR REPLACE FUNCTION cleanup_old_archives()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM data_archive 
  WHERE archived_at < NOW() - INTERVAL '1 year';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  INSERT INTO update_logs (data_type, status, message, records_updated)
  VALUES ('archive_cleanup', 'success', 'Cleaned up old archive data', deleted_count);
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get latest data for a specific type
CREATE OR REPLACE FUNCTION get_latest_data(data_type_param TEXT)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT data INTO result
  FROM data_versions
  WHERE data_type = data_type_param AND is_active = TRUE
  ORDER BY timestamp DESC
  LIMIT 1;
  
  RETURN COALESCE(result, '{}'::JSONB);
END;
$$ LANGUAGE plpgsql;

-- Function to validate data quality
CREATE OR REPLACE FUNCTION validate_data_quality(
  data_type_param TEXT,
  version_param TEXT,
  data_param JSONB
)
RETURNS VOID AS $$
DECLARE
  completeness DECIMAL(5,2);
  accuracy DECIMAL(5,2);
  freshness INTEGER;
  reliability TEXT;
BEGIN
  -- Calculate completeness (example logic)
  completeness := CASE 
    WHEN jsonb_array_length(data_param->'trends') > 0 THEN 100.0
    WHEN jsonb_array_length(data_param->'products') > 0 THEN 100.0
    ELSE 0.0
  END;
  
  -- Calculate accuracy (example logic - would be more complex in production)
  accuracy := 95.0; -- Default high accuracy for demonstration
  
  -- Calculate freshness in hours
  freshness := EXTRACT(EPOCH FROM (NOW() - NOW())) / 3600;
  
  -- Determine reliability
  reliability := CASE 
    WHEN completeness >= 90 AND accuracy >= 90 THEN 'high'
    WHEN completeness >= 70 AND accuracy >= 70 THEN 'medium'
    ELSE 'low'
  END;
  
  -- Insert quality metrics
  INSERT INTO data_quality_metrics (
    data_type, version, completeness_score, accuracy_score, 
    freshness_hours, source_reliability
  ) VALUES (
    data_type_param, version_param, completeness, accuracy, 
    freshness, reliability
  );
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE data_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE update_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE update_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_quality_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access to data
CREATE POLICY "Public read access to data_versions" ON data_versions
  FOR SELECT USING (TRUE);

CREATE POLICY "Public read access to data_archive" ON data_archive
  FOR SELECT USING (TRUE);

CREATE POLICY "Public read access to update_configs" ON update_configs
  FOR SELECT USING (TRUE);

-- RLS Policies for authenticated users to manage data
CREATE POLICY "Authenticated users can manage data_versions" ON data_versions
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage update_configs" ON update_configs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view logs" ON update_logs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view quality metrics" ON data_quality_metrics
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create a view for easy data access
CREATE OR REPLACE VIEW current_data AS
SELECT 
  data_type,
  version,
  data,
  source,
  timestamp,
  EXTRACT(EPOCH FROM (NOW() - timestamp))/3600 AS hours_old
FROM data_versions
WHERE is_active = TRUE
ORDER BY data_type;

-- Create a view for data freshness monitoring
CREATE OR REPLACE VIEW data_freshness AS
SELECT 
  uc.data_type,
  uc.update_interval,
  uc.last_update,
  uc.next_update,
  dv.timestamp AS current_data_timestamp,
  CASE 
    WHEN dv.timestamp IS NULL THEN 'no_data'
    WHEN dv.timestamp < NOW() - (uc.update_interval * 2 || ' minutes')::INTERVAL THEN 'stale'
    WHEN dv.timestamp < NOW() - (uc.update_interval || ' minutes')::INTERVAL THEN 'aging'
    ELSE 'fresh'
  END AS freshness_status
FROM update_configs uc
LEFT JOIN data_versions dv ON uc.data_type = dv.data_type AND dv.is_active = TRUE
ORDER BY uc.data_type;