// Mock data for the trading platform

export interface CandleData {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface OrderBookEntry {
  price: number
  quantity: number
  total: number
}

export interface Trade {
  id: string
  price: number
  quantity: number
  side: "buy" | "sell"
  time: number
}

export interface Position {
  symbol: string
  side: "long" | "short"
  quantity: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}

export interface WatchlistItem {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
}

// Generate realistic OHLC data
export function generateCandleData(count: number, basePrice = 62500): CandleData[] {
  const data: CandleData[] = []
  let currentPrice = basePrice
  const now = Date.now()
  const interval = 60 * 60 * 1000 // 1 hour in milliseconds

  for (let i = count; i > 0; i--) {
    const volatility = 0.02
    const change = (Math.random() - 0.5) * 2 * volatility * currentPrice
    const open = currentPrice
    const close = currentPrice + change
    const high = Math.max(open, close) + Math.random() * volatility * currentPrice * 0.5
    const low = Math.min(open, close) - Math.random() * volatility * currentPrice * 0.5
    const volume = Math.floor(Math.random() * 1000 + 100)

    data.push({
      time: now - i * interval,
      open,
      high,
      low,
      close,
      volume,
    })

    currentPrice = close
  }

  return data
}

// Generate order book data
export function generateOrderBook(midPrice: number, levels = 15): { bids: OrderBookEntry[]; asks: OrderBookEntry[] } {
  const bids: OrderBookEntry[] = []
  const asks: OrderBookEntry[] = []
  let bidTotal = 0
  let askTotal = 0

  for (let i = 0; i < levels; i++) {
    const bidPrice = midPrice - (i + 1) * (midPrice * 0.0005)
    const bidQty = Math.random() * 5 + 0.5
    bidTotal += bidQty
    bids.push({
      price: bidPrice,
      quantity: bidQty,
      total: bidTotal,
    })

    const askPrice = midPrice + (i + 1) * (midPrice * 0.0005)
    const askQty = Math.random() * 5 + 0.5
    askTotal += askQty
    asks.push({
      price: askPrice,
      quantity: askQty,
      total: askTotal,
    })
  }

  return { bids, asks }
}

// Generate recent trades
export function generateTrades(count: number, midPrice: number): Trade[] {
  const trades: Trade[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    trades.push({
      id: `trade-${i}`,
      price: midPrice + (Math.random() - 0.5) * midPrice * 0.001,
      quantity: Math.random() * 2 + 0.1,
      side: Math.random() > 0.5 ? "buy" : "sell",
      time: now - i * 1000 * Math.random() * 10,
    })
  }

  return trades.sort((a, b) => b.time - a.time)
}

// Sample positions
export const samplePositions: Position[] = [
  {
    symbol: "BTC/USDT",
    side: "long",
    quantity: 0.5,
    entryPrice: 61200,
    currentPrice: 62543.21,
    pnl: 671.61,
    pnlPercent: 2.19,
  },
  {
    symbol: "ETH/USDT",
    side: "long",
    quantity: 5.2,
    entryPrice: 3320,
    currentPrice: 3412.5,
    pnl: 481.0,
    pnlPercent: 2.79,
  },
  {
    symbol: "SOL/USDT",
    side: "short",
    quantity: 25,
    entryPrice: 148.5,
    currentPrice: 145.2,
    pnl: 82.5,
    pnlPercent: 2.22,
  },
]

// Sample watchlist
export const sampleWatchlist: WatchlistItem[] = [
  { symbol: "BTC/USDT", name: "Bitcoin", price: 62543.21, change: 1234.56, changePercent: 2.01, volume: "24.5B" },
  { symbol: "ETH/USDT", name: "Ethereum", price: 3412.5, change: 89.3, changePercent: 2.69, volume: "12.3B" },
  { symbol: "SOL/USDT", name: "Solana", price: 145.2, change: -3.45, changePercent: -2.32, volume: "2.1B" },
  { symbol: "BNB/USDT", name: "BNB", price: 612.8, change: 15.2, changePercent: 2.54, volume: "890M" },
  { symbol: "XRP/USDT", name: "Ripple", price: 0.6234, change: 0.0123, changePercent: 2.01, volume: "1.2B" },
  { symbol: "ADA/USDT", name: "Cardano", price: 0.4521, change: -0.0089, changePercent: -1.93, volume: "456M" },
  { symbol: "DOGE/USDT", name: "Dogecoin", price: 0.0823, change: 0.0034, changePercent: 4.31, volume: "780M" },
  { symbol: "AVAX/USDT", name: "Avalanche", price: 35.67, change: 1.23, changePercent: 3.57, volume: "234M" },
]

// Sample AI messages
export const sampleAIMessages = [
  {
    role: "assistant" as const,
    content: `Welcome to NexTrade AI! I'm your trading assistant. I can help you with:

• **Chart Analysis** - Identify trends, patterns, and key levels
• **Trade Ideas** - Generate entry/exit points with risk management
• **Market Insights** - Real-time sentiment and news analysis
• **Order Execution** - Place and manage orders via natural language

How can I assist you today?`,
  },
]
