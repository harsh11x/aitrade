"use client"

import { useState, useEffect } from "react"
import { generateTrades, type Trade } from "@/lib/mock-data"

export function RecentTrades() {
  const [trades, setTrades] = useState<Trade[]>([])

  useEffect(() => {
    setTrades(generateTrades(20, 62543.21))

    const interval = setInterval(() => {
      setTrades((prev) => {
        const newTrade: Trade = {
          id: `trade-${Date.now()}`,
          price: 62543.21 + (Math.random() - 0.5) * 100,
          quantity: Math.random() * 2 + 0.1,
          side: Math.random() > 0.5 ? "buy" : "sell",
          time: Date.now(),
        }
        return [newTrade, ...prev.slice(0, 19)]
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-3 border-b border-border">
        <h3 className="font-semibold text-sm">Recent Trades</h3>
      </div>

      <div className="grid grid-cols-3 gap-2 px-3 py-2 text-xs text-muted-foreground border-b border-border">
        <span>Price (USDT)</span>
        <span className="text-right">Amount (BTC)</span>
        <span className="text-right">Time</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="grid grid-cols-3 gap-2 px-3 py-1 text-xs font-mono hover:bg-secondary/50 transition-colors"
          >
            <span className={trade.side === "buy" ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}>
              {trade.price.toFixed(2)}
            </span>
            <span className="text-right">{trade.quantity.toFixed(4)}</span>
            <span className="text-right text-muted-foreground">{formatTime(trade.time)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
