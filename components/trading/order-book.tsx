"use client"

import { useState, useEffect } from "react"
import { generateOrderBook, type OrderBookEntry } from "@/lib/mock-data"

export function OrderBook() {
  const [orderBook, setOrderBook] = useState<{ bids: OrderBookEntry[]; asks: OrderBookEntry[] }>({ bids: [], asks: [] })
  const midPrice = 62543.21

  useEffect(() => {
    const book = generateOrderBook(midPrice, 12)
    setOrderBook(book)

    // Simulate live updates
    const interval = setInterval(() => {
      setOrderBook(generateOrderBook(midPrice + (Math.random() - 0.5) * 50, 12))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const maxTotal = Math.max(...orderBook.bids.map((b) => b.total), ...orderBook.asks.map((a) => a.total))

  return (
    <div className="flex flex-col h-full glass-card rounded-lg border border-border overflow-hidden">
      <div className="p-3 border-b border-border flex justify-between items-center bg-muted/20">
        <h3 className="font-semibold text-sm">Order Book</h3>
        <div className="flex gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500/50"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/50"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-green-500/50"></span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border font-medium">
        <span>Price (USDT)</span>
        <span className="text-right">Amount (BTC)</span>
        <span className="text-right">Total</span>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col font-mono text-xs">
        {/* Asks (sells) - reversed to show highest at top */}
        <div className="flex-1 overflow-y-auto flex flex-col-reverse custom-scrollbar-hide">
          {orderBook.asks
            .slice()
            .reverse()
            .map((ask, i) => (
              <div key={`ask-${i}`} className="grid grid-cols-3 gap-2 px-3 py-0.5 relative group hover:bg-white/5 transition-colors">
                <div
                  className="absolute inset-0 bg-gradient-to-l from-bearish/20 to-transparent opacity-50"
                  style={{ width: `${(ask.total / maxTotal) * 100}%`, right: 0, left: "auto" }}
                />
                <span className="relative text-bearish group-hover:text-bearish/80 tabular-nums">{ask.price.toFixed(2)}</span>
                <span className="relative text-right text-gray-400 group-hover:text-white tabular-nums">{ask.quantity.toFixed(4)}</span>
                <span className="relative text-right text-muted-foreground group-hover:text-gray-300 tabular-nums">{ask.total.toFixed(4)}</span>
              </div>
            ))}
        </div>

        {/* Spread / Mid Price */}
        <div className="py-2 px-3 bg-secondary/30 border-y border-border backdrop-blur-sm sticky my-auto text-center z-10">
          <span className="text-lg font-mono font-bold text-bullish tracking-tight">{midPrice.toFixed(2)}</span>
          <div className="flex justify-center items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
            <span>Spread: 0.01%</span>
            <span className="text-green-500">24h High</span>
          </div>
        </div>

        {/* Bids (buys) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar-hide">
          {orderBook.bids.map((bid, i) => (
            <div key={`bid-${i}`} className="grid grid-cols-3 gap-2 px-3 py-0.5 relative group hover:bg-white/5 transition-colors">
              <div
                className="absolute inset-0 bg-gradient-to-l from-bullish/20 to-transparent opacity-50"
                style={{ width: `${(bid.total / maxTotal) * 100}%`, right: 0, left: "auto" }}
              />
              <span className="relative text-bullish group-hover:text-bullish/80 tabular-nums">{bid.price.toFixed(2)}</span>
              <span className="relative text-right text-gray-400 group-hover:text-white tabular-nums">{bid.quantity.toFixed(4)}</span>
              <span className="relative text-right text-muted-foreground group-hover:text-gray-300 tabular-nums">{bid.total.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
