import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

interface DataState {
  data: any
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
  version: string | null
}

interface UseDataUpdatesOptions {
  dataType: string
  fallbackData?: any
  autoRefresh?: boolean
  refreshInterval?: number // in milliseconds
}

export function useDataUpdates({
  dataType,
  fallbackData = null,
  autoRefresh = true,
  refreshInterval = 300000 // 5 minutes default
}: UseDataUpdatesOptions) {
  const [state, setState] = useState<DataState>({
    data: fallbackData,
    isLoading: true,
    error: null,
    lastUpdated: null,
    version: null
  })

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const { data, error } = await supabase
        .from('data_versions')
        .select('*')
        .eq('data_type', dataType)
        .eq('is_active', true)
        .single()

      if (error) {
        // If no data found, use fallback
        if (error.code === 'PGRST116' && fallbackData) {
          setState(prev => ({
            ...prev,
            data: fallbackData,
            isLoading: false,
            error: null,
            lastUpdated: null,
            version: 'fallback'
          }))
          return
        }
        throw error
      }

      setState(prev => ({
        ...prev,
        data: data.data,
        isLoading: false,
        error: null,
        lastUpdated: data.timestamp,
        version: data.version
      }))

    } catch (error) {
      console.error(`Error fetching ${dataType} data:`, error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        data: fallbackData // Use fallback on error
      }))
    }
  }, [dataType, fallbackData])

  const refreshData = useCallback(() => {
    fetchData()
  }, [fetchData])

  // Initial data fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Set up real-time subscription
  useEffect(() => {
    if (!autoRefresh) return

    const channel = supabase
      .channel(`data-updates-${dataType}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'data_versions',
          filter: `data_type=eq.${dataType}`
        },
        (payload) => {
          console.log(`Data update received for ${dataType}:`, payload)
          fetchData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [dataType, autoRefresh, fetchData])

  // Set up periodic refresh
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      fetchData()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, fetchData])

  return {
    ...state,
    refreshData,
    isStale: state.lastUpdated ? 
      (Date.now() - new Date(state.lastUpdated).getTime()) > refreshInterval : false
  }
}

// Hook for monitoring data freshness across all types
export function useDataFreshness() {
  const [freshness, setFreshness] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFreshness = async () => {
      try {
        const { data, error } = await supabase
          .from('data_freshness')
          .select('*')

        if (error) throw error
        setFreshness(data || [])
      } catch (error) {
        console.error('Error fetching data freshness:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFreshness()

    // Set up real-time updates
    const channel = supabase
      .channel('data-freshness-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'data_versions'
        },
        () => {
          fetchFreshness()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { freshness, isLoading }
}

// Hook for update logs
export function useUpdateLogs(limit: number = 10) {
  const [logs, setLogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data, error } = await supabase
          .from('update_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit)

        if (error) throw error
        setLogs(data || [])
      } catch (error) {
        console.error('Error fetching update logs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogs()

    // Set up real-time updates for new logs
    const channel = supabase
      .channel('update-logs')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'update_logs'
        },
        () => {
          fetchLogs()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [limit])

  return { logs, isLoading }
}