'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Award, Star, Zap, Target, TrendingUp, Heart, 
  Trophy, Crown, Flame, Diamond, Sparkles 
} from 'lucide-react'

interface Badge {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  points_required: number
  category: string
  unlocked: boolean
  progress?: number
}

interface BadgeSystemProps {
  userPoints: number
  userLevel: number
  className?: string
}

export default function BadgeSystem({ userPoints, userLevel, className = '' }: BadgeSystemProps) {
  const [badges, setBadges] = useState<Badge[]>([])
  
  useEffect(() => {
    const badgeData: Badge[] = [
      {
        id: 'first-prediction',
        name: 'First Steps',
        description: 'Made your first trend prediction',
        icon: <Star className="w-5 h-5" />,
        rarity: 'common',
        points_required: 10,
        category: 'starter',
        unlocked: userPoints >= 10
      },
      {
        id: 'streak-master',
        name: 'Streak Master',
        description: '7-day prediction streak',
        icon: <Flame className="w-5 h-5" />,
        rarity: 'rare',
        points_required: 100,
        category: 'consistency',
        unlocked: userPoints >= 100
      },
      {
        id: 'trend-oracle',
        name: 'Trend Oracle',
        description: '90% prediction accuracy',
        icon: <Trophy className="w-5 h-5" />,
        rarity: 'epic',
        points_required: 500,
        category: 'accuracy',
        unlocked: userPoints >= 500,
        progress: Math.min((userPoints / 500) * 100, 100)
      },
      {
        id: 'k-beauty-expert',
        name: 'K-Beauty Expert',
        description: 'Reached Level 5',
        icon: <Crown className="w-5 h-5" />,
        rarity: 'epic',
        points_required: 1000,
        category: 'expertise',
        unlocked: userLevel >= 5,
        progress: Math.min((userLevel / 5) * 100, 100)
      },
      {
        id: 'vegan-champion',
        name: 'Vegan Champion',
        description: 'Verified 100 vegan products',
        icon: <Heart className="w-5 h-5" />,
        rarity: 'rare',
        points_required: 300,
        category: 'community',
        unlocked: userPoints >= 300,
        progress: Math.min((userPoints / 300) * 100, 100)
      },
      {
        id: 'legendary-predictor',
        name: 'Legendary Predictor',
        description: 'Top 1% globally',
        icon: <Diamond className="w-5 h-5" />,
        rarity: 'legendary',
        points_required: 5000,
        category: 'elite',
        unlocked: userPoints >= 5000,
        progress: Math.min((userPoints / 5000) * 100, 100)
      }
    ]
    
    setBadges(badgeData)
  }, [userPoints, userLevel])

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500'
  }

  const rarityGlow = {
    common: 'shadow-gray-200',
    rare: 'shadow-blue-200',
    epic: 'shadow-purple-200',
    legendary: 'shadow-yellow-200'
  }

  const unlockedBadges = badges.filter(badge => badge.unlocked)
  const lockedBadges = badges.filter(badge => !badge.unlocked)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Unlocked Badges */}
      {unlockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Earned Badges ({unlockedBadges.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {unlockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`glass-morphism rounded-xl p-4 text-center relative overflow-hidden ${rarityGlow[badge.rarity]} hover:shadow-lg transition-all cursor-pointer`}
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${rarityColors[badge.rarity]} flex items-center justify-center text-white mx-auto mb-3 relative`}>
                  {badge.icon}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${rarityColors[badge.rarity]} text-white`}>
                  {badge.rarity}
                </div>
                
                {/* Sparkle effect for legendary badges */}
                {badge.rarity === 'legendary' && (
                  <motion.div
                    className="absolute top-2 right-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-gray-500" />
            Goals ({lockedBadges.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {lockedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-morphism rounded-xl p-4 relative opacity-75 hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${rarityColors[badge.rarity]} opacity-50 flex items-center justify-center text-white relative`}>
                    {badge.icon}
                    <div className="absolute inset-0 bg-black/20 rounded-full" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                    
                    {badge.progress !== undefined && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${rarityColors[badge.rarity]}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${badge.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${rarityColors[badge.rarity]} text-white opacity-70`}>
                        {badge.rarity}
                      </span>
                      <span className="text-xs text-gray-500">
                        {badge.points_required} pts needed
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Badge Stats */}
      <div className="glass-morphism rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Badge Collection</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          {Object.entries(rarityColors).map(([rarity, colors]) => {
            const count = unlockedBadges.filter(b => b.rarity === rarity).length
            const total = badges.filter(b => b.rarity === rarity).length
            
            return (
              <div key={rarity} className="space-y-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors} mx-auto`} />
                <p className="text-sm font-medium capitalize">{rarity}</p>
                <p className="text-xs text-gray-600">{count}/{total}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}