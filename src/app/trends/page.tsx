"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Filter, 
  Search, 
  Calendar,
  BarChart3,
  Users,
  Star,
  ArrowRight,
  Eye,
  Heart,
  Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { trendsData, beautyStats, marketInsights } from "@/lib/data"

export default function TrendsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popularity")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", "Skincare", "Technology", "Innovation", "Sustainability", "Lifestyle"]

  const filteredTrends = trendsData
    .filter(trend => 
      (selectedCategory === "All" || trend.category === selectedCategory) &&
      (searchQuery === "" || trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       trend.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "popularity") return b.popularity - a.popularity
      if (sortBy === "growth") return parseInt(b.growth) - parseInt(a.growth)
      return 0
    })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-semibold mb-6">
              K-Beauty <span className="gradient-text">Trend Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Real-time analysis of Korean beauty trends powered by AI. Track popularity, 
              predict future movements, and discover emerging opportunities in the {beautyStats.marketSize} K-beauty market.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Live trend tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                <span>AI-powered predictions</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Community insights</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container-width">
          <h2 className="text-3xl font-semibold mb-8 text-center">Market Overview</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl"
            >
              <div className="text-3xl font-bold gradient-text mb-2">{beautyStats.marketSize}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">K-Beauty Market Size</div>
              <div className="text-xs text-green-600 dark:text-green-400 font-semibold">+{beautyStats.predictedGrowth} CAGR</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl"
            >
              <div className="text-3xl font-bold gradient-text mb-2">+{beautyStats.veganGrowth}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vegan Beauty Growth</div>
              <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">Year over Year</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl"
            >
              <div className="text-3xl font-bold gradient-text mb-2">{beautyStats.aiBeautyMarket}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">AI Beauty Market</div>
              <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Rapidly expanding</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-width">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search trends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="growth">Sort by Growth</option>
            </select>
          </div>
        </div>
      </section>

      {/* Trends Grid */}
      <section className="py-16">
        <div className="container-width">
          <div className="grid gap-8">
            {filteredTrends.map((trend, index) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                            {trend.category}
                          </span>
                          <span className="text-green-600 dark:text-green-400 font-semibold text-sm flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {trend.growth}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs">
                            {trend.predictedDuration}
                          </span>
                        </div>
                        <h3 className="text-3xl font-semibold mb-4">{trend.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                          {trend.description}
                        </p>
                      </div>
                    </div>

                    {/* Key Ingredients */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Key Ingredients & Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {trend.keyIngredients.map((ingredient, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Leading Brands */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">Leading Brands:</h4>
                      <div className="flex flex-wrap gap-3">
                        {trend.brands.map((brand, idx) => (
                          <span key={idx} className="px-4 py-2 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 text-pink-600 dark:text-pink-400 rounded-lg text-sm font-medium">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <Button className="btn-apple">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">Save</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>

                  {/* Stats Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6">
                      <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Trend Analytics</h4>
                      
                      {/* Popularity */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Popularity</span>
                          <span className="text-sm font-semibold">{trend.popularity}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${trend.popularity}%` }}
                          />
                        </div>
                      </div>

                      {/* Growth Rate */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</span>
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">{trend.growth}</span>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
                          <span className="text-sm font-semibold">{trend.predictedDuration}</span>
                        </div>
                      </div>

                      {/* Engagement */}
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Eye className="w-4 h-4" />
                            <span>2.4K views</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>156 following</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Insights */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-width">
          <h2 className="text-3xl font-semibold mb-8 text-center">Regional Market Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {marketInsights.regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
              >
                <h3 className="font-semibold mb-2">{region.name}</h3>
                <div className="text-2xl font-bold gradient-text mb-1">{region.marketShare}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Market Share</div>
                <div className="text-sm text-green-600 dark:text-green-400 font-semibold">{region.growth}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}