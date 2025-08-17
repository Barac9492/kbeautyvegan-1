-- Strategic Database Enhancements: Seth Godin & Andrew Chen Inspired Features
-- Focus: Permission Marketing, Tribes, Network Effects, Growth Loops, and Differentiated POV

-- ============================================================================
-- SETH GODIN INSPIRED: PERMISSION MARKETING & TRIBES
-- ============================================================================

-- 1. Permission-Based Communication Preferences (Seth Godin's Permission Marketing)
CREATE TABLE IF NOT EXISTS user_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  -- Granular permission levels
  email_trends BOOLEAN DEFAULT false,
  email_product_launches BOOLEAN DEFAULT false,
  email_tribe_updates BOOLEAN DEFAULT false,
  email_personalized_insights BOOLEAN DEFAULT false,
  push_notifications BOOLEAN DEFAULT false,
  sms_alerts BOOLEAN DEFAULT false,
  -- Permission value tracking
  permission_value_score INTEGER DEFAULT 0, -- Higher score = more engaged
  last_engagement_at TIMESTAMPTZ,
  opt_in_source TEXT, -- Where they gave permission
  trust_level INTEGER DEFAULT 1 CHECK (trust_level BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tribes System (Seth Godin's Tribes concept)
CREATE TABLE IF NOT EXISTS tribes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  mission_statement TEXT, -- Clear purpose for the tribe
  leader_id UUID REFERENCES users(id),
  category TEXT NOT NULL, -- 'ingredient-focused', 'brand-loyalist', 'trend-setter', etc.
  member_count INTEGER DEFAULT 0,
  activity_score INTEGER DEFAULT 0,
  is_exclusive BOOLEAN DEFAULT false,
  entry_requirements JSONB, -- Criteria to join
  shared_values TEXT[], -- Common beliefs/values
  rituals JSONB, -- Regular tribe activities
  language JSONB, -- Insider terminology
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tribe_memberships (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tribe_id UUID REFERENCES tribes(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('leader', 'elder', 'contributor', 'member')),
  contribution_score INTEGER DEFAULT 0,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, tribe_id)
);

-- 3. Purple Cow Moments (Remarkable experiences worth talking about)
CREATE TABLE IF NOT EXISTS purple_cow_moments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  moment_type TEXT NOT NULL, -- 'prediction_streak', 'trend_discovery', 'ingredient_insight'
  title TEXT NOT NULL,
  description TEXT,
  remarkability_score INTEGER DEFAULT 0, -- How unique/shareworthy
  shares_count INTEGER DEFAULT 0,
  conversation_starter BOOLEAN DEFAULT false,
  media_urls TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ANDREW CHEN INSPIRED: GROWTH LOOPS & NETWORK EFFECTS
-- ============================================================================

-- 4. Viral Loop Tracking (Andrew Chen's Growth Loop Framework)
CREATE TABLE IF NOT EXISTS viral_loops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  loop_name TEXT NOT NULL, -- 'invite_reward', 'content_creation', 'prediction_challenge'
  loop_type TEXT NOT NULL CHECK (loop_type IN ('acquisition', 'retention', 'monetization')),
  -- Loop metrics
  input_metric TEXT, -- What starts the loop
  action_metric TEXT, -- What users do
  output_metric TEXT, -- What results
  amplification_factor DECIMAL(5,2) DEFAULT 1.0, -- Viral coefficient
  cycle_time_hours INTEGER, -- How long one loop takes
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_viral_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  loop_id UUID REFERENCES viral_loops(id),
  action_type TEXT NOT NULL, -- 'invited', 'shared', 'created_content'
  resulted_in_signup BOOLEAN DEFAULT false,
  resulted_in_action BOOLEAN DEFAULT false,
  virality_score INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Network Effects Measurement (Cross-side and Same-side)
CREATE TABLE IF NOT EXISTS network_nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  node_type TEXT NOT NULL CHECK (node_type IN ('creator', 'curator', 'consumer', 'brand')),
  user_id UUID REFERENCES users(id),
  brand_id UUID REFERENCES brands(id),
  -- Network value metrics
  connections_count INTEGER DEFAULT 0,
  interaction_frequency DECIMAL(5,2), -- interactions per day
  value_created DECIMAL(10,2), -- Economic value generated
  value_captured DECIMAL(10,2), -- Value retained by platform
  network_centrality DECIMAL(5,4), -- How central in the network
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS network_edges (
  from_node_id UUID REFERENCES network_nodes(id) ON DELETE CASCADE,
  to_node_id UUID REFERENCES network_nodes(id) ON DELETE CASCADE,
  edge_type TEXT NOT NULL, -- 'follows', 'collaborates', 'transacts'
  strength DECIMAL(3,2) DEFAULT 0.5, -- Connection strength 0-1
  interactions_count INTEGER DEFAULT 0,
  last_interaction_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (from_node_id, to_node_id, edge_type)
);

-- 6. Content-Market Fit Tracking (Andrew Chen's Product-Market Fit for Content)
CREATE TABLE IF NOT EXISTS content_market_fit (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL, -- 'trend_prediction', 'ingredient_analysis', 'brand_review'
  target_segment TEXT NOT NULL,
  -- Fit metrics
  engagement_rate DECIMAL(5,2),
  retention_rate DECIMAL(5,2),
  viral_coefficient DECIMAL(5,2),
  monetization_rate DECIMAL(5,2),
  nps_score INTEGER,
  fit_score DECIMAL(5,2) GENERATED ALWAYS AS (
    (engagement_rate * 0.3 + retention_rate * 0.3 + 
     viral_coefficient * 0.2 + monetization_rate * 0.2)
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- DIFFERENTIATED VALUE: UNIQUE POV FEATURES
-- ============================================================================

-- 7. Contrarian Insights (Unique perspectives that challenge conventional wisdom)
CREATE TABLE IF NOT EXISTS contrarian_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES users(id),
  insight_type TEXT NOT NULL, -- 'trend_reversal', 'ingredient_myth', 'brand_prediction'
  title TEXT NOT NULL,
  thesis TEXT NOT NULL, -- The contrarian view
  evidence JSONB, -- Supporting data
  confidence_level DECIMAL(3,2),
  -- Validation tracking
  supporters_count INTEGER DEFAULT 0,
  challengers_count INTEGER DEFAULT 0,
  proven_correct BOOLEAN,
  impact_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Micro-Influencer Incubator (Building tomorrow's beauty leaders)
CREATE TABLE IF NOT EXISTS influencer_incubator (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stage TEXT DEFAULT 'seed' CHECK (stage IN ('seed', 'growth', 'established', 'authority')),
  niche TEXT NOT NULL, -- Specific expertise area
  -- Growth metrics
  follower_growth_rate DECIMAL(5,2),
  engagement_quality_score DECIMAL(5,2),
  content_consistency_score DECIMAL(5,2),
  brand_collaboration_count INTEGER DEFAULT 0,
  -- Support provided
  mentorship_hours INTEGER DEFAULT 0,
  resources_accessed TEXT[],
  achievements_unlocked TEXT[],
  next_milestone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Prediction Markets (Wisdom of crowds for trend forecasting)
CREATE TABLE IF NOT EXISTS prediction_markets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  market_question TEXT NOT NULL,
  category TEXT NOT NULL,
  resolution_date DATE NOT NULL,
  -- Market mechanics
  total_shares_yes INTEGER DEFAULT 0,
  total_shares_no INTEGER DEFAULT 0,
  current_probability DECIMAL(3,2), -- Implied probability from market
  liquidity_pool DECIMAL(10,2) DEFAULT 1000.00,
  market_maker_subsidy DECIMAL(10,2) DEFAULT 100.00,
  -- Resolution
  resolved BOOLEAN DEFAULT false,
  outcome BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS market_positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  market_id UUID REFERENCES prediction_markets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  position TEXT CHECK (position IN ('yes', 'no')),
  shares_owned INTEGER DEFAULT 0,
  average_price DECIMAL(5,2),
  current_value DECIMAL(10,2),
  realized_profit DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Ingredient Innovation Lab (Collaborative discovery)
CREATE TABLE IF NOT EXISTS ingredient_experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id),
  ingredient_combination TEXT[],
  hypothesis TEXT NOT NULL,
  test_methodology TEXT,
  -- Results tracking
  testers_count INTEGER DEFAULT 0,
  success_rate DECIMAL(3,2),
  side_effects_reported JSONB,
  breakthrough_potential INTEGER DEFAULT 0 CHECK (breakthrough_potential BETWEEN 0 AND 10),
  -- Commercialization
  brand_interest_count INTEGER DEFAULT 0,
  patent_filed BOOLEAN DEFAULT false,
  revenue_share_percentage DECIMAL(3,2), -- Creator's share if commercialized
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ENGAGEMENT LOOPS & HABIT FORMATION
-- ============================================================================

-- 11. Daily Rituals (Building habits through consistent actions)
CREATE TABLE IF NOT EXISTS daily_rituals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  ritual_type TEXT NOT NULL, -- 'morning_prediction', 'trend_check', 'ingredient_study'
  streak_current INTEGER DEFAULT 0,
  streak_best INTEGER DEFAULT 0,
  completion_time TIME, -- Preferred time for ritual
  reminder_enabled BOOLEAN DEFAULT true,
  -- Rewards
  points_per_completion INTEGER DEFAULT 10,
  bonus_multiplier DECIMAL(3,2) DEFAULT 1.0,
  last_completed_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Challenge System (Time-bound community competitions)
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  challenge_type TEXT NOT NULL, -- 'prediction_accuracy', 'content_creation', 'discovery'
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  -- Participation
  min_participants INTEGER DEFAULT 10,
  max_participants INTEGER,
  entry_fee_points INTEGER DEFAULT 0,
  prize_pool_points INTEGER DEFAULT 1000,
  -- Leaderboard
  scoring_formula TEXT,
  current_leader_id UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS challenge_participants (
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score DECIMAL(10,2) DEFAULT 0,
  rank INTEGER,
  submissions_count INTEGER DEFAULT 0,
  last_submission_at TIMESTAMPTZ,
  PRIMARY KEY (challenge_id, user_id)
);

-- ============================================================================
-- MONETIZATION & VALUE CAPTURE
-- ============================================================================

-- 13. Token Economy (Virtual currency for engagement)
CREATE TABLE IF NOT EXISTS user_wallets (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  beauty_tokens DECIMAL(10,2) DEFAULT 100.00, -- Starting bonus
  earned_total DECIMAL(10,2) DEFAULT 100.00,
  spent_total DECIMAL(10,2) DEFAULT 0.00,
  -- Token velocity
  earn_rate_daily DECIMAL(10,2),
  spend_rate_daily DECIMAL(10,2),
  last_transaction_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS token_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  transaction_type TEXT CHECK (transaction_type IN ('earned', 'spent', 'transferred', 'purchased')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Subscription Tiers Enhanced (Value ladder)
CREATE TABLE IF NOT EXISTS subscription_benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier TEXT NOT NULL,
  benefit_category TEXT NOT NULL, -- 'predictions', 'insights', 'community', 'tools'
  benefit_name TEXT NOT NULL,
  benefit_value TEXT,
  perceived_value DECIMAL(10,2), -- What users think it's worth
  actual_cost DECIMAL(10,2), -- What it costs us
  usage_rate DECIMAL(3,2), -- Percentage of users who use it
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ANALYTICS & INSIGHTS
-- ============================================================================

-- 15. User Journey Mapping
CREATE TABLE IF NOT EXISTS user_journeys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  journey_stage TEXT NOT NULL CHECK (journey_stage IN ('awareness', 'activation', 'retention', 'revenue', 'referral')),
  entered_stage_at TIMESTAMPTZ DEFAULT NOW(),
  actions_in_stage JSONB,
  conversion_probability DECIMAL(3,2),
  churn_risk DECIMAL(3,2),
  lifetime_value_estimate DECIMAL(10,2),
  next_best_action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. A/B Testing Framework
CREATE TABLE IF NOT EXISTS experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experiment_name TEXT NOT NULL,
  hypothesis TEXT NOT NULL,
  metric_to_move TEXT NOT NULL,
  -- Variants
  control_name TEXT DEFAULT 'control',
  variant_names TEXT[],
  traffic_allocation JSONB, -- Percentage per variant
  -- Results
  sample_size INTEGER DEFAULT 0,
  statistical_significance DECIMAL(3,2),
  winner TEXT,
  lift_percentage DECIMAL(5,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiment_assignments (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  variant_name TEXT NOT NULL,
  converted BOOLEAN DEFAULT false,
  metric_value DECIMAL(10,2),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, experiment_id)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX idx_tribe_memberships_user ON tribe_memberships(user_id);
CREATE INDEX idx_tribe_memberships_tribe ON tribe_memberships(tribe_id);
CREATE INDEX idx_viral_actions_user ON user_viral_actions(user_id);
CREATE INDEX idx_viral_actions_loop ON user_viral_actions(loop_id);
CREATE INDEX idx_network_edges_from ON network_edges(from_node_id);
CREATE INDEX idx_network_edges_to ON network_edges(to_node_id);
CREATE INDEX idx_contrarian_insights_author ON contrarian_insights(author_id);
CREATE INDEX idx_prediction_markets_active ON prediction_markets(resolved, resolution_date);
CREATE INDEX idx_market_positions_user ON market_positions(user_id);
CREATE INDEX idx_daily_rituals_user ON daily_rituals(user_id);
CREATE INDEX idx_challenge_participants_user ON challenge_participants(user_id);
CREATE INDEX idx_token_transactions_user ON token_transactions(user_id);
CREATE INDEX idx_user_journeys_user_stage ON user_journeys(user_id, journey_stage);
CREATE INDEX idx_experiment_assignments_exp ON experiment_assignments(experiment_id);

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to update tribe member count
CREATE OR REPLACE FUNCTION update_tribe_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tribes SET member_count = member_count + 1 WHERE id = NEW.tribe_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tribes SET member_count = member_count - 1 WHERE id = OLD.tribe_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tribe_count
AFTER INSERT OR DELETE ON tribe_memberships
FOR EACH ROW EXECUTE FUNCTION update_tribe_member_count();

-- Function to calculate network effects
CREATE OR REPLACE FUNCTION calculate_network_value()
RETURNS TABLE (
  total_nodes INTEGER,
  total_edges INTEGER,
  network_density DECIMAL,
  metcalfe_value DECIMAL,
  reed_value DECIMAL
) AS $$
DECLARE
  node_count INTEGER;
  edge_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO node_count FROM network_nodes;
  SELECT COUNT(*) INTO edge_count FROM network_edges;
  
  RETURN QUERY
  SELECT 
    node_count AS total_nodes,
    edge_count AS total_edges,
    CASE 
      WHEN node_count > 1 THEN 
        edge_count::DECIMAL / (node_count * (node_count - 1))
      ELSE 0
    END AS network_density,
    POWER(node_count, 2)::DECIMAL AS metcalfe_value, -- n^2
    POWER(2, node_count)::DECIMAL AS reed_value; -- 2^n
END;
$$ LANGUAGE plpgsql;

-- Function to track viral coefficient
CREATE OR REPLACE FUNCTION calculate_viral_coefficient(p_loop_id UUID, p_days INTEGER DEFAULT 30)
RETURNS DECIMAL AS $$
DECLARE
  invites_sent INTEGER;
  successful_invites INTEGER;
  viral_k DECIMAL;
BEGIN
  SELECT 
    COUNT(*),
    SUM(CASE WHEN resulted_in_signup THEN 1 ELSE 0 END)
  INTO invites_sent, successful_invites
  FROM user_viral_actions
  WHERE loop_id = p_loop_id
    AND created_at > NOW() - (p_days || ' days')::INTERVAL;
  
  IF invites_sent > 0 THEN
    viral_k := successful_invites::DECIMAL / invites_sent;
  ELSE
    viral_k := 0;
  END IF;
  
  RETURN viral_k;
END;
$$ LANGUAGE plpgsql;

-- Function for permission value scoring
CREATE OR REPLACE FUNCTION update_permission_value_score()
RETURNS TRIGGER AS $$
BEGIN
  NEW.permission_value_score := 
    (CASE WHEN NEW.email_trends THEN 10 ELSE 0 END) +
    (CASE WHEN NEW.email_product_launches THEN 15 ELSE 0 END) +
    (CASE WHEN NEW.email_tribe_updates THEN 20 ELSE 0 END) +
    (CASE WHEN NEW.email_personalized_insights THEN 25 ELSE 0 END) +
    (CASE WHEN NEW.push_notifications THEN 15 ELSE 0 END) +
    (CASE WHEN NEW.sms_alerts THEN 20 ELSE 0 END) +
    (NEW.trust_level * 10);
  
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_permission_score
BEFORE INSERT OR UPDATE ON user_permissions
FOR EACH ROW EXECUTE FUNCTION update_permission_value_score();

-- ============================================================================
-- SAMPLE DATA FOR VIRAL LOOPS
-- ============================================================================

INSERT INTO viral_loops (loop_name, loop_type, input_metric, action_metric, output_metric, cycle_time_hours) VALUES
  ('invite_friends', 'acquisition', 'active_users', 'sends_invites', 'new_signups', 72),
  ('content_creation', 'retention', 'engaged_users', 'creates_content', 'content_views', 24),
  ('prediction_challenge', 'retention', 'daily_users', 'makes_predictions', 'challenge_completions', 168),
  ('tribe_growth', 'acquisition', 'tribe_members', 'invites_to_tribe', 'new_tribe_members', 48),
  ('insight_sharing', 'acquisition', 'insight_creators', 'shares_insight', 'external_traffic', 12)
ON CONFLICT DO NOTHING;

-- Comment explaining the strategic value
COMMENT ON SCHEMA public IS 'Enhanced K-Beauty platform with Seth Godin inspired permission marketing and tribes, plus Andrew Chen growth loops and network effects for sustainable viral growth';