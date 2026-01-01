"use client"

import { TrendingUp, TrendingDown, X, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { samplePositions } from "@/lib/mock-data"

export function Positions() {
  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-sm">Positions</h3>
          <span className="text-xs text-muted-foreground">{samplePositions.length} Open</span>
        </div>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Invested: </span>
            <span className="font-mono">
              ${samplePositions.reduce((acc, pos) => acc + pos.entryPrice * pos.quantity, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Unrealized P&L: </span>
            <span className={`font-mono ${samplePositions.reduce((acc, pos) => acc + pos.pnl, 0) >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}>
              {samplePositions.reduce((acc, pos) => acc + pos.pnl, 0) >= 0 ? "+" : ""}
              ${Math.abs(samplePositions.reduce((acc, pos) => acc + pos.pnl, 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Total P&L: </span>
            <span className="text-[hsl(145,70%,50%)] font-mono">+$1,235.11 (+2.41%)</span>
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
        {samplePositions.map((position) => (
          <div
            key={position.symbol}
            className="grid grid-cols-8 gap-2 px-3 py-2 text-sm items-center hover:bg-secondary/50 transition-colors border-b border-border/50"
          >
            <span className="font-medium">{position.symbol}</span>
            <span
              className={`inline-flex items-center gap-1 ${position.side === "long" ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
            >
              {position.side === "long" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {position.side.toUpperCase()}
            </span>
            <span className="text-right font-mono">{position.quantity}</span>
            <span className="text-right font-mono">${(position.entryPrice * position.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-right font-mono">${position.currentPrice.toLocaleString()}</span>
            <span
              className={`text-right font-mono ${position.pnl >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
            >
              {position.pnl >= 0 ? "+" : ""}
              {position.pnl.toFixed(2)}
            </span>
            <span
              className={`text-right font-mono ${position.pnlPercent >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
            >
              {position.pnlPercent >= 0 ? "+" : ""}
              {position.pnlPercent.toFixed(2)}%
            </span>
            <div className="flex justify-end gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
