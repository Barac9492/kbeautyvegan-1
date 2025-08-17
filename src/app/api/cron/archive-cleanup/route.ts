import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// This API route handles automated archive cleanup
// Runs daily at 2 AM to clean up old archived data

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a trusted source (cron job)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const startTime = Date.now()
    const results = []

    // Clean up old archive data (older than 1 year)
    try {
      const { data, error } = await supabase.rpc('cleanup_old_archives')
      
      if (error) throw error

      results.push({
        operation: 'archive_cleanup',
        status: 'success',
        recordsDeleted: data || 0,
        message: `Deleted ${data || 0} old archive records`
      })
    } catch (error) {
      results.push({
        operation: 'archive_cleanup',
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }

    // Clean up old update logs (older than 3 months)
    try {
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

      const { error } = await supabase
        .from('update_logs')
        .delete()
        .lt('created_at', threeMonthsAgo.toISOString())

      if (error) throw error

      results.push({
        operation: 'logs_cleanup',
        status: 'success',
        message: 'Cleaned up old update logs'
      })
    } catch (error) {
      results.push({
        operation: 'logs_cleanup',
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }

    // Clean up old quality metrics (older than 6 months)
    try {
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

      const { error } = await supabase
        .from('data_quality_metrics')
        .delete()
        .lt('created_at', sixMonthsAgo.toISOString())

      if (error) throw error

      results.push({
        operation: 'metrics_cleanup',
        status: 'success',
        message: 'Cleaned up old quality metrics'
      })
    } catch (error) {
      results.push({
        operation: 'metrics_cleanup',
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }

    // Log the cleanup operation
    const executionTime = Date.now() - startTime
    const successCount = results.filter(r => r.status === 'success').length
    const failedCount = results.filter(r => r.status === 'failed').length

    await supabase
      .from('update_logs')
      .insert({
        data_type: 'archive_cleanup',
        status: failedCount > 0 ? 'partial' : 'success',
        message: `Cleanup completed: ${successCount} success, ${failedCount} failed`,
        execution_time: executionTime,
        records_updated: results.reduce((sum, r) => sum + (r.recordsDeleted || 0), 0)
      })

    return NextResponse.json({
      message: 'Archive cleanup completed',
      results,
      executionTime,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Archive cleanup error:', error)
    
    // Log the error
    await supabase
      .from('update_logs')
      .insert({
        data_type: 'archive_cleanup',
        status: 'failed',
        message: 'Archive cleanup failed',
        error_details: { error: error instanceof Error ? error.message : 'Unknown error' }
      })

    return NextResponse.json(
      { error: 'Archive cleanup failed' },
      { status: 500 }
    )
  }
}

// GET endpoint to check cleanup status
export async function GET() {
  try {
    const { data: recentCleanups } = await supabase
      .from('update_logs')
      .select('*')
      .eq('data_type', 'archive_cleanup')
      .order('created_at', { ascending: false })
      .limit(5)

    const { data: archiveStats } = await supabase
      .from('data_archive')
      .select('data_type, archived_at')
      .order('archived_at', { ascending: false })

    // Calculate archive statistics
    const archiveCount = archiveStats?.length || 0
    const archivesByType = archiveStats?.reduce((acc: any, item) => {
      acc[item.data_type] = (acc[item.data_type] || 0) + 1
      return acc
    }, {}) || {}

    return NextResponse.json({
      recentCleanups: recentCleanups || [],
      archiveStats: {
        totalArchived: archiveCount,
        byType: archivesByType
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching cleanup status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cleanup status' },
      { status: 500 }
    )
  }
}