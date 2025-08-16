-- Vegan K-Beauty Hub Database Schema
-- Core entities for trend tracking, gamification, and AI predictions

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table with gamification elements
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    streak_days INTEGER DEFAULT 0,
    last_active DATE DEFAULT CURRENT_DATE,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'pro')),
    subscription_expires_at TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Korean beauty brands table
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    name_korean TEXT,
    logo_url TEXT,
    is_vegan_certified BOOLEAN DEFAULT false,
    certification_body TEXT,
    website TEXT,
    instagram_handle TEXT,
    popularity_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    name_korean TEXT,
    category TEXT NOT NULL,
    subcategory TEXT,
    ingredients JSONB,
    vegan_ingredients_score DECIMAL(3,2),
    price_usd DECIMAL(10,2),
    price_krw INTEGER,
    image_url TEXT,
    launch_date DATE,
    trending_score INTEGER DEFAULT 0,
    ai_predicted_trend JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Trends tracking table
CREATE TABLE trends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    trend_name TEXT NOT NULL,
    trend_name_korean TEXT,
    category TEXT NOT NULL,
    description TEXT,
    momentum_score INTEGER DEFAULT 0,
    region TEXT DEFAULT 'korea',
    started_at DATE,
    peak_prediction DATE,
    ai_confidence DECIMAL(3,2),
    related_hashtags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- User predictions for gamification
CREATE TABLE user_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    trend_id UUID REFERENCES trends(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    prediction_type TEXT CHECK (prediction_type IN ('trend_rise', 'trend_fall', 'product_launch', 'brand_collab')),
    prediction_value JSONB,
    predicted_date DATE,
    actual_outcome BOOLEAN,
    points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- User badges/achievements
CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    points_required INTEGER,
    category TEXT,
    rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

CREATE TABLE user_badges (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    PRIMARY KEY (user_id, badge_id)
);

-- Ingredient database
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    korean_name TEXT,
    inci_name TEXT,
    is_vegan BOOLEAN DEFAULT true,
    vegan_alternative TEXT,
    benefits TEXT[],
    concerns TEXT[],
    popularity_score INTEGER DEFAULT 0
);

-- Social features
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    trend_id UUID REFERENCES trends(id),
    content TEXT NOT NULL,
    image_urls TEXT[],
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    is_review BOOLEAN DEFAULT false,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Analytics events for AI training
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    event_type TEXT NOT NULL,
    event_data JSONB,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Subscription tiers and features
CREATE TABLE subscription_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tier TEXT NOT NULL,
    feature_name TEXT NOT NULL,
    feature_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for performance
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_trending ON products(trending_score DESC);
CREATE INDEX idx_trends_momentum ON trends(momentum_score DESC);
CREATE INDEX idx_predictions_user ON user_predictions(user_id);
CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_created ON analytics_events(created_at);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can view all profiles but only edit their own
CREATE POLICY "Public profiles are viewable by everyone" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Users can only manage their own predictions
CREATE POLICY "Users can view own predictions" ON user_predictions
    FOR ALL USING (auth.uid() = user_id);

-- Posts are public to read, users can edit their own
CREATE POLICY "Posts are viewable by everyone" ON posts
    FOR SELECT USING (true);

CREATE POLICY "Users can create posts" ON posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON posts
    FOR UPDATE USING (auth.uid() = user_id);

-- Functions for gamification
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET points = points + NEW.points_earned,
        updated_at = NOW()
    WHERE id = NEW.user_id;
    
    -- Check for level up (every 1000 points)
    UPDATE users 
    SET level = FLOOR(points / 1000) + 1
    WHERE id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_points_after_prediction
AFTER UPDATE OF actual_outcome ON user_predictions
FOR EACH ROW
WHEN (NEW.actual_outcome IS NOT NULL)
EXECUTE FUNCTION update_user_points();

-- Function to update trending scores
CREATE OR REPLACE FUNCTION calculate_trending_score()
RETURNS void AS $$
BEGIN
    UPDATE products
    SET trending_score = (
        SELECT COUNT(*) * 10 + COALESCE(SUM(likes_count), 0)
        FROM posts
        WHERE product_id = products.id
        AND created_at > NOW() - INTERVAL '7 days'
    );
    
    UPDATE trends
    SET momentum_score = (
        SELECT COUNT(*) * 5
        FROM posts
        WHERE trend_id = trends.id
        AND created_at > NOW() - INTERVAL '3 days'
    );
END;
$$ LANGUAGE plpgsql;