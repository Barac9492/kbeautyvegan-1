'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Heart, Award, ChevronRight, Leaf, Star, Brain, Users, Zap } from 'lucide-react'
import AuthModal from '@/components/AuthModal'
import { auth } from '@/lib/auth'
import ProductGallery from '@/components/ProductGallery';

import Image from 'next/image';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check authentication state
    const { data: { subscription } } = auth.onAuthStateChange(async (session) => {
      if (session?.user) {
        const userData = await auth.getCurrentUser()
        setUser(userData)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Trend Predictions",
      description: "Get ahead with ML-powered Korean beauty trend forecasting",
      color: "from-pink-400 to-purple-400"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "100% Vegan Verified",
      description: "Every product certified cruelty-free and plant-based",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Gamified Insights",
      description: "Earn points and badges for accurate trend predictions",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community Driven",
      description: "Connect with K-beauty enthusiasts worldwide",
      color: "from-red-400 to-pink-400"
    }
  ]

  const trendingNow = [
    { name: "Glass Skin Serums", growth: "+127%", confidence: 0.92 },
    { name: "Mugwort Essence", growth: "+89%", confidence: 0.88 },
    { name: "Vegan Retinol", growth: "+156%", confidence: 0.95 },
    { name: "Rice Water Toners", growth: "+73%", confidence: 0.81 },
  ]

  const stats = [
    { value: "50K+", label: "Active Users", icon: <Users className="w-5 h-5" /> },
    { value: "92%", label: "Accuracy Rate", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "4.9/5", label: "User Rating", icon: <Star className="w-5 h-5" /> },
    { value: "24/7", label: "Live Updates", icon: <Zap className="w-5 h-5" /> }
  ]

  const testimonials = [
    {
      name: "Sarah Kim",
      role: "K-Beauty Enthusiast",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b608?w=64&h=64&fit=crop&crop=face",
      content: "This platform helped me discover the next big trend before it went viral!"
    },
    {
      name: "Jessica Park",
      role: "Beauty Blogger",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      content: "The AI predictions are incredibly accurate. I've improved my content strategy by 200%!"
    },
    {
      name: "Michelle Chen",
      role: "Skincare Expert",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face",
      content: "Finally, a platform that understands the vegan K-beauty market!"
    }
  ]

  const handleGetStarted = () => {
    if (user) {
      window.location.href = '/dashboard'
    } else {
      setShowAuthModal(true)
    }
  }

  const handleAuthSuccess = () => {
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">K-Beauty Hub</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-brand-primary transition-colors">Features</a>
              <a href="#trends" className="text-gray-600 hover:text-brand-primary transition-colors">Trends</a>
              <a href="#community" className="text-gray-600 hover:text-brand-primary transition-colors">Community</a>
              <button
                onClick={handleGetStarted}
                className="px-6 py-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                {user ? 'Dashboard' : 'Get Started'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl font-bold tracking-tight">Discover Vegan K-Beauty Trends</h1>
            <p className="text-xl text-gray-600">AI-powered insights for the future of cruelty-free Korean cosmetics.</p>
            <button className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold">Get Started</button>
          </div>
          
          <div className="flex-1 grid grid-cols-3 gap-4">
            {/* Column 1 */}
            <div className="space-y-4">
              <Image src="https://images.unsplash.com/photo-1556228720-195a672e8a44?auto=format&fit=crop&w=200" alt="Vegan serum" width={200} height={300} className="rounded-xl shadow-md" />
              <Image src="https://images.unsplash.com/photo-1525909002-1e1dfa8faa5c?auto=format&fit=crop&w=200" alt="Natural cream" width={200} height={200} className="rounded-xl shadow-md" />
            </div>
            
            {/* Column 2 */}
            <div className="space-y-4 pt-8">
              <Image src="https://images.unsplash.com/photo-1598440947619-2c35fc9aaecb?auto=format&fit=crop&w=150" alt="Plant-based lotion" width={150} height={250} className="rounded-xl shadow-md" />
              <Image src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=150" alt="Organic mask" width={150} height={150} className="rounded-xl shadow-md" />
              <Image src="https://images.unsplash.com/photo-1556228578-0d712847d4bb?auto=format&fit=crop&w=150" alt="Eco-friendly balm" width={150} height={150} className="rounded-xl shadow-md" />
            </div>
            
            {/* Column 3 */}
            <div className="space-y-4">
              <Image src="https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=180" alt="Vegan makeup" width={180} height={280} className="rounded-xl shadow-md" />
              <Image src="https://images.unsplash.com/photo-1556228720-195a672e8a44?auto=format&fit=crop&w=180" alt="Cruelty-free essence" width={180} height={180} className="rounded-xl shadow-md" />
            </div>
          </div>
        </div>
      </main>

      {/* Live Trends Ticker */}
      <section className="py-4 bg-white/60 backdrop-blur border-y border-white/20">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...trendingNow, ...trendingNow].map((trend, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-semibold">{trend.name}</span>
                <span className="text-green-600 font-bold">{trend.growth}</span>
                <span className="text-xs px-2 py-1 bg-brand-primary/10 rounded-full">
                  {(trend.confidence * 100).toFixed(0)}% confidence
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why <span className="gradient-text">10,000+ beauty enthusiasts</span> choose us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're building the future of conscious beauty intelligence, one prediction at a time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-white/20"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProductGallery />

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-kbeauty-pink/20 to-kbeauty-lavender/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">beauty experts</span> worldwide
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur rounded-3xl p-12 text-center border border-white/20"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to predict the next K-beauty revolution?
          </h2>
          <p className="text-gray-600 mb-8">
            Join our exclusive community and get 30 days of premium insights free
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/80 backdrop-blur border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Get Started <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            No credit card required • Cancel anytime • GDPR compliant
          </p>
        </motion.div>
      </section>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}