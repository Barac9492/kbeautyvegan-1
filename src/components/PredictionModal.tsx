'use client'

import { useState, useEffect, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, TrendingUp, TrendingDown, Brain, Zap, Calendar, 
  Target, Sparkles, AlertCircle, CheckCircle2, Award
} from 'lucide-react'

interface PredictionModalProps {
  isOpen: boolean
  onClose: () => void
  trendData?: {
    id: string
    name: string
    category: string
    momentum?: number
    current_momentum?: number
    confidence: number
  } | null
}

type PredictionType = 'rise' | 'fall' | 'stable' | 'breakthrough'

interface PredictionOption {
  type: PredictionType
  label: string
  description: string
  icon: React.ReactNode
  points: number
  color: string
}

export default function PredictionModal({ isOpen, onClose, trendData }: PredictionModalProps) {
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionType | null>(null)
  const [confidence, setConfidence] = useState(75)
  const [timeframe, setTimeframe] = useState('1w')
  const [reasoning, setReasoning] = useState('')
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const predictionOptions: PredictionOption[] = [
    {
      type: 'rise',
      label: 'Strong Rise',
      description: 'This trend will gain significant momentum',
      icon: <TrendingUp className="w-6 h-6" />,
      points: 50,
      color: 'from-green-400 to-emerald-500'
    },
    {
      type: 'fall',
      label: 'Decline',
      description: 'Interest in this trend will decrease',
      icon: <TrendingDown className="w-6 h-6" />,
      points: 40,
      color: 'from-red-400 to-pink-500'
    },
    {
      type: 'stable',
      label: 'Stable Growth',
      description: 'Steady, consistent interest',
      icon: <Target className="w-6 h-6" />,
      points: 30,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      type: 'breakthrough',
      label: 'Viral Breakthrough',
      description: 'Major viral moment incoming',
      icon: <Sparkles className="w-6 h-6" />,
      points: 100,
      color: 'from-purple-400 to-pink-500'
    }
  ]

  const timeframes = [
    { value: '1w', label: '1 Week', multiplier: 1 },
    { value: '1m', label: '1 Month', multiplier: 1.5 },
    { value: '3m', label: '3 Months', multiplier: 2 },
    { value: '6m', label: '6 Months', multiplier: 3 }
  ]

  // Simulate AI analysis
  useEffect(() => {
    if (selectedPrediction && trendData) {
      setIsAnalyzing(true)
      setTimeout(() => {
        setAiAnalysis({
          agreement: Math.random() > 0.3,
          confidence: 0.85 + Math.random() * 0.1,
          factors: [
            'Social media mentions up 24% this week',
            'Celebrity endorsements detected',
            'Supply chain data indicates production increase',
            'Search volume trending upward in target demographics'
          ],
          risk_factors: [
            'Seasonal trend may affect longevity',
            'Competition from similar products'
          ]
        })
        setIsAnalyzing(false)
      }, 2000)
    }
  }, [selectedPrediction, trendData])

  const calculatePoints = () => {
    const basePoints = predictionOptions.find(opt => opt.type === selectedPrediction)?.points || 0
    const timeMultiplier = timeframes.find(tf => tf.value === timeframe)?.multiplier || 1
    const confidenceMultiplier = confidence / 100
    return Math.round(basePoints * timeMultiplier * confidenceMultiplier)
  }

  const handleSubmit = () => {
    // Here you would submit to Supabase
    console.log('Submitting prediction:', {
      trendId: trendData?.id,
      prediction: selectedPrediction,
      confidence,
      timeframe,
      reasoning,
      potentialPoints: calculatePoints()
    })
    onClose()
  }

  if (!trendData) return null

  let analysisContent = null;
  if (!selectedPrediction) {
    analysisContent = (
      <div className="glass-morphism rounded-xl p-6 text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">
          Select a prediction to see AI analysis
        </p>
      </div>
    );
  } else if (isAnalyzing) {
    analysisContent = (
      <div className="glass-morphism rounded-xl p-6">
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Brain className="w-8 h-8 text-brand-primary" />
          </motion.div>
        </div>
        <p className="text-center text-gray-600">
          AI is analyzing market data, social signals, and trend patterns...
        </p>
      </div>
    );
  } else if (aiAnalysis) {
    analysisContent = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className={`glass-morphism rounded-xl p-4 border-l-4 ${
          aiAnalysis.agreement 
            ? 'border-green-500 bg-green-50/50' 
            : 'border-orange-500 bg-orange-50/50'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {aiAnalysis.agreement ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-orange-600" />
            )}
            <span className="font-semibold">
              AI {aiAnalysis.agreement ? 'Agrees' : 'Disagrees'} 
              ({(aiAnalysis.confidence * 100).toFixed(0)}% confidence)
            </span>
          </div>
          <p className="text-sm text-gray-600">
            {aiAnalysis.agreement 
              ? 'Our models support your prediction based on current data patterns.'
              : 'Our analysis suggests a different outcome. Consider the factors below.'}
          </p>
        </div>

        <div className="glass-morphism rounded-xl p-4">
          <h4 className="font-semibold mb-3 text-green-700">Supporting Factors</h4>
          <ul className="space-y-2">
            {aiAnalysis.factors.map((factor: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                {factor}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-morphism rounded-xl p-4">
          <h4 className="font-semibold mb-3 text-orange-700">Risk Factors</h4>
          <ul className="space-y-2">
            {aiAnalysis.risk_factors.map((risk: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    );
  }

  let submitButtons = null;
  if (selectedPrediction) {
    submitButtons = (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 flex gap-4 justify-end"
      >
        <button
          onClick={onClose}
          className="px-6 py-3 glass-morphism rounded-xl font-semibold hover:bg-white/80 transition-all"
        >
          Cancel
        </button>
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Submit Prediction
        </motion.button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-auto z-50"
          >
            <div className="glass-morphism rounded-2xl p-8 relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold gradient-text mb-2">
                  AI-Powered Prediction
                </h2>
                <p className="text-gray-600">
                  Make your prediction for <span className="font-semibold">{trendData.name}</span>
                </p>
                <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                    <span>Current momentum: {trendData.current_momentum || trendData.momentum || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>AI confidence: {(trendData.confidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Side - Prediction Options */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Your Prediction</h3>
                  <div className="space-y-3">
                    {predictionOptions.map((option) => (
                      <motion.button
                        key={option.type}
                        onClick={() => setSelectedPrediction(option.type)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-xl border-2 transition-all ${
                          selectedPrediction === option.type
                            ? 'border-brand-primary bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center text-white`}>
                            {option.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="font-semibold">{option.label}</h4>
                            <p className="text-sm text-gray-600">{option.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium">{option.points} base points</span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {selectedPrediction && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Confidence Level: {confidence}%
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={confidence}
                          onChange={(e) => setConfidence(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Conservative</span>
                          <span>Very Confident</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Timeframe</label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeframes.map((tf) => (
                            <button
                              key={tf.value}
                              onClick={() => setTimeframe(tf.value)}
                              className={`py-2 px-3 rounded-lg text-sm transition-all ${
                                timeframe === tf.value
                                  ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white'
                                  : 'glass-morphism hover:bg-white/80'
                              }`}
                            >
                              {tf.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Reasoning (Optional)
                        </label>
                        <textarea
                          value={reasoning}
                          onChange={(e) => setReasoning(e.target.value)}
                          placeholder="Why do you think this will happen?"
                          className="w-full p-3 rounded-xl bg-white/80 backdrop-blur border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          rows={3}
                        />
                      </div>

                      <div className="glass-morphism rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Potential Points:</span>
                          <span className="text-2xl font-bold gradient-text">
                            {calculatePoints()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Based on prediction type, timeframe, and confidence
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Side - AI Analysis */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-brand-primary" />
                    AI Analysis
                  </h3>
                  
                  {analysisContent}
                </div>
              </div>

              {submitButtons}
            </div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  )
}