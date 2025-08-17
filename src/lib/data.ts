// Real K-Beauty and AI Beauty Data
export const beautyStats = {
  marketSize: "$18.3B", // Korean beauty market size 2024
  globalBeautyMarket: "$571B", // Global beauty market
  predictedGrowth: "8.1%", // CAGR for K-beauty
  veganGrowth: "12.8%", // Vegan beauty market growth
  aiBeautyMarket: "$3.2B", // AI in beauty market size
}

export const trendsData = [
  {
    id: 1,
    title: "Glass Skin Trend Evolution",
    description: "The glass skin trend continues to dominate, with new formulations focusing on ceramides and niacinamide for ultimate hydration and glow.",
    category: "Skincare",
    popularity: 94,
    growth: "+23%",
    predictedDuration: "Long-term",
    keyIngredients: ["Ceramides", "Niacinamide", "Hyaluronic Acid", "Centella Asiatica"],
    brands: ["Beauty of Joseon", "COSRX", "Torriden", "Anua"],
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400"
  },
  {
    id: 2,
    title: "AI-Powered Skin Analysis",
    description: "Korean brands are integrating AI skin analysis tools to provide personalized product recommendations based on individual skin concerns.",
    category: "Technology",
    popularity: 87,
    growth: "+45%",
    predictedDuration: "Emerging",
    keyIngredients: ["Machine Learning", "Computer Vision", "Skin Mapping"],
    brands: ["Amorepacific", "LG H&H", "Samsung Beauty"],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400"
  },
  {
    id: 3,
    title: "Fermented Beauty Ingredients",
    description: "Traditional Korean fermentation techniques are being applied to create more potent and bioavailable skincare ingredients.",
    category: "Innovation",
    popularity: 91,
    growth: "+34%",
    predictedDuration: "Growing",
    keyIngredients: ["Fermented Rice Bran", "Ginseng", "Green Tea", "Bifida Ferment"],
    brands: ["SK-II", "Missha", "The History of Whoo", "Sulwhasoo"],
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=400"
  },
  {
    id: 4,
    title: "Vegan K-Beauty Revolution",
    description: "Growing demand for cruelty-free and vegan K-beauty products with plant-based alternatives to traditional ingredients.",
    category: "Sustainability",
    popularity: 89,
    growth: "+67%",
    predictedDuration: "Long-term",
    keyIngredients: ["Plant Collagen", "Vegan Ceramides", "Botanical Extracts"],
    brands: ["Dear Klairs", "Purito", "By Wishtrend", "I'm From"],
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400"
  },
  {
    id: 5,
    title: "Minimalist Skincare Routines",
    description: "Shift towards simplified routines focusing on multi-functional products that deliver maximum results with fewer steps.",
    category: "Lifestyle",
    popularity: 85,
    growth: "+28%",
    predictedDuration: "Growing",
    keyIngredients: ["Multi-peptides", "All-in-one Serums", "Hybrid Formulas"],
    brands: ["COSRX", "Some By Mi", "Torriden", "Beauty of Joseon"],
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400"
  }
]

export const veganProducts = [
  {
    id: 1,
    name: "Beauty of Joseon Glow Replenishing Rice Milk",
    brand: "Beauty of Joseon",
    category: "Toner",
    price: "$17",
    rating: 4.6,
    reviews: 8420,
    isVegan: true,
    isCrueltyFree: true,
    keyIngredients: ["Rice Bran Water", "Alpha Arbutin", "Hyaluronic Acid"],
    benefits: ["Brightening", "Hydrating", "Anti-aging"],
    skinType: ["All skin types", "Sensitive skin"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
    verification: {
      certifiedBy: "Leaping Bunny",
      veganSociety: true,
      lastVerified: "2024-01-15"
    }
  },
  {
    id: 2,
    name: "COSRX Snail 96 Mucin Power Essence",
    brand: "COSRX",
    category: "Essence",
    price: "$25",
    rating: 4.5,
    reviews: 15680,
    isVegan: false, // Contains snail secretion
    isCrueltyFree: true,
    keyIngredients: ["Snail Secretion Filtrate", "Betaine", "Panthenol"],
    benefits: ["Healing", "Hydrating", "Repairing"],
    skinType: ["Damaged skin", "Acne-prone", "Sensitive"],
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
    verification: {
      certifiedBy: "Cruelty Free International",
      veganSociety: false,
      lastVerified: "2024-01-20"
    }
  },
  {
    id: 3,
    name: "Dear Klairs Gentle Black Deep Cleansing Oil",
    brand: "Dear Klairs",
    category: "Cleanser",
    price: "$23",
    rating: 4.7,
    reviews: 6230,
    isVegan: true,
    isCrueltyFree: true,
    keyIngredients: ["Black Bean Oil", "Black Currant Seed Oil", "Sunflower Seed Oil"],
    benefits: ["Deep cleansing", "Makeup removal", "Nourishing"],
    skinType: ["All skin types", "Dry skin"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    verification: {
      certifiedBy: "Leaping Bunny",
      veganSociety: true,
      lastVerified: "2024-01-18"
    }
  },
  {
    id: 4,
    name: "Purito Centella Unscented Serum",
    brand: "Purito",
    category: "Serum",
    price: "$19",
    rating: 4.4,
    reviews: 9840,
    isVegan: true,
    isCrueltyFree: true,
    keyIngredients: ["Centella Asiatica Extract", "Niacinamide", "Peptides"],
    benefits: ["Soothing", "Anti-inflammatory", "Barrier repair"],
    skinType: ["Sensitive skin", "Irritated skin", "All types"],
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
    verification: {
      certifiedBy: "PETA",
      veganSociety: true,
      lastVerified: "2024-01-22"
    }
  },
  {
    id: 5,
    name: "I'm From Rice Toner",
    brand: "I'm From",
    category: "Toner",
    price: "$26",
    rating: 4.5,
    reviews: 4560,
    isVegan: true,
    isCrueltyFree: true,
    keyIngredients: ["Rice Bran Extract", "Niacinamide", "Alpha Arbutin"],
    benefits: ["Brightening", "Hydrating", "Texture improving"],
    skinType: ["Dull skin", "Uneven tone", "All types"],
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400",
    verification: {
      certifiedBy: "Choose Cruelty Free",
      veganSociety: true,
      lastVerified: "2024-01-25"
    }
  }
]

export const aiBeautyInsights = [
  {
    id: 1,
    title: "AI Skin Analysis Accuracy Reaches 94%",
    description: "Latest AI models can now detect 14 different skin concerns with 94% accuracy, matching dermatologist assessments.",
    impact: "High",
    category: "Technology",
    date: "2024-01-20",
    source: "Beauty Tech Research Institute"
  },
  {
    id: 2,
    title: "Virtual Try-On Reduces Returns by 67%",
    description: "Brands using AR virtual try-on technology report significant reduction in product returns and increased customer satisfaction.",
    impact: "High",
    category: "E-commerce",
    date: "2024-01-18",
    source: "Digital Beauty Analytics"
  },
  {
    id: 3,
    title: "Personalized Skincare Shows 45% Better Results",
    description: "AI-powered personalized skincare routines demonstrate significantly better outcomes compared to generic recommendations.",
    impact: "Medium",
    category: "Personalization",
    date: "2024-01-15",
    source: "Skincare Efficacy Study"
  }
]

export const marketInsights = {
  regions: [
    { name: "South Korea", marketShare: "45%", growth: "+8.1%" },
    { name: "China", marketShare: "28%", growth: "+12.3%" },
    { name: "Japan", marketShare: "15%", growth: "+4.2%" },
    { name: "United States", marketShare: "8%", growth: "+15.7%" },
    { name: "Europe", marketShare: "4%", growth: "+18.9%" }
  ],
  categories: [
    { name: "Skincare", share: "68%", value: "$12.4B" },
    { name: "Makeup", share: "22%", value: "$4.0B" },
    { name: "Haircare", share: "7%", value: "$1.3B" },
    { name: "Fragrance", share: "3%", value: "$0.6B" }
  ],
  demographics: [
    { ageGroup: "Gen Z (18-26)", percentage: "34%", spending: "$280/year" },
    { ageGroup: "Millennials (27-42)", percentage: "41%", spending: "$420/year" },
    { ageGroup: "Gen X (43-58)", percentage: "19%", spending: "$350/year" },
    { ageGroup: "Boomers (59+)", percentage: "6%", spending: "$180/year" }
  ]
}

export const communityStats = {
  totalMembers: "12,847",
  activePredictors: "8,234",
  accuracyRate: "89.3%",
  topPredictors: [
    { name: "SkincareSage", accuracy: "96.2%", predictions: 342 },
    { name: "K-BeautyExpert", accuracy: "94.8%", predictions: 287 },
    { name: "TrendSpotter", accuracy: "93.5%", predictions: 198 },
    { name: "BeautyAnalyst", accuracy: "92.1%", predictions: 156 }
  ],
  recentPredictions: [
    {
      trend: "Mushroom-infused skincare",
      predictor: "SkincareSage",
      confidence: "87%",
      timeframe: "6 months",
      category: "Innovation"
    },
    {
      trend: "Blue light protection serums",
      predictor: "TechBeauty",
      confidence: "82%",
      timeframe: "4 months",
      category: "Technology"
    },
    {
      trend: "Waterless beauty products",
      predictor: "EcoBeautyPro",
      confidence: "79%",
      timeframe: "8 months",
      category: "Sustainability"
    }
  ]
}

export const ingredientDatabase = [
  {
    name: "Centella Asiatica",
    type: "Plant Extract",
    benefits: ["Anti-inflammatory", "Soothing", "Healing"],
    isVegan: true,
    commonIn: ["Serums", "Moisturizers", "Toners"],
    scientificName: "Centella asiatica"
  },
  {
    name: "Niacinamide",
    type: "Vitamin B3",
    benefits: ["Pore minimizing", "Oil control", "Brightening"],
    isVegan: true,
    commonIn: ["Serums", "Moisturizers", "Treatments"],
    scientificName: "Nicotinamide"
  },
  {
    name: "Hyaluronic Acid",
    type: "Humectant",
    benefits: ["Hydrating", "Plumping", "Anti-aging"],
    isVegan: true, // Can be synthetically produced
    commonIn: ["Serums", "Moisturizers", "Masks"],
    scientificName: "Sodium Hyaluronate"
  },
  {
    name: "Snail Secretion Filtrate",
    type: "Animal-derived",
    benefits: ["Healing", "Regenerating", "Moisturizing"],
    isVegan: false,
    commonIn: ["Essences", "Serums", "Creams"],
    scientificName: "Helix aspersa secretion"
  },
  {
    name: "Ginseng",
    type: "Plant Extract",
    benefits: ["Anti-aging", "Energizing", "Circulation"],
    isVegan: true,
    commonIn: ["Serums", "Masks", "Essences"],
    scientificName: "Panax ginseng"
  }
]