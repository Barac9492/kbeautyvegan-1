'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, TrendingDown, Award, Zap, Users, Package,
  Calendar, Filter, Search, Bell, Settings, ChevronUp,
  Sparkles, Heart, Star, Activity, Target, BarChart3,
  Brain, Globe, Menu, X, Plus, ArrowUpRight, Flame,
  Shield, Crown, Diamond, Trophy, ChevronRight, RefreshCw,
  CheckCircle, Clock
} from 'lucide-react'
import PredictionModal from '@/components/PredictionModal'

interface TrendData {
  id: string
  name: string
  category: string
  momentum: number
  change: number
  prediction: 'rising' | 'falling' | 'stable'
  confidence: number
}

interface UserStats {
  points: number
  level: number
  streak: number
  rank: number
  accuracy: number
}

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showPredictionModal, setShowPredictionModal] = useState(false)
  const [selectedTrend, setSelectedTrend] = useState<TrendData | null>(null)
  const [userStats, setUserStats] = useState<UserStats>({
    points: 2847,
    level: 3,
    streak: 12,
    rank: 147,
    accuracy: 89
  })

  const categories = ['all', 'skincare', 'makeup', 'haircare', 'bodycare', 'tools']
  
  const mockTrends: TrendData[] = [
    {
      id: '1',
      name: 'Centella Asiatica Serums',
      category: 'skincare',
      momentum: 92,
      change: 24,
      prediction: 'rising',
      confidence: 0.94
    },
    {
      id: '2',
      name: 'Vegan Peptide Creams',
      category: 'skincare',
      momentum: 87,
      change: 18,
      prediction: 'rising',
      confidence: 0.91
    },
    {
      id: '3',
      name: 'Glass Skin Tints',
      category: 'makeup',
      momentum: 76,
      change: -5,
      prediction: 'stable',
      confidence: 0.82
    },
    {
      id: '4',
      name: 'Rice Water Hair Masks',
      category: 'haircare',
      momentum: 68,
      change: 31,
      prediction: 'rising',
      confidence: 0.88
    },
  ]

  const handlePredictClick = (trend: TrendData) => {
    setSelectedTrend(trend as any)
    setShowPredictionModal(true)
  }

  const leaderboard = [
    { rank: 1, username: 'beautyOracle', points: 12847, accuracy: 94 },
    { rank: 2, username: 'k_trendsetter', points: 11293, accuracy: 92 },
    { rank: 3, username: 'veganGlow', points: 9847, accuracy: 91 },
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Trend Intelligence Dashboard</h1>
            <p className="text-gray-600 mt-1">Track, predict, and win with K-beauty insights</p>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 glass-morphism rounded-full"
            >
              <Bell className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="p-3 glass-morphism rounded-full"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
            <div className="flex items-center gap-3 px-4 py-2 glass-morphism rounded-full">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary" />
              <div className="text-sm">
                <p className="font-semibold">Level {userStats.level}</p>
                <p className="text-gray-500">{userStats.points} pts</p>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="k-beauty-card"
          >
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-xs text-green-600 font-semibold">+127</span>
            </div>
            <p className="text-2xl font-bold">{userStats.points}</p>
            <p className="text-sm text-gray-600">Total Points</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="k-beauty-card"
          >
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-5 h-5 text-brand-primary" />
              <span className="text-xs font-semibold">{userStats.streak} days</span>
            </div>
            <p className="text-2xl font-bold">{userStats.accuracy}%</p>
            <p className="text-sm text-gray-600">Accuracy</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="k-beauty-card"
          >
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-brand-secondary" />
              <span className="text-xs font-semibold">Top 5%</span>
            </div>
            <p className="text-2xl font-bold">#{userStats.rank}</p>
            <p className="text-sm text-gray-600">Global Rank</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="k-beauty-card"
          >
            <div className="flex items-center justify-between mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-xs font-semibold">+3 new</span>
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="k-beauty-card"
          >
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-xs font-semibold">Active</span>
            </div>
            <p className="text-2xl font-bold">247</p>
            <p className="text-sm text-gray-600">Following</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trending Now */}
          <div className="lg:col-span-2">
            <div className="k-beauty-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-primary" />
                  Live Trends
                </h2>
                
                <div className="flex gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white'
                          : 'glass-morphism hover:bg-white/80'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {mockTrends
                    .filter(t => selectedCategory === 'all' || t.category === selectedCategory)
                    .map((trend, index) => (
                    <motion.div
                      key={trend.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 glass-morphism rounded-xl hover:bg-white/80 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{trend.name}</h3>
                            <span className="px-2 py-1 bg-kbeauty-lavender/30 rounded-full text-xs">
                              {trend.category}
                            </span>
                            {trend.prediction === 'rising' && (
                              <ChevronUp className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Activity className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{trend.momentum}</span>
                              <span className="text-gray-500">momentum</span>
                            </div>
                            
                            <div className={`flex items-center gap-1 ${
                              trend.change > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {trend.change > 0 ? '+' : ''}{trend.change}%
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-yellow-500" />
                              <span>{(trend.confidence * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <motion.button
                          onClick={() => handlePredictClick(trend)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-full text-sm font-semibold"
                        >
                          Predict
                        </motion.button>
                      </div>
                      
                      <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: `${trend.momentum}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="space-y-6">
            <div className="k-beauty-card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Top Predictors
              </h2>
              
              <div className="space-y-3">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 glass-morphism rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                        user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                        user.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                        'bg-gray-200'
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{user.username}</p>
                        <p className="text-xs text-gray-500">{user.accuracy}% accuracy</p>
                      </div>
                    </div>
                    <p className="font-bold text-sm">{user.points.toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 glass-morphism rounded-full text-sm font-semibold hover:bg-white/80 transition-all">
                View Full Leaderboard
              </button>
            </div>

            {/* Quick Actions */}
            <div className="k-beauty-card">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full p-3 glass-morphism rounded-xl text-left hover:bg-white/80 transition-all flex items-center justify-between">
                  <span className="text-sm font-medium">Create Prediction</span>
                  <ChevronUp className="w-4 h-4 rotate-90" />
                </button>
                <button className="w-full p-3 glass-morphism rounded-xl text-left hover:bg-white/80 transition-all flex items-center justify-between">
                  <span className="text-sm font-medium">Browse Products</span>
                  <ChevronUp className="w-4 h-4 rotate-90" />
                </button>
                <button className="w-full p-3 glass-morphism rounded-xl text-left hover:bg-white/80 transition-all flex items-center justify-between">
                  <span className="text-sm font-medium">Join Challenge</span>
                  <ChevronUp className="w-4 h-4 rotate-90" />
                </button>
              </div>
            </div>
          </div>
      </div>
      
      <PredictionModal
        isOpen={showPredictionModal}
        onClose={() => setShowPredictionModal(false)}
        trendData={selectedTrend}
      />
    </div>
  </div>
  )
}