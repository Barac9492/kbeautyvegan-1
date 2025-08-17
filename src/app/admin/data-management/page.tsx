"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  RefreshCw, 
  Database, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  Archive,
  Settings,
  BarChart3,
  Calendar,
  Download,
  Play,
  Pause,
  Trash2,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface UpdateStatus {
  dataType: string
  lastUpdate: string
  nextUpdate: string
  status: 'fresh' | 'aging' | 'stale' | 'no_data'
  updateInterval: number
  isEnabled: boolean
}

interface UpdateLog {
  id: number
  dataType: string
  status: string
  message: string
  executionTime: number
  recordsUpdated: number
  createdAt: string
}

export default function DataManagementPage() {
  const [updateStatuses, setUpdateStatuses] = useState<UpdateStatus[]>([])
  const [updateLogs, setUpdateLogs] = useState<UpdateLog[]>([])
  const [archiveStats, setArchiveStats] = useState<any>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchUpdateStatus()
    fetchUpdateLogs()
    fetchArchiveStats()
  }, [])

  const fetchUpdateStatus = async () => {
    try {
      const { data } = await supabase
        .from('data_freshness')
        .select('*')

      if (data) {
        setUpdateStatuses(data.map((item: any) => ({
          dataType: item.data_type,
          lastUpdate: item.current_data_timestamp,
          nextUpdate: item.next_update,
          status: item.freshness_status,
          updateInterval: item.update_interval,
          isEnabled: true
        })))
      }
    } catch (error) {
      console.error('Error fetching update status:', error)
    }
  }

  const fetchUpdateLogs = async () => {
    try {
      const { data } = await supabase
        .from('update_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)

      if (data) {
        setUpdateLogs(data.map((log: any) => ({
          id: log.id,
          dataType: log.data_type,
          status: log.status,
          message: log.message,
          executionTime: log.execution_time,
          recordsUpdated: log.records_updated,
          createdAt: log.created_at
        })))
      }
    } catch (error) {
      console.error('Error fetching update logs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchArchiveStats = async () => {
    try {
      const response = await fetch('/api/cron/archive-cleanup')
      const data = await response.json()
      setArchiveStats(data.archiveStats || {})
    } catch (error) {
      console.error('Error fetching archive stats:', error)
    }
  }

  const triggerUpdate = async (dataType: string) => {
    setIsUpdating(dataType)
    try {
      const response = await fetch('/api/cron/update-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'dev-secret'}`
        },
        body: JSON.stringify({ dataType, force: true })
      })

      if (response.ok) {
        await fetchUpdateStatus()
        await fetchUpdateLogs()
      }
    } catch (error) {
      console.error('Error triggering update:', error)
    } finally {
      setIsUpdating(null)
    }
  }

  const triggerCleanup = async () => {
    try {
      const response = await fetch('/api/cron/archive-cleanup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'dev-secret'}`
        }
      })

      if (response.ok) {
        await fetchArchiveStats()
        await fetchUpdateLogs()
      }
    } catch (error) {
      console.error('Error triggering cleanup:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'aging': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'stale': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      case 'no_data': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'fresh': return <CheckCircle className="w-4 h-4" />
      case 'aging': return <Clock className="w-4 h-4" />
      case 'stale': return <AlertCircle className="w-4 h-4" />
      case 'no_data': return <Database className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading data management dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Data Management <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Monitor, update, and archive your K-beauty intelligence data in real-time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => window.location.reload()} className="btn-apple">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Dashboard
              </Button>
              <Button onClick={triggerCleanup} variant="outline">
                <Archive className="w-4 h-4 mr-2" />
                Run Cleanup
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Status Overview */}
      <section className="py-12">
        <div className="container-width">
          <h2 className="text-2xl font-semibold mb-6">Data Freshness Status</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updateStatuses.map((status, index) => (
              <motion.div
                key={status.dataType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold capitalize">{status.dataType}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(status.status)}`}>
                    {getStatusIcon(status.status)}
                    {status.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex justify-between">
                    <span>Last Update:</span>
                    <span>{status.lastUpdate ? new Date(status.lastUpdate).toLocaleString() : 'Never'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Update Interval:</span>
                    <span>{status.updateInterval} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Update:</span>
                    <span>{status.nextUpdate ? new Date(status.nextUpdate).toLocaleString() : 'Pending'}</span>
                  </div>
                </div>

                <Button
                  onClick={() => triggerUpdate(status.dataType)}
                  disabled={isUpdating === status.dataType}
                  size="sm"
                  className="w-full"
                >
                  {isUpdating === status.dataType ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Update Now
                    </>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Statistics */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-width">
          <h2 className="text-2xl font-semibold mb-6">Archive Statistics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Archive className="w-5 h-5 text-blue-600" />
                Total Archived Records
              </h3>
              <div className="text-3xl font-bold gradient-text mb-2">
                {archiveStats.totalArchived || 0}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Historical data versions preserved for analysis
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Archive Breakdown
              </h3>
              <div className="space-y-2">
                {Object.entries(archiveStats.byType || {}).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{type}:</span>
                    <span className="font-semibold">{count as number}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Update Logs */}
      <section className="py-12">
        <div className="container-width">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Update Logs</h2>
            <Button onClick={() => fetchUpdateLogs()} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Logs
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Data Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Execution Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Records
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {updateLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium capitalize">{log.dataType}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === 'success' 
                            ? 'text-green-600 bg-green-100 dark:bg-green-900/30'
                            : log.status === 'failed'
                            ? 'text-red-600 bg-red-100 dark:bg-red-900/30'
                            : 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
                        }`}>
                          {log.status === 'success' && <CheckCircle className="w-3 h-3" />}
                          {log.status === 'failed' && <AlertCircle className="w-3 h-3" />}
                          {log.status === 'partial' && <Clock className="w-3 h-3" />}
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{log.message}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {log.executionTime ? `${log.executionTime}ms` : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {log.recordsUpdated || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-width">
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button
              onClick={() => triggerUpdate('trends')}
              disabled={isUpdating === 'trends'}
              className="h-auto p-6 flex flex-col items-center gap-3"
            >
              <TrendingUp className="w-8 h-8" />
              <span>Update Trends</span>
            </Button>

            <Button
              onClick={() => triggerUpdate('products')}
              disabled={isUpdating === 'products'}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center gap-3"
            >
              <Database className="w-8 h-8" />
              <span>Update Products</span>
            </Button>

            <Button
              onClick={() => triggerUpdate('community')}
              disabled={isUpdating === 'community'}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center gap-3"
            >
              <RefreshCw className="w-8 h-8" />
              <span>Update Community</span>
            </Button>

            <Button
              onClick={triggerCleanup}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center gap-3"
            >
              <Trash2 className="w-8 h-8" />
              <span>Run Cleanup</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}