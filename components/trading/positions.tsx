"use client"

import { TrendingUp, TrendingDown, X, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTrading } from "@/lib/context/TradingContext"

export function Positions() {
  const { positions, currentPrice, closePosition, realizedPnL, unrealizedPnL } = useTrading()

  const totalPnL = realizedPnL + unrealizedPnL
  const totalPnLSign = totalPnL >= 0 ? "+" : ""
  const totalPnLColor = totalPnL >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-sm">Positions</h3>
          <span className="text-xs text-muted-foreground">{positions.length} Open</span>
        </div>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Invested: </span>
            <span className="font-mono">
              ${positions.reduce((acc, pos) => acc + pos.entryPrice * pos.size, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Unrealized P&L: </span>
            <span className={`font-mono ${unrealizedPnL >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}>
              {unrealizedPnL >= 0 ? "+" : ""}
              ${Math.abs(unrealizedPnL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Total P&L: </span>
            <span className={`${totalPnLColor} font-mono`}>{totalPnLSign}${Math.abs(totalPnL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 px-3 py-2 text-xs text-muted-foreground border-b border-border">
        <span>Symbol</span>
        <span>Side</span>
        <span className="text-right">Size</span>
        <span className="text-right">Invested</span>
        <span className="text-right">Mark</span>
        <span className="text-right">P&L</span>
        <span className="text-right">P&L %</span>
        <span className="text-right">Actions</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {positions.map((position) => {
          const priceDiff = currentPrice - position.entryPrice
          const pnl = position.side === 'LONG' ? priceDiff * position.size : -priceDiff * position.size
          const invested = position.entryPrice * position.size / position.leverage
          const pnlPercent = (pnl / invested) * 100

          return (
            <div
              key={position.id}
              className="grid grid-cols-8 gap-2 px-3 py-2 text-sm items-center hover:bg-secondary/50 transition-colors border-b border-border/50"
            >
              <span className="font-medium">{position.symbol}</span>
              <span
                className={`inline-flex items-center gap-1 ${position.side === "LONG" ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
              >
                {position.side === "LONG" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {position.side}
              </span>
              <span className="text-right font-mono">{position.size.toFixed(4)}</span>
              <span className="text-right font-mono">${(position.entryPrice * position.size).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="text-right font-mono">${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span
                className={`text-right font-mono ${pnl >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
              >
                {pnl >= 0 ? "+" : ""}
                {pnl.toFixed(2)}
              </span>
              <span
                className={`text-right font-mono ${pnlPercent >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
              >
                {pnlPercent >= 0 ? "+" : ""}
                {pnlPercent.toFixed(2)}%
              </span>
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => closePosition(position.id)}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
