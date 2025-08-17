#!/usr/bin/env tsx

// Setup script for initializing the data versioning system
// Run with: npx tsx scripts/setup-data-system.ts

import { createClient } from '@supabase/supabase-js'
import { beautyStats, trendsData, veganProducts, aiBeautyInsights, communityStats, marketInsights, ingredientDatabase } from '../src/lib/data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDataSystem() {
  console.log('🚀 Setting up K-Beauty data versioning system...')

  try {
    // 1. Initialize trends data
    console.log('📈 Initializing trends data...')
    const trendsVersion = {
      id: `trends-${Date.now()}`,
      version: 'v25.01.03.01',
      timestamp: new Date().toISOString(),
      data_type: 'trends',
      data: {
        trends: trendsData,
        lastUpdated: new Date().toISOString(),
        source: 'initial-setup'
      },
      source: 'manual-setup',
      is_active: true
    }

    const { error: trendsError } = await supabase
      .from('data_versions')
      .insert([trendsVersion])

    if (trendsError) throw trendsError
    console.log('✅ Trends data initialized')

    // 2. Initialize products data
    console.log('🛍️ Initializing products data...')
    const productsVersion = {
      id: `products-${Date.now()}`,
      version: 'v25.01.03.01',
      timestamp: new Date().toISOString(),
      data_type: 'products',
      data: {
        products: veganProducts,
        ingredients: ingredientDatabase,
        lastUpdated: new Date().toISOString(),
        source: 'initial-setup'
      },
      source: 'manual-setup',
      is_active: true
    }

    const { error: productsError } = await supabase
      .from('data_versions')
      .insert([productsVersion])

    if (productsError) throw productsError
    console.log('✅ Products data initialized')

    // 3. Initialize market data
    console.log('📊 Initializing market data...')
    const marketVersion = {
      id: `market-${Date.now()}`,
      version: 'v25.01.03.01',
      timestamp: new Date().toISOString(),
      data_type: 'market',
      data: {
        stats: beautyStats,
        insights: marketInsights,
        lastUpdated: new Date().toISOString(),
        source: 'initial-setup'
      },
      source: 'manual-setup',
      is_active: true
    }

    const { error: marketError } = await supabase
      .from('data_versions')
      .insert([marketVersion])

    if (marketError) throw marketError
    console.log('✅ Market data initialized')

    // 4. Initialize community data
    console.log('👥 Initializing community data...')
    const communityVersion = {
      id: `community-${Date.now()}`,
      version: 'v25.01.03.01',
      timestamp: new Date().toISOString(),
      data_type: 'community',
      data: {
        stats: communityStats,
        lastUpdated: new Date().toISOString(),
        source: 'initial-setup'
      },
      source: 'manual-setup',
      is_active: true
    }

    const { error: communityError } = await supabase
      .from('data_versions')
      .insert([communityVersion])

    if (communityError) throw communityError
    console.log('✅ Community data initialized')

    // 5. Initialize AI insights data
    console.log('🤖 Initializing AI insights data...')
    const insightsVersion = {
      id: `insights-${Date.now()}`,
      version: 'v25.01.03.01',
      timestamp: new Date().toISOString(),
      data_type: 'insights',
      data: {
        insights: aiBeautyInsights,
        lastUpdated: new Date().toISOString(),
        source: 'initial-setup'
      },
      source: 'manual-setup',
      is_active: true
    }

    const { error: insightsError } = await supabase
      .from('data_versions')
      .insert([insightsVersion])

    if (insightsError) throw insightsError
    console.log('✅ AI insights data initialized')

    // 6. Log the setup completion
    const { error: logError } = await supabase
      .from('update_logs')
      .insert([{
        data_type: 'system_setup',
        status: 'success',
        message: 'Initial data system setup completed successfully',
        execution_time: 0,
        records_updated: 5
      }])

    if (logError) throw logError

    console.log('🎉 Data versioning system setup completed successfully!')
    console.log('')
    console.log('📋 Summary:')
    console.log('- Trends data: ✅ Initialized')
    console.log('- Products data: ✅ Initialized') 
    console.log('- Market data: ✅ Initialized')
    console.log('- Community data: ✅ Initialized')
    console.log('- AI insights data: ✅ Initialized')
    console.log('')
    console.log('🔄 Automated updates configured:')
    console.log('- Trends: Every 1 hour')
    console.log('- Products: Every 4 hours')
    console.log('- Market: Every 24 hours')
    console.log('- Community: Every 30 minutes')
    console.log('- Insights: Every 6 hours')
    console.log('')
    console.log('🗄️ Archive cleanup: Daily at 2 AM')
    console.log('')
    console.log('🎯 Next steps:')
    console.log('1. Set up environment variables in Vercel:')
    console.log('   - CRON_SECRET (for securing cron endpoints)')
    console.log('   - SUPABASE_SERVICE_ROLE_KEY (for admin operations)')
    console.log('2. Deploy to Vercel to activate cron jobs')
    console.log('3. Monitor data updates in /admin/data-management')

  } catch (error) {
    console.error('❌ Error setting up data system:', error)
    process.exit(1)
  }
}

// Run the setup
setupDataSystem()