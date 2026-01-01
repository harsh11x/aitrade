// Portfolio analytics mock data

export interface PortfolioSummary {
  totalValue: number
  totalPnL: number
  totalPnLPercent: number
  dayChange: number
  dayChangePercent: number
  weekChange: number
  weekChangePercent: number
  monthChange: number
  monthChangePercent: number
}

export interface AssetAllocation {
  asset: string
  symbol: string
  value: number
  allocation: number
  pnl: number
  pnlPercent: number
  color: string
}

export interface EquityCurvePoint {
  date: string
  value: number
  pnl: number
}

export interface TradeStats {
  label: string
  value: string | number
  change?: number
  changeType?: "positive" | "negative" | "neutral"
}

// Sample portfolio data
export const portfolioSummary: PortfolioSummary = {
  totalValue: 127543.21,
  totalPnL: 27543.21,
  totalPnLPercent: 27.54,
  dayChange: 1234.56,
  dayChangePercent: 0.98,
  weekChange: 5678.9,
  weekChangePercent: 4.67,
  monthChange: 12345.67,
  monthChangePercent: 10.72,
}

export const assetAllocation: AssetAllocation[] = [
  {
    asset: "Bitcoin",
    symbol: "BTC",
    value: 62500,
    allocation: 49.0,
    pnl: 12500,
    pnlPercent: 25.0,
    color: "hsl(35, 90%, 55%)",
  },
  {
    asset: "Ethereum",
    symbol: "ETH",
    value: 34125,
    allocation: 26.8,
    pnl: 8125,
    pnlPercent: 31.2,
    color: "hsl(240, 60%, 60%)",
  },
  {
    asset: "Solana",
    symbol: "SOL",
    value: 14520,
    allocation: 11.4,
    pnl: 3520,
    pnlPercent: 32.0,
    color: "hsl(280, 70%, 55%)",
  },
  { asset: "USDT", symbol: "USDT", value: 10000, allocation: 7.8, pnl: 0, pnlPercent: 0, color: "hsl(160, 60%, 50%)" },
  {
    asset: "Others",
    symbol: "OTHER",
    value: 6398.21,
    allocation: 5.0,
    pnl: 3398.21,
    pnlPercent: 113.3,
    color: "hsl(200, 60%, 55%)",
  },
]

export function generateEquityCurve(days: number): EquityCurvePoint[] {
  const data: EquityCurvePoint[] = []
  const startValue = 100000
  let currentValue = startValue
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Random walk with slight upward bias
    const change = (Math.random() - 0.45) * currentValue * 0.02
    currentValue += change

    data.push({
      date: date.toISOString().split("T")[0],
      value: currentValue,
      pnl: currentValue - startValue,
    })
  }

  return data
}

export const tradeStats: TradeStats[] = [
  { label: "Total Trades", value: 156 },
  { label: "Win Rate", value: "67.3%", change: 2.1, changeType: "positive" },
  { label: "Profit Factor", value: "2.14", change: 0.12, changeType: "positive" },
  { label: "Avg R:R", value: "1:2.3" },
  { label: "Best Trade", value: "+$4,521", changeType: "positive" },
  { label: "Worst Trade", value: "-$1,234", changeType: "negative" },
  { label: "Max Drawdown", value: "8.2%", changeType: "negative" },
  { label: "Sharpe Ratio", value: "1.87", change: 0.23, changeType: "positive" },
]

export interface RecentTrade {
  id: string
  symbol: string
  side: "long" | "short"
  entryPrice: number
  exitPrice: number
  quantity: number
  pnl: number
  pnlPercent: number
  date: string
  duration: string
  tags: string[]
}

export const recentTrades: RecentTrade[] = [
  {
    id: "1",
    symbol: "BTC/USDT",
    side: "long",
    entryPrice: 61200,
    exitPrice: 62543,
    quantity: 0.5,
    pnl: 671.5,
    pnlPercent: 2.19,
    date: "2025-11-26",
    duration: "4h 23m",
    tags: ["breakout"],
  },
  {
    id: "2",
    symbol: "ETH/USDT",
    side: "long",
    entryPrice: 3280,
    exitPrice: 3412,
    quantity: 5.2,
    pnl: 686.4,
    pnlPercent: 4.02,
    date: "2025-11-25",
    duration: "12h 45m",
    tags: ["support bounce"],
  },
  {
    id: "3",
    symbol: "SOL/USDT",
    side: "short",
    entryPrice: 152.3,
    exitPrice: 145.2,
    quantity: 25,
    pnl: 177.5,
    pnlPercent: 4.66,
    date: "2025-11-25",
    duration: "6h 12m",
    tags: ["resistance rejection"],
  },
  {
    id: "4",
    symbol: "BNB/USDT",
    side: "long",
    entryPrice: 595,
    exitPrice: 612,
    quantity: 8,
    pnl: 136.0,
    pnlPercent: 2.86,
    date: "2025-11-24",
    duration: "18h 30m",
    tags: ["trend follow"],
  },
  {
    id: "5",
    symbol: "AVAX/USDT",
    side: "long",
    entryPrice: 32.5,
    exitPrice: 35.67,
    quantity: 100,
    pnl: 317.0,
    pnlPercent: 9.75,
    date: "2025-11-24",
    duration: "2d 4h",
    tags: ["breakout", "high volume"],
  },
]
