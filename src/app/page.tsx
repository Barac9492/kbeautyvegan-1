import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Leaf, Users, Star, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              K-Beauty Intelligence
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#trends" className="text-sm font-medium hover:text-primary transition-colors">
              Trends
            </a>
            <a href="#vegan" className="text-sm font-medium hover:text-primary transition-colors">
              Vegan Products
            </a>
            <a href="#community" className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </a>
            <Button size="sm" className="animate-gentle-bounce">
              Join Beta
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 animate-soft-glow">
            <Zap className="w-3 h-3 mr-1" />
            AI-Powered Beauty Intelligence
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
            Predict the Future of
            <br />
            K-Beauty Trends
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the exclusive community of beauty enthusiasts using AI to predict trends, verify vegan products, and
            earn rewards in the $71.51B beauty market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <TrendingUp className="w-5 h-5 mr-2" />
              Start Predicting
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Users className="w-5 h-5 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Exclusive Platform Features</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced AI predictions, gamified learning, and verified vegan beauty products all in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>AI Trend Predictions</CardTitle>
              <CardDescription>
                Advanced algorithms analyze Korean beauty market data to predict emerging trends with 89% accuracy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>89% Prediction Accuracy</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Vegan Verification</CardTitle>
              <CardDescription>
                Comprehensive database of verified vegan K-beauty products with ingredient analysis and certifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Leaf className="w-4 h-4 text-green-500" />
                <span>5,000+ Verified Products</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>Gamified Learning</CardTitle>
              <CardDescription>
                Earn points, unlock badges, and climb leaderboards while mastering K-beauty knowledge and predictions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-blue-500" />
                <span>Join 10,000+ Members</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">89%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">Vegan Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Community Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">$71B</div>
              <div className="text-sm text-muted-foreground">Market Size</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Ready to Predict the Future?</h3>
          <p className="text-muted-foreground mb-8">
            Join our exclusive beta and start earning rewards for your beauty trend predictions today.
          </p>
          <Button size="lg" className="text-lg px-8 py-6 animate-gentle-bounce">
            <Sparkles className="w-5 h-5 mr-2" />
            Join Beta Waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 K-Beauty Intelligence. Predicting the future of beauty trends.</p>
        </div>
      </footer>
    </div>
  )
}