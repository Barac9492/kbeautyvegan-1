// Strategic Feature Types - Seth Godin & Andrew Chen Inspired

// ============================================================================
// SETH GODIN INSPIRED TYPES
// ============================================================================

export interface UserPermission {
  id: string;
  userId: string;
  emailTrends: boolean;
  emailProductLaunches: boolean;
  emailTribeUpdates: boolean;
  emailPersonalizedInsights: boolean;
  pushNotifications: boolean;
  smsAlerts: boolean;
  permissionValueScore: number;
  lastEngagementAt?: Date;
  optInSource?: string;
  trustLevel: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tribe {
  id: string;
  name: string;
  description?: string;
  missionStatement?: string;
  leaderId?: string;
  category: 'ingredient-focused' | 'brand-loyalist' | 'trend-setter' | 'minimalist' | 'science-based';
  memberCount: number;
  activityScore: number;
  isExclusive: boolean;
  entryRequirements?: {
    minLevel?: number;
    minPredictions?: number;
    inviteOnly?: boolean;
  };
  sharedValues: string[];
  rituals?: {
    weekly?: string[];
    monthly?: string[];
  };
  language?: {
    terms: Record<string, string>;
    emojis: string[];
  };
  createdAt: Date;
}

export interface TribeMembership {
  userId: string;
  tribeId: string;
  role: 'leader' | 'elder' | 'contributor' | 'member';
  contributionScore: number;
  joinedAt: Date;
  lastActiveAt: Date;
}

export interface PurpleCowMoment {
  id: string;
  userId?: string;
  momentType: 'prediction_streak' | 'trend_discovery' | 'ingredient_insight' | 'viral_content';
  title: string;
  description?: string;
  remarkabilityScore: number;
  sharesCount: number;
  conversationStarter: boolean;
  mediaUrls: string[];
  createdAt: Date;
}

// ============================================================================
// ANDREW CHEN INSPIRED TYPES
// ============================================================================

export interface ViralLoop {
  id: string;
  loopName: string;
  loopType: 'acquisition' | 'retention' | 'monetization';
  inputMetric?: string;
  actionMetric?: string;
  outputMetric?: string;
  amplificationFactor: number;
  cycleTimeHours?: number;
  isActive: boolean;
  createdAt: Date;
}

export interface UserViralAction {
  id: string;
  userId: string;
  loopId: string;
  actionType: 'invited' | 'shared' | 'created_content' | 'joined_tribe';
  resultedInSignup: boolean;
  resultedInAction: boolean;
  viralityScore: number;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface NetworkNode {
  id: string;
  nodeType: 'creator' | 'curator' | 'consumer' | 'brand';
  userId?: string;
  brandId?: string;
  connectionsCount: number;
  interactionFrequency?: number;
  valueCreated?: number;
  valueCaptured?: number;
  networkCentrality?: number;
  createdAt: Date;
}

export interface NetworkEdge {
  fromNodeId: string;
  toNodeId: string;
  edgeType: 'follows' | 'collaborates' | 'transacts';
  strength: number;
  interactionsCount: number;
  lastInteractionAt: Date;
}

export interface ContentMarketFit {
  id: string;
  contentType: 'trend_prediction' | 'ingredient_analysis' | 'brand_review' | 'contrarian_take';
  targetSegment: string;
  engagementRate?: number;
  retentionRate?: number;
  viralCoefficient?: number;
  monetizationRate?: number;
  npsScore?: number;
  fitScore?: number; // Calculated field
  createdAt: Date;
}

// ============================================================================
// DIFFERENTIATED VALUE TYPES
// ============================================================================

export interface ContrarianInsight {
  id: string;
  authorId?: string;
  insightType: 'trend_reversal' | 'ingredient_myth' | 'brand_prediction';
  title: string;
  thesis: string;
  evidence?: {
    sources: string[];
    dataPoints: Array<{ label: string; value: number }>;
  };
  confidenceLevel?: number;
  supportersCount: number;
  challengersCount: number;
  provenCorrect?: boolean;
  impactScore: number;
  createdAt: Date;
}

export interface InfluencerIncubator {
  id: string;
  userId: string;
  stage: 'seed' | 'growth' | 'established' | 'authority';
  niche: string;
  followerGrowthRate?: number;
  engagementQualityScore?: number;
  contentConsistencyScore?: number;
  brandCollaborationCount: number;
  mentorshipHours: number;
  resourcesAccessed: string[];
  achievementsUnlocked: string[];
  nextMilestone?: string;
  createdAt: Date;
}

export interface PredictionMarket {
  id: string;
  marketQuestion: string;
  category: string;
  resolutionDate: Date;
  totalSharesYes: number;
  totalSharesNo: number;
  currentProbability?: number;
  liquidityPool: number;
  marketMakerSubsidy: number;
  resolved: boolean;
  outcome?: boolean;
  createdAt: Date;
}

export interface MarketPosition {
  id: string;
  marketId: string;
  userId: string;
  position: 'yes' | 'no';
  sharesOwned: number;
  averagePrice?: number;
  currentValue?: number;
  realizedProfit: number;
  createdAt: Date;
}

export interface IngredientExperiment {
  id: string;
  creatorId?: string;
  ingredientCombination: string[];
  hypothesis: string;
  testMethodology?: string;
  testersCount: number;
  successRate?: number;
  sideEffectsReported?: {
    effect: string;
    frequency: number;
  }[];
  breakthroughPotential: number;
  brandInterestCount: number;
  patentFiled: boolean;
  revenueSharePercentage?: number;
  createdAt: Date;
}

// ============================================================================
// ENGAGEMENT & HABIT TYPES
// ============================================================================

export interface DailyRitual {
  id: string;
  userId: string;
  ritualType: 'morning_prediction' | 'trend_check' | 'ingredient_study' | 'tribe_activity';
  streakCurrent: number;
  streakBest: number;
  completionTime?: string; // Time format HH:MM
  reminderEnabled: boolean;
  pointsPerCompletion: number;
  bonusMultiplier: number;
  lastCompletedAt?: Date;
  createdAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description?: string;
  challengeType: 'prediction_accuracy' | 'content_creation' | 'discovery' | 'tribe_growth';
  startDate: Date;
  endDate: Date;
  minParticipants: number;
  maxParticipants?: number;
  entryFeePoints: number;
  prizePoolPoints: number;
  scoringFormula?: string;
  currentLeaderId?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ChallengeParticipant {
  challengeId: string;
  userId: string;
  score: number;
  rank?: number;
  submissionsCount: number;
  lastSubmissionAt?: Date;
}

// ============================================================================
// MONETIZATION TYPES
// ============================================================================

export interface UserWallet {
  userId: string;
  beautyTokens: number;
  earnedTotal: number;
  spentTotal: number;
  earnRateDaily?: number;
  spendRateDaily?: number;
  lastTransactionAt?: Date;
  createdAt: Date;
}

export interface TokenTransaction {
  id: string;
  userId: string;
  transactionType: 'earned' | 'spent' | 'transferred' | 'purchased';
  amount: number;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface SubscriptionBenefit {
  id: string;
  tier: 'free' | 'premium' | 'pro' | 'enterprise';
  benefitCategory: 'predictions' | 'insights' | 'community' | 'tools';
  benefitName: string;
  benefitValue?: string;
  perceivedValue?: number;
  actualCost?: number;
  usageRate?: number;
  createdAt: Date;
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface UserJourney {
  id: string;
  userId: string;
  journeyStage: 'awareness' | 'activation' | 'retention' | 'revenue' | 'referral';
  enteredStageAt: Date;
  actionsInStage?: {
    action: string;
    timestamp: Date;
    value?: any;
  }[];
  conversionProbability?: number;
  churnRisk?: number;
  lifetimeValueEstimate?: number;
  nextBestAction?: string;
  createdAt: Date;
}

export interface Experiment {
  id: string;
  experimentName: string;
  hypothesis: string;
  metricToMove: string;
  controlName: string;
  variantNames: string[];
  trafficAllocation?: Record<string, number>;
  sampleSize: number;
  statisticalSignificance?: number;
  winner?: string;
  liftPercentage?: number;
  isActive: boolean;
  createdAt: Date;
}

export interface ExperimentAssignment {
  userId: string;
  experimentId: string;
  variantName: string;
  converted: boolean;
  metricValue?: number;
  assignedAt: Date;
}

// ============================================================================
// HELPER TYPES & UTILITIES
// ============================================================================

export interface NetworkMetrics {
  totalNodes: number;
  totalEdges: number;
  networkDensity: number;
  metcalfeValue: number;
  reedValue: number;
}

export interface ViralMetrics {
  viralCoefficient: number;
  cycleTime: number;
  expectedGrowthRate: number;
  sustainableGrowth: boolean;
}

export interface TribeHealth {
  tribeId: string;
  activityLevel: 'dormant' | 'low' | 'moderate' | 'high' | 'very_high';
  memberRetention: number;
  contentVelocity: number;
  leaderEngagement: number;
  healthScore: number;
}

export interface PermissionValue {
  userId: string;
  totalPermissions: number;
  engagementLevel: 'low' | 'medium' | 'high' | 'very_high';
  estimatedLTV: number;
  churnProbability: number;
}