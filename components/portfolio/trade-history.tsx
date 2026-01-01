"use client"

import { TrendingUp, TrendingDown, Clock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { recentTrades } from "@/lib/portfolio-data"

export function TradeHistory() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Recent Trades</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-xs">
          View All
          <ExternalLink className="w-3 h-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentTrades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    trade.side === "long" ? "bg-[hsl(145,70%,50%)]/20" : "bg-[hsl(25,80%,55%)]/20"
                  }`}
                >
                  {trade.side === "long" ? (
                    <TrendingUp className="w-4 h-4 text-[hsl(145,70%,50%)]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-[hsl(25,80%,55%)]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{trade.symbol}</span>
                    <span
                      className={`text-xs ${trade.side === "long" ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
                    >
                      {trade.side.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-mono">
                      {trade.entryPrice} → {trade.exitPrice}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {trade.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {trade.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-right">
                  <div
                    className={`font-mono font-bold ${trade.pnl >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
                  >
                    {trade.pnl >= 0 ? "+" : ""}
                    {trade.pnl.toFixed(2)}
                  </div>
                  <div className={`text-xs ${trade.pnl >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}>
                    {trade.pnl >= 0 ? "+" : ""}
                    {trade.pnlPercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
