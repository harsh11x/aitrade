// Paper Trading Engine - Simulates realistic trading with slippage, fees, and latency

export interface PaperAccount {
  id: string
  name: string
  balance: number
  initialBalance: number
  currency: string
  leverage: number
  createdAt: number
}

export interface PaperOrder {
  id: string
  accountId: string
  symbol: string
  side: "buy" | "sell"
  type: "market" | "limit" | "stop" | "stop-limit"
  quantity: number
  price?: number
  stopPrice?: number
  takeProfit?: number
  stopLoss?: number
  status: "pending" | "filled" | "partial" | "cancelled"
  filledQuantity: number
  filledPrice?: number
  fee: number
  createdAt: number
  filledAt?: number
}

export interface PaperPosition {
  id: string
  accountId: string
  symbol: string
  side: "long" | "short"
  quantity: number
  entryPrice: number
  currentPrice: number
  takeProfit?: number
  stopLoss?: number
  pnl: number
  pnlPercent: number
  openedAt: number
}

export interface TradeHistory {
  id: string
  accountId: string
  symbol: string
  side: "buy" | "sell"
  quantity: number
  entryPrice: number
  exitPrice: number
  pnl: number
  pnlPercent: number
  fee: number
  openedAt: number
  closedAt: number
  holdingTime: number
  tags: string[]
}

export interface SimulationSettings {
  spreadPercent: number // 0.01 = 0.01%
  slippagePercent: number // 0.02 = 0.02%
  makerFeePercent: number // 0.1 = 0.1%
  takerFeePercent: number // 0.1 = 0.1%
  latencyMs: number // Execution delay
  fundingRatePercent: number // For perpetuals
}

export const defaultSimulationSettings: SimulationSettings = {
  spreadPercent: 0.01,
  slippagePercent: 0.02,
  makerFeePercent: 0.1,
  takerFeePercent: 0.1,
  latencyMs: 50,
  fundingRatePercent: 0.01,
}

// Calculate execution price with slippage
export function calculateExecutionPrice(
  marketPrice: number,
  side: "buy" | "sell",
  quantity: number,
  settings: SimulationSettings,
): number {
  const slippage = marketPrice * (settings.slippagePercent / 100)
  const spread = marketPrice * (settings.spreadPercent / 100)

  if (side === "buy") {
    return marketPrice + spread / 2 + slippage * Math.random()
  } else {
    return marketPrice - spread / 2 - slippage * Math.random()
  }
}

// Calculate trading fee
export function calculateFee(
  quantity: number,
  price: number,
  orderType: "market" | "limit" | "stop" | "stop-limit",
  settings: SimulationSettings,
): number {
  const notional = quantity * price
  const feePercent = orderType === "limit" ? settings.makerFeePercent : settings.takerFeePercent
  return notional * (feePercent / 100)
}

// Calculate position P&L
export function calculatePnL(position: PaperPosition, currentPrice: number): { pnl: number; pnlPercent: number } {
  const entryValue = position.quantity * position.entryPrice
  const currentValue = position.quantity * currentPrice

  let pnl: number
  if (position.side === "long") {
    pnl = currentValue - entryValue
  } else {
    pnl = entryValue - currentValue
  }

  const pnlPercent = (pnl / entryValue) * 100
  return { pnl, pnlPercent }
}

// Check if TP/SL should trigger
export function checkTpSlTrigger(position: PaperPosition, currentPrice: number): "tp" | "sl" | null {
  if (position.side === "long") {
    if (position.takeProfit && currentPrice >= position.takeProfit) return "tp"
    if (position.stopLoss && currentPrice <= position.stopLoss) return "sl"
  } else {
    if (position.takeProfit && currentPrice <= position.takeProfit) return "tp"
    if (position.stopLoss && currentPrice >= position.stopLoss) return "sl"
  }
  return null
}

// Risk calculations
export function calculatePositionSize(
  accountBalance: number,
  riskPercent: number,
  entryPrice: number,
  stopLossPrice: number,
): number {
  const riskAmount = accountBalance * (riskPercent / 100)
  const priceDiff = Math.abs(entryPrice - stopLossPrice)
  return riskAmount / priceDiff
}

export function calculateRiskRewardRatio(
  entryPrice: number,
  stopLoss: number,
  takeProfit: number,
  side: "long" | "short",
): number {
  if (side === "long") {
    const risk = entryPrice - stopLoss
    const reward = takeProfit - entryPrice
    return reward / risk
  } else {
    const risk = stopLoss - entryPrice
    const reward = entryPrice - takeProfit
    return reward / risk
  }
}

// Performance metrics
export interface PerformanceMetrics {
  totalTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  totalPnL: number
  totalPnLPercent: number
  averageWin: number
  averageLoss: number
  profitFactor: number
  averageRR: number
  maxDrawdown: number
  sharpeRatio: number
  averageHoldingTime: number
}

export function calculatePerformanceMetrics(trades: TradeHistory[], initialBalance: number): PerformanceMetrics {
  if (trades.length === 0) {
    return {
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      winRate: 0,
      totalPnL: 0,
      totalPnLPercent: 0,
      averageWin: 0,
      averageLoss: 0,
      profitFactor: 0,
      averageRR: 0,
      maxDrawdown: 0,
      sharpeRatio: 0,
      averageHoldingTime: 0,
    }
  }

  const winningTrades = trades.filter((t) => t.pnl > 0)
  const losingTrades = trades.filter((t) => t.pnl < 0)

  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0)
  const grossProfit = winningTrades.reduce((sum, t) => sum + t.pnl, 0)
  const grossLoss = Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0))

  const avgWin = winningTrades.length > 0 ? grossProfit / winningTrades.length : 0
  const avgLoss = losingTrades.length > 0 ? grossLoss / losingTrades.length : 0

  // Calculate max drawdown
  let peak = initialBalance
  let maxDrawdown = 0
  let runningBalance = initialBalance

  for (const trade of trades) {
    runningBalance += trade.pnl
    if (runningBalance > peak) peak = runningBalance
    const drawdown = ((peak - runningBalance) / peak) * 100
    if (drawdown > maxDrawdown) maxDrawdown = drawdown
  }

  // Calculate Sharpe ratio (simplified)
  const returns = trades.map((t) => t.pnlPercent)
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length
  const stdDev = Math.sqrt(variance)
  const sharpeRatio = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(252) : 0

  return {
    totalTrades: trades.length,
    winningTrades: winningTrades.length,
    losingTrades: losingTrades.length,
    winRate: (winningTrades.length / trades.length) * 100,
    totalPnL,
    totalPnLPercent: (totalPnL / initialBalance) * 100,
    averageWin: avgWin,
    averageLoss: avgLoss,
    profitFactor: grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Number.POSITIVE_INFINITY : 0,
    averageRR: avgLoss > 0 ? avgWin / avgLoss : 0,
    maxDrawdown,
    sharpeRatio,
    averageHoldingTime: trades.reduce((sum, t) => sum + t.holdingTime, 0) / trades.length,
  }
}
