import { NextRequest, NextResponse } from 'next/server'
import { DataUpdater } from '@/lib/data-updater'
import { supabase } from '@/lib/supabase'

// This API route handles automated data updates
// Can be called by Vercel Cron Jobs or external schedulers

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a trusted source (cron job)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { dataType, force = false } = await request.json()
    const updater = new DataUpdater()

    // If no specific dataType provided, update all enabled types
    if (!dataType) {
      const { data: configs } = await supabase
        .from('update_configs')
        .select('*')
        .eq('is_enabled', true)

      if (!configs) {
        return NextResponse.json({ error: 'No update configs found' }, { status: 404 })
      }

      const results = []
      for (const config of configs) {
        // Check if update is due (unless forced)
        if (!force && config.next_update && new Date(config.next_update) > new Date()) {
          continue
        }

        try {
          await updater.updateData(config.data_type)
          
          // Update last_update timestamp
          await supabase
            .from('update_configs')
            .update({ last_update: new Date().toISOString() })
            .eq('data_type', config.data_type)

          results.push({
            dataType: config.data_type,
            status: 'success',
            timestamp: new Date().toISOString()
          })
        } catch (error) {
          results.push({
            dataType: config.data_type,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          })
        }
      }

      return NextResponse.json({
        message: 'Batch update completed',
        results,
        totalUpdated: results.filter(r => r.status === 'success').length,
        totalFailed: results.filter(r => r.status === 'failed').length
      })
    }

    // Update specific data type
    const success = await updater.triggerUpdate(dataType)
    
    if (success) {
      // Update last_update timestamp
      await supabase
        .from('update_configs')
        .update({ last_update: new Date().toISOString() })
        .eq('data_type', dataType)

      return NextResponse.json({
        message: `Successfully updated ${dataType} data`,
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json(
        { error: `Failed to update ${dataType} data` },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Cron update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to check update status
export async function GET(request: NextRequest) {
  try {
    const { data: freshness } = await supabase
      .from('data_freshness')
      .select('*')

    const { data: recentLogs } = await supabase
      .from('update_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    return NextResponse.json({
      freshness: freshness || [],
      recentLogs: recentLogs || [],
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching update status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch update status' },
      { status: 500 }
    )
  }
}