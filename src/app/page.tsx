"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  TrendingUp, 
  Leaf, 
  Users, 
  Star, 
  Zap,
  ChevronRight,
  ArrowRight,
  Globe,
  Shield,
  Brain,
  Heart,
  Award,
  BarChart3
} from "lucide-react"
import { beautyStats, trendsData, aiBeautyInsights, communityStats } from "@/lib/data"

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Add scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".scroll-reveal").forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Bar - Apple Style */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "blur-background border-b border-gray-200 dark:border-gray-800" : ""
      }`}>
        <div className="container-width">
          <div className="flex items-center justify-between h-12 md:h-14">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-sm">K-Beauty AI</span>
            </motion.div>

            {/* Center Navigation */}
            <motion.div 
              className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="#trends" className="nav-link">Trends</a>
              <a href="#predictions" className="nav-link">AI Insights</a>
              <a href="#vegan" className="nav-link">Vegan Products</a>
              <a href="#community" className="nav-link">Community</a>
              <a href="#analytics" className="nav-link">Analytics</a>
            </motion.div>

            {/* Right Actions */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button className="nav-link hidden sm:block">Sign In</button>
              <Button className="btn-apple text-xs px-4 py-1.5">
                Join Beta
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple Style */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        
        <motion.div 
          className="container-hero relative"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="text-center max-w-5xl mx-auto">
            {/* Eyebrow Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                <Zap className="w-3.5 h-3.5" />
                AI-Powered K-Beauty Intelligence
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6"
            >
              <span className="block">Predict the Future of</span>
              <span className="block gradient-text">K-Beauty Trends</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Join {communityStats.totalMembers}+ beauty enthusiasts using AI to predict trends, 
              discover vegan products, and shape the {beautyStats.marketSize} K-beauty market.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="btn-apple text-base px-8 py-6 h-auto">
                Start Predicting
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-base px-8 py-6 h-auto hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Explore Trends
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>{communityStats.accuracyRate} Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span>{communityStats.activePredictors} Active Predictors</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Verified Data</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trending Insights Section */}
      <section id="trends" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-width">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Current K-Beauty Trends
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real-time analysis of the hottest trends shaping the Korean beauty industry.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {trendsData.slice(0, 4).map((trend, index) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 scroll-reveal"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium">
                        {trend.category}
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                        {trend.growth}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{trend.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{trend.description}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium">Popularity: {trend.popularity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${trend.popularity}%` }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {trend.keyIngredients.map((ingredient, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-md">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Leading Brands:</span>
                    <div className="text-sm font-medium">{trend.brands.slice(0, 2).join(", ")}</div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                    {trend.predictedDuration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insights Section */}
      <section id="predictions" className="py-20 md:py-32">
        <div className="container-width">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              AI Beauty Insights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Latest research and predictions powered by artificial intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiBeautyInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 scroll-reveal"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      insight.impact === 'High' 
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                        : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {insight.impact} Impact
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{insight.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{insight.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{insight.description}</p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Source: {insight.source}</span>
                  <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded">
                    {insight.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Section - Apple Style Grid */}
      <section id="features" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-width">
          {/* Section Header */}
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to stay ahead in the beauty industry.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Predictions Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-8 hover:shadow-2xl transition-all duration-500 scroll-reveal"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">AI Trend Predictions</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Advanced neural networks analyze millions of data points to predict emerging K-beauty trends with {communityStats.accuracyRate} accuracy.
              </p>
              <div className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Vegan Verification Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-8 hover:shadow-2xl transition-all duration-500 scroll-reveal"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Vegan Beauty Database</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Comprehensive database of verified vegan K-beauty products with detailed ingredient analysis and certifications.
              </p>
              <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400 group-hover:gap-3 transition-all">
                Explore products
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Community Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 p-8 hover:shadow-2xl transition-all duration-500 scroll-reveal"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Expert Community</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Connect with beauty experts, share predictions, and earn rewards. Join {communityStats.totalMembers}+ active members.
              </p>
              <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                Join community
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Market Analytics Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-8 hover:shadow-2xl transition-all duration-500 scroll-reveal"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Market Intelligence</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Real-time analysis of the {beautyStats.marketSize} K-beauty market with growth predictions and regional insights.
              </p>
              <div className="flex items-center text-sm font-medium text-orange-600 dark:text-orange-400 group-hover:gap-3 transition-all">
                View insights
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Personalization Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 p-8 hover:shadow-2xl transition-all duration-500 scroll-reveal"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">AI Personalization</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                AI-powered recommendations tailored to your skin type, preferences, and beauty goals using advanced algorithms.
              </p>
              <div className="flex items-center text-sm font-medium text-pink-600 dark:text-pink-400 group-hover:gap-3 transition-all">
                Get recommendations
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Analytics Card */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 p-8 hover:shadow-2xl transition-all duration-500 scroll-reveal"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Prediction Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Track your prediction accuracy, earn badges, and climb the global leaderboards with detailed performance analytics.
              </p>
              <div className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-3 transition-all">
                View analytics
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Apple Style */}
      <section className="py-20 bg-gradient-to-b from-gray-50 dark:from-gray-800/30 to-transparent">
        <div className="container-width">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="scroll-reveal"
            >
              <div className="text-4xl md:text-5xl font-semibold gradient-text mb-2">{communityStats.accuracyRate}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Prediction Accuracy</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="scroll-reveal"
            >
              <div className="text-4xl md:text-5xl font-semibold gradient-text mb-2">5K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Verified Products</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="scroll-reveal"
            >
              <div className="text-4xl md:text-5xl font-semibold gradient-text mb-2">{communityStats.totalMembers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Community Members</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="scroll-reveal"
            >
              <div className="text-4xl md:text-5xl font-semibold gradient-text mb-2">{beautyStats.marketSize}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">K-Beauty Market</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Apple Style */}
      <section className="py-20 md:py-32">
        <div className="container-width text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Ready to predict the future?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
              Join thousands of beauty enthusiasts shaping tomorrow&apos;s trends today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-apple text-base px-8 py-6 h-auto">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 py-6 h-auto border-2"
              >
                View Demo
              </Button>
            </div>
            <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
              No credit card required • 14-day free trial • Join {communityStats.totalMembers}+ members
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer - Apple Style */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-width">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">AI Predictions</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Vegan Database</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Market Analytics</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Trend Reports</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Research Papers</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Brand Partnerships</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Status Page</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Bug Reports</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 K-Beauty AI. Predicting the future of beauty trends.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Twitter</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Instagram</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}