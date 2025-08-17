"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Leaf, 
  Search, 
  Filter,
  Star,
  ShieldCheck,
  Award,
  Heart,
  ShoppingCart,
  Info,
  CheckCircle,
  XCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { veganProducts, beautyStats, ingredientDatabase } from "@/lib/data"

export default function VeganPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showOnlyVegan, setShowOnlyVegan] = useState(false)

  const categories = ["All", "Toner", "Essence", "Serum", "Cleanser", "Moisturizer", "Mask"]
  const priceRanges = ["All", "Under $20", "$20-$30", "$30-$50", "Over $50"]

  const filteredProducts = veganProducts
    .filter(product => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const searchMatch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.keyIngredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      const priceMatch = priceRange === "All" || 
        (priceRange === "Under $20" && parseInt(product.price.replace('$', '')) < 20) ||
        (priceRange === "$20-$30" && parseInt(product.price.replace('$', '')) >= 20 && parseInt(product.price.replace('$', '')) <= 30) ||
        (priceRange === "$30-$50" && parseInt(product.price.replace('$', '')) > 30 && parseInt(product.price.replace('$', '')) <= 50) ||
        (priceRange === "Over $50" && parseInt(product.price.replace('$', '')) > 50)
      const veganMatch = !showOnlyVegan || product.isVegan
      
      return categoryMatch && searchMatch && priceMatch && veganMatch
    })

  const veganIngredients = ingredientDatabase.filter(ingredient => ingredient.isVegan)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-semibold">
                Vegan <span className="gradient-text">K-Beauty</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Discover verified cruelty-free and vegan Korean beauty products. 
              Our AI-powered verification system ensures authenticity with {beautyStats.veganGrowth} growth in vegan beauty market.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Verified ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-500" />
                <span>Certified cruelty-free</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span>100% vegan options</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-800">
        <div className="container-width">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4"
            >
              <div className="text-3xl font-bold gradient-text mb-1">5,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Verified Products</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-4"
            >
              <div className="text-3xl font-bold gradient-text mb-1">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Vegan Brands</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-4"
            >
              <div className="text-3xl font-bold gradient-text mb-1">+{beautyStats.veganGrowth}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">YoY Growth</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-4"
            >
              <div className="text-3xl font-bold gradient-text mb-1">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-width">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products, brands, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>

            {/* Vegan Only Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyVegan}
                onChange={(e) => setShowOnlyVegan(e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vegan Only</span>
            </label>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-width">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
              >
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-gray-400 dark:text-gray-500 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <Leaf className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-xs">{product.brand}</div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{product.brand}</span>
                    {product.isVegan && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {!product.isVegan && (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({product.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Verification Status</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      {product.isVegan ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500" />
                      )}
                      <span>Vegan</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {product.isCrueltyFree ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500" />
                      )}
                      <span>Cruelty-Free</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Certified by: {product.verification.certifiedBy}
                  </div>
                </div>

                {/* Key Ingredients */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.keyIngredients.slice(0, 3).map((ingredient, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.benefits.map((benefit, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {product.price}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Vegan Ingredients Guide */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Vegan Ingredient Guide</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Learn about plant-based ingredients commonly used in K-beauty products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {veganIngredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{ingredient.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{ingredient.type}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-sm font-semibold mb-1">Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {ingredient.benefits.map((benefit, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <div className="mb-1">
                    <strong>Scientific name:</strong> {ingredient.scientificName}
                  </div>
                  <div>
                    <strong>Common in:</strong> {ingredient.commonIn.join(", ")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Info */}
      <section className="py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Certification Standards</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Understanding the certifications that ensure products meet vegan and cruelty-free standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Leaping Bunny</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                The gold standard for cruelty-free certification, ensuring no animal testing at any stage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vegan Society</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Official vegan certification ensuring products contain no animal-derived ingredients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Info className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">PETA Certified</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Companies pledged to never test on animals and maintain cruelty-free practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}