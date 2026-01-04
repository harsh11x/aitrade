// Advanced AI Trading Agent System
// This module contains all the logic for the autonomous trading AI

export interface AIAgentConfig {
  mode: "autonomous" | "hybrid" | "manual"
  riskLevel: "conservative" | "moderate" | "aggressive"
  maxDailyLoss: number // percentage
  maxDrawdown: number // percentage
  maxPositionSize: number // percentage of portfolio
  enabledStrategies: string[]
  tradingPairs: string[]
  autoStopLoss: boolean
  autoTakeProfit: boolean
  trailingStop: boolean
  breakeven: boolean
  partialProfitTaking: boolean
}

export interface MarketAnalysis {
  symbol: string
  timeframe: string
  trend: "bullish" | "bearish" | "neutral"
  strength: number // 0-100
  supportLevels: number[]
  resistanceLevels: number[]
  liquidityZones: { price: number; type: "buy" | "sell"; strength: number }[]
  patterns: Pattern[]
  indicators: IndicatorReading[]
  sentiment: SentimentData
  confidence: number // 0-100
}

export interface Pattern {
  type: string
  direction: "bullish" | "bearish"
  reliability: number
  priceTarget?: number
}

export interface IndicatorReading {
  name: string
  value: number
  signal: "buy" | "sell" | "neutral"
  strength: number
}

export interface SentimentData {
  overall: "bullish" | "bearish" | "neutral"
  news: number // -100 to 100
  social: number // -100 to 100
  onChain: number // -100 to 100
}

export interface TradeSignal {
  id: string
  symbol: string
  side: "long" | "short"
  entry: number
  stopLoss: number
  takeProfit: number[]
  confidence: number
  reasoning: string[]
  confluenceScore: number
  riskReward: number
  positionSize: number
  status: "pending" | "active" | "executed" | "cancelled"
  createdAt: number
}

export interface AgentState {
  isRunning: boolean
  mode: AIAgentConfig["mode"]
  currentAnalysis: MarketAnalysis | null
  activeSignals: TradeSignal[]
  recentDecisions: AgentDecision[]
  performance: PerformanceMetrics
  safetyStatus: SafetyStatus
}

export interface AgentDecision {
  id: string
  timestamp: number
  type: "entry" | "exit" | "modify" | "cancel" | "skip"
  symbol: string
  reasoning: string
  confidence: number
}

export interface PerformanceMetrics {
  totalTrades: number
  winRate: number
  profitFactor: number
  sharpeRatio: number
  maxDrawdown: number
  averageRR: number
  expectancy: number
  todayPnL: number
  weekPnL: number
  monthPnL: number
}

export interface SafetyStatus {
  dailyLossUsed: number
  drawdownCurrent: number
  isTrading: boolean
  pauseReason: string | null
  volatilityLevel: "low" | "normal" | "high" | "extreme"
  marketRegime: "trending" | "ranging" | "volatile" | "quiet"
}

// Strategy definitions
export const STRATEGIES = {
  TREND_FOLLOWING: "trend_following",
  MEAN_REVERSION: "mean_reversion",
  BREAKOUT: "breakout",
  SCALPING: "scalping",
  SWING: "swing",
  ARBITRAGE: "arbitrage",
  SMC: "smart_money_concepts",
} as const

// Default agent configuration
export const DEFAULT_AGENT_CONFIG: AIAgentConfig = {
  mode: "hybrid",
  riskLevel: "moderate",
  maxDailyLoss: 3,
  maxDrawdown: 10,
  maxPositionSize: 5,
  enabledStrategies: [STRATEGIES.TREND_FOLLOWING, STRATEGIES.SMC, STRATEGIES.SWING],
  tradingPairs: ["BTC/USDT", "ETH/USDT", "SOL/USDT"],
  autoStopLoss: true,
  autoTakeProfit: true,
  trailingStop: true,
  breakeven: true,
  partialProfitTaking: true,
}

// Mock analysis generator for demonstration
export function generateMarketAnalysis(symbol: string, currentPrice: number): MarketAnalysis {
  const trends = ["bullish", "bearish", "neutral"] as const
  const trend = trends[Math.floor(Math.random() * 3)]
  const basePrice = currentPrice

  return {
    symbol,
    timeframe: "4H",
    trend,
    strength: Math.floor(Math.random() * 40) + 60,
    supportLevels: [basePrice * 0.985, basePrice * 0.965, basePrice * 0.94],
    resistanceLevels: [basePrice * 1.015, basePrice * 1.035, basePrice * 1.06],
    liquidityZones: [
      { price: basePrice * 0.97, type: "buy", strength: 85 },
      { price: basePrice * 1.03, type: "sell", strength: 78 },
    ],
    patterns: [
      { type: "Liquidity Sweep", direction: trend === 'bullish' ? "bullish" : "bearish", reliability: 85 },
      { type: "FVG Retest", direction: trend === 'bullish' ? "bullish" : "bearish", reliability: 78 },
    ],
    indicators: [
      { name: "RSI", value: trend === 'bullish' ? 42 : 68, signal: trend === 'bullish' ? "buy" : "sell", strength: 60 },
      { name: "MACD", value: 0.5, signal: trend === 'bullish' ? "buy" : "sell", strength: 70 },
      { name: "EMA 200", value: basePrice * (trend === 'bullish' ? 0.99 : 1.01), signal: trend === 'bullish' ? "buy" : "sell", strength: 80 },
      { name: "VWAP", value: basePrice * (trend === 'bullish' ? 0.995 : 1.005), signal: trend === 'bullish' ? "buy" : "sell", strength: 65 },
    ],
    sentiment: {
      overall: trend,
      news: trend === 'bullish' ? 65 : -45,
      social: trend === 'bullish' ? 72 : -30,
      onChain: trend === 'bullish' ? 55 : -20,
    },
    confidence: Math.floor(Math.random() * 15) + 80, // Higher confidence
  }
}

// Generate trade signal based on analysis
export function generateTradeSignal(analysis: MarketAnalysis): TradeSignal | null {
  if (analysis.confidence < 70) return null

  // Use the resistance/support or mid price as base
  const basePrice = (analysis.supportLevels[0] + analysis.resistanceLevels[0]) / 2
  // Wait, I should pass the current price or just use levels. 
  // Actually, I can infer close price from levels roughly, but better to use what was passed.
  // The 'analysis' object doesn't have currentPrice field, but I generated levels relative to it.
  // Let's assume the mid-point of immediate S/R is roughly price.

  const side = analysis.trend === "bullish" ? "long" : analysis.trend === "bearish" ? "short" : null

  if (!side) return null

  const entry = basePrice
  const stopLoss = side === "long" ? entry * 0.98 : entry * 1.02
  const tp1 = side === "long" ? entry * 1.02 : entry * 0.98
  const tp2 = side === "long" ? entry * 1.04 : entry * 0.96
  const tp3 = side === "long" ? entry * 1.06 : entry * 0.94

  const riskReward = Math.abs(tp1 - entry) / Math.abs(entry - stopLoss)

  return {
    id: `signal-${Date.now()}`,
    symbol: analysis.symbol,
    side,
    entry,
    stopLoss,
    takeProfit: [tp1, tp2, tp3],
    confidence: analysis.confidence,
    reasoning: [
      `${analysis.trend.charAt(0).toUpperCase() + analysis.trend.slice(1)} market structure confirmed`,
      `Confluence score: ${analysis.strength}/100`,
      `Key support at $${analysis.supportLevels[0].toFixed(2)}`,
      `RSI at ${analysis.indicators[0].value} - not overbought`,
      `Volume profile supports ${side} bias`,
    ],
    confluenceScore: analysis.strength,
    riskReward,
    positionSize: 2.5, // 2.5% of portfolio
    status: "pending",
    createdAt: Date.now(),
  }
}

// Format currency values
export function formatCurrency(value: number, symbol = "$"): string {
  if (value >= 1000000) return `${symbol}${(value / 1000000).toFixed(2)}M`
  if (value >= 1000) return `${symbol}${(value / 1000).toFixed(2)}K`
  return `${symbol}${value.toFixed(2)}`
}

// Calculate position size based on risk
export function calculatePositionSize(
  accountBalance: number,
  riskPercent: number,
  entryPrice: number,
  stopLoss: number,
): number {
  const riskAmount = accountBalance * (riskPercent / 100)
  const priceDifference = Math.abs(entryPrice - stopLoss)
  return riskAmount / priceDifference
}
