# K-Beauty Data Management System

## 🏗️ System Architecture

The K-Beauty AI platform features a comprehensive data management system that automatically updates and archives beauty trend data, product information, and market intelligence.

### Core Components

1. **Data Versioning System** - Tracks all data changes with full version history
2. **Automated Updates** - Scheduled data fetching from multiple sources
3. **Archive Management** - Intelligent data retention and cleanup
4. **Quality Monitoring** - Data validation and freshness tracking
5. **Real-time Sync** - Live updates across the platform

## 📊 Data Types Managed

### 1. Trends Data
- **Update Frequency**: Every 1 hour
- **Sources**: Google Trends, Social Media APIs, Beauty News, Retail Analytics
- **Content**: K-beauty trend analysis, popularity metrics, growth predictions
- **Archive Retention**: 6 months of active data, 1 year in archive

### 2. Products Data
- **Update Frequency**: Every 4 hours
- **Sources**: Brand APIs, Retailer APIs, Review Sites
- **Content**: Product details, pricing, reviews, vegan verification
- **Archive Retention**: 3 months of active data, 1 year in archive

### 3. Market Data
- **Update Frequency**: Every 24 hours
- **Sources**: Market Research APIs, Industry Reports
- **Content**: Market size, growth rates, regional analysis
- **Archive Retention**: 1 month of active data, 2 years in archive

### 4. Community Data
- **Update Frequency**: Every 30 minutes
- **Sources**: Internal database analytics
- **Content**: User statistics, prediction accuracy, leaderboards
- **Archive Retention**: 1 week of active data, 6 months in archive

### 5. AI Insights Data
- **Update Frequency**: Every 6 hours
- **Sources**: AI Research APIs, Beauty Tech News
- **Content**: AI beauty technology updates, research findings
- **Archive Retention**: 2 months of active data, 1 year in archive

## 🔄 Update Scheduling

### Vercel Cron Jobs

```json
{
  "crons": [
    {
      "path": "/api/cron/update-data",
      "schedule": "0 */1 * * *"  // Every hour
    },
    {
      "path": "/api/cron/archive-cleanup", 
      "schedule": "0 2 * * *"    // Daily at 2 AM
    }
  ]
}
```

### Update Intervals

| Data Type | Interval | Reason |
|-----------|----------|---------|
| Trends | 1 hour | Fast-moving social trends |
| Products | 4 hours | Pricing and availability changes |
| Market | 24 hours | Slower-moving market data |
| Community | 30 minutes | Real-time user engagement |
| Insights | 6 hours | Research publication frequency |

## 🗄️ Archive System

### Automatic Archival

- **Trigger**: When new data version becomes active
- **Process**: Previous version moved to archive table
- **Retention**: Configurable per data type
- **Cleanup**: Automated daily cleanup of old archives

### Archive Structure

```sql
-- Active data table
data_versions (
  id, version, timestamp, data_type, 
  data, source, is_active
)

-- Archive table
data_archive (
  id, version, timestamp, data_type,
  data, source, archived_at, original_created_at
)
```

## 📈 Quality Monitoring

### Data Quality Metrics

- **Completeness Score**: Percentage of expected data fields present
- **Accuracy Score**: Data validation against known benchmarks
- **Freshness**: How recently the data was updated
- **Source Reliability**: Rating based on source track record

### Freshness Status

- **Fresh**: Updated within expected interval
- **Aging**: Approaching update interval
- **Stale**: Past due for update
- **No Data**: No data available

## 🛠️ API Endpoints

### Data Update Endpoint
```
POST /api/cron/update-data
Authorization: Bearer {CRON_SECRET}

Body:
{
  "dataType": "trends|products|market|community|insights",
  "force": boolean
}
```

### Archive Cleanup Endpoint
```
POST /api/cron/archive-cleanup
Authorization: Bearer {CRON_SECRET}
```

### Status Check Endpoint
```
GET /api/cron/update-data
Returns: Data freshness status and recent logs
```

## 🔧 Setup Instructions

### 1. Database Setup

Run the Supabase migration:
```sql
-- Execute: supabase/migrations/20250103_create_data_versioning_system.sql
```

### 2. Environment Variables

Add to Vercel environment variables:
```bash
CRON_SECRET=your_secure_random_string
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Initialize Data

Run the setup script:
```bash
npx tsx scripts/setup-data-system.ts
```

### 4. Deploy to Vercel

Deploy the application to activate cron jobs:
```bash
vercel --prod
```

## 📱 Admin Dashboard

Access the data management dashboard at `/admin/data-management` to:

- Monitor data freshness status
- Trigger manual updates
- View update logs and statistics
- Manage archive cleanup
- Track data quality metrics

### Dashboard Features

- **Real-time Status**: Live data freshness monitoring
- **Manual Controls**: Force updates for any data type
- **Update Logs**: Detailed history of all update operations
- **Archive Stats**: Overview of archived data volumes
- **Quick Actions**: One-click update and cleanup operations

## 🔍 Monitoring & Alerts

### Health Checks

The system provides several monitoring capabilities:

1. **Data Freshness View**: SQL view showing current data status
2. **Update Logs**: Complete audit trail of all operations
3. **Quality Metrics**: Automated data quality scoring
4. **Error Tracking**: Detailed error logging and reporting

### Alerting (Future Enhancement)

Potential integrations for production:
- Slack notifications for failed updates
- Email alerts for stale data
- Dashboard alerts for data quality issues
- Webhook notifications for external systems

## 🚀 Usage in Components

### Using Dynamic Data

```tsx
import { useDataUpdates } from '@/hooks/useDataUpdates'
import { trendsData as fallbackTrends } from '@/lib/data'

function TrendsComponent() {
  const { data, isLoading, error, refreshData } = useDataUpdates({
    dataType: 'trends',
    fallbackData: { trends: fallbackTrends }
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {data.trends.map(trend => (
        <div key={trend.id}>{trend.title}</div>
      ))}
    </div>
  )
}
```

### Real-time Updates

The system automatically:
- Syncs data changes across all connected clients
- Updates UI when new data becomes available
- Handles fallbacks gracefully when data is unavailable
- Provides loading states and error handling

## 🎯 Benefits

### For Users
- **Always Fresh Data**: Latest trends and product information
- **Real-time Updates**: Live community statistics and predictions
- **Reliable Service**: Fallback data ensures platform availability
- **Fast Performance**: Cached data with intelligent updates

### For Administrators
- **Full Visibility**: Complete audit trail and monitoring
- **Easy Management**: Simple dashboard for data operations
- **Automated Operations**: Hands-off data management
- **Quality Assurance**: Built-in data validation and quality metrics

### For Developers
- **Clean Architecture**: Separation of data logic and presentation
- **Extensible Design**: Easy to add new data sources and types
- **Type Safety**: Full TypeScript support throughout
- **Error Handling**: Comprehensive error management and recovery

## 🔮 Future Enhancements

### Planned Features
- Machine learning for trend prediction accuracy improvement
- Advanced data validation using AI
- Real-time collaboration features for community predictions
- Integration with more external data sources
- Advanced analytics and reporting dashboard
- Mobile app data synchronization
- API rate limiting and caching optimizations

### Scalability Considerations
- Horizontal scaling for high-volume data processing
- CDN integration for global data distribution
- Advanced caching strategies
- Database sharding for large datasets
- Microservices architecture for data processing