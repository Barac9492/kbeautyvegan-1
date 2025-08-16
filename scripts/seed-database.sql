-- Sample data for Vegan K-Beauty Hub
-- Run this after creating the schema

-- Insert sample brands
INSERT INTO brands (name, name_korean, is_vegan_certified, website, instagram_handle, popularity_score) VALUES
('COSRX', '코스알엑스', true, 'https://cosrx.kr', 'cosrx', 95),
('Beauty of Joseon', '조선미녀', true, 'https://beautyofjoseon.com', 'beautyofjoseon_official', 92),
('Torriden', '토리든', true, 'https://torriden.com', 'torriden_official', 88),
('Purito', '퓨리토', true, 'https://purito.com', 'purito_official', 90),
('Klairs', '클레어스', true, 'https://klairs.com', 'klairs.global', 87),
('Dear Klairs', '디어 클레어스', true, 'https://klairs.com', 'klairs.global', 85);

-- Insert sample products
INSERT INTO products (brand_id, name, name_korean, category, subcategory, price_usd, price_krw, vegan_ingredients_score, trending_score, launch_date) VALUES
((SELECT id FROM brands WHERE name = 'COSRX'), 'Snail 96 Mucin Power Essence', '달팽이 96 뮤신 파워 에센스', 'skincare', 'essence', 25.00, 33000, 9.8, 95, '2024-01-15'),
((SELECT id FROM brands WHERE name = 'Beauty of Joseon'), 'Glow Deep Serum', '글로우 딥 세럼', 'skincare', 'serum', 17.00, 22000, 9.9, 92, '2024-02-01'),
((SELECT id FROM brands WHERE name = 'Torriden'), 'DIVE-IN Low Molecule Hyaluronic Acid Serum', '다이브인 저분자 히알루론산 세럼', 'skincare', 'serum', 18.00, 24000, 9.7, 88, '2024-01-20'),
((SELECT id FROM brands WHERE name = 'Purito'), 'Centella Unscented Serum', '센텔라 무향 세럼', 'skincare', 'serum', 19.50, 26000, 9.9, 89, '2024-03-01'),
((SELECT id FROM brands WHERE name = 'Klairs'), 'Fundamental Watery Oil Drop', '펀더멘탈 워터리 오일 드롭', 'skincare', 'facial_oil', 22.00, 29000, 9.6, 84, '2024-02-15');

-- Insert trending topics
INSERT INTO trends (trend_name, trend_name_korean, category, description, momentum_score, region, started_at, ai_confidence, related_hashtags) VALUES
('Glass Skin Revolution', '글래스 스킨 혁명', 'skincare', 'The pursuit of perfectly clear, luminous skin texture', 95, 'korea', '2024-01-01', 0.94, ARRAY['#glassskin', '#koreanbeauty', '#skincareroutine']),
('Vegan Peptide Power', '비건 펩타이드 파워', 'skincare', 'Plant-based peptides for anti-aging without animal derivatives', 87, 'korea', '2024-02-01', 0.91, ARRAY['#veganpeptides', '#antiaging', '#crueltyfreeskincare']),
('Mugwort Mania', '쑥 열풍', 'skincare', 'Traditional Korean herb gaining popularity for sensitive skin', 82, 'korea', '2024-01-15', 0.88, ARRAY['#mugwort', '#sensitiveskin', '#kbeauty']),
('Rice Water Renaissance', '쌀물 르네상스', 'haircare', 'Ancient Korean beauty secret for hair and skin', 78, 'korea', '2024-03-01', 0.85, ARRAY['#ricewater', '#haircare', '#traditionalkbeauty']);

-- Insert sample badges
INSERT INTO badges (name, description, points_required, category, rarity) VALUES
('First Steps', 'Made your first trend prediction', 10, 'starter', 'common'),
('Trend Spotter', 'Correctly predicted 5 trends', 100, 'accuracy', 'rare'),
('Vegan Advocate', 'Verified 50 vegan products', 200, 'community', 'rare'),
('Streak Master', '7-day prediction streak', 150, 'consistency', 'rare'),
('K-Beauty Expert', 'Reached level 5', 500, 'expertise', 'epic'),
('Trend Oracle', '90% prediction accuracy', 1000, 'accuracy', 'epic'),
('Legendary Predictor', 'Top 1% globally', 5000, 'elite', 'legendary'),
('Vegan Champion', 'Community leader in vegan beauty', 2500, 'community', 'legendary');

-- Insert sample ingredients
INSERT INTO ingredients (name, korean_name, inci_name, is_vegan, benefits, popularity_score) VALUES
('Centella Asiatica', '센텔라 아시아티카', 'Centella Asiatica Extract', true, ARRAY['anti-inflammatory', 'healing', 'sensitive skin'], 95),
('Hyaluronic Acid', '히알루론산', 'Hyaluronic Acid', true, ARRAY['hydration', 'plumping', 'anti-aging'], 98),
('Niacinamide', '나이아신아마이드', 'Niacinamide', true, ARRAY['brightening', 'pore minimizing', 'oil control'], 92),
('Snail Secretion Filtrate', '달팽이 분비물 여과물', 'Snail Secretion Filtrate', false, ARRAY['healing', 'hydration', 'regeneration'], 88),
('Rice Bran Water', '쌀겨 물', 'Oryza Sativa (Rice) Bran Water', true, ARRAY['brightening', 'softening', 'antioxidant'], 85),
('Mugwort Extract', '쑥 추출물', 'Artemisia Princeps Extract', true, ARRAY['calming', 'anti-inflammatory', 'sensitive skin'], 82);

-- Insert subscription features
INSERT INTO subscription_features (tier, feature_name, feature_value) VALUES
('free', 'predictions_per_day', '5'),
('free', 'ai_insights', 'basic'),
('free', 'trend_alerts', 'weekly'),
('premium', 'predictions_per_day', '25'),
('premium', 'ai_insights', 'advanced'),
('premium', 'trend_alerts', 'daily'),
('premium', 'exclusive_reports', 'monthly'),
('pro', 'predictions_per_day', 'unlimited'),
('pro', 'ai_insights', 'premium'),
('pro', 'trend_alerts', 'real_time'),
('pro', 'exclusive_reports', 'weekly'),
('pro', 'api_access', 'full'),
('pro', 'custom_analytics', 'enabled');

-- Create sample analytics events
INSERT INTO analytics_events (event_type, event_data) VALUES
('trend_view', '{"trend_id": "glass-skin", "category": "skincare", "source": "dashboard"}'),
('prediction_made', '{"trend_id": "vegan-peptide", "prediction": "rise", "confidence": 0.85}'),
('product_search', '{"query": "centella serum", "results_count": 12}'),
('badge_earned', '{"badge_id": "first-steps", "points_awarded": 10}');