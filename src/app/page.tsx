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
  Heart
} from "lucide-react"

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
    <div className="min-h-screen bg-background">
      {/* Navigation Bar - Apple Style */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "blur-background border-b border-border/50" : ""
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
              <a href="#features" className="nav-link">Features</a>
              <a href="#predictions" className="nav-link">Predictions</a>
              <a href="#vegan" className="nav-link">Vegan Beauty</a>
              <a href="#community" className="nav-link">Community</a>
              <a href="#pricing" className="nav-link">Pricing</a>
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
                Get Started
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <Zap className="w-3.5 h-3.5" />
                AI-Powered Beauty Intelligence
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6"
            >
              <span className="block">The Future of</span>
              <span className="block gradient-text">K-Beauty Trends</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Join 10,000+ beauty enthusiasts using AI to predict trends, 
              discover vegan products, and shape the $71B beauty market.
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
                className="text-base px-8 py-6 h-auto hover:bg-secondary/50"
              >
                Watch Demo
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span>10K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Verified Safe</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards Section - Apple Style Grid */}
      <section id="features" className="py-20 md:py-32">
        <div className="container-width">
          {/* Section Header */}
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
              <h3 className="text-2xl font-semibold mb-3">AI Predictions</h3>
              <p className="text-muted-foreground mb-4">
                Advanced neural networks analyze millions of data points to predict emerging K-beauty trends with 89% accuracy.
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
              <h3 className="text-2xl font-semibold mb-3">Vegan Beauty</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive database of 5,000+ verified vegan K-beauty products with detailed ingredient analysis.
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
              <h3 className="text-2xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground mb-4">
                Connect with beauty experts, share predictions, and earn rewards in our gamified learning platform.
              </p>
              <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                Join community
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {/* Global Insights Card */}
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
              <h3 className="text-2xl font-semibold mb-3">Global Insights</h3>
              <p className="text-muted-foreground mb-4">
                Real-time market analysis from Korea, Japan, and emerging beauty markets worldwide.
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
              <h3 className="text-2xl font-semibold mb-3">Personalized</h3>
              <p className="text-muted-foreground mb-4">
                AI-powered recommendations tailored to your skin type, preferences, and beauty goals.
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
              <h3 className="text-2xl font-semibold mb-3">Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Track your prediction accuracy, earn badges, and climb the global leaderboards.
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
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-transparent">
        <div className="container-width">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="scroll-reveal"
            >
              <div className="text-4xl md:text-5xl font-semibold gradient-text mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="scroll-reveal"
            >
              <div className="text-4xl md:text-5xl font-semibold gradient-text mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">Vegan Products</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="scroll-reveal"
            >
              <div className="text-4xl md:text-5xl font-semibold gradient-text mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="scroll-reveal"
            >
              <div className="text-4xl md:text-5xl font-semibold gradient-text mb-2">$71B</div>
              <div className="text-sm text-muted-foreground">Market Size</div>
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
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of beauty enthusiasts shaping tomorrow's trends today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-apple text-base px-8 py-6 h-auto">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 py-6 h-auto border-2"
              >
                Contact Sales
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer - Apple Style */}
      <footer className="border-t border-border/50 py-12 bg-secondary/20">
        <div className="container-width">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm text-muted-foreground">
                © 2025 K-Beauty AI. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}