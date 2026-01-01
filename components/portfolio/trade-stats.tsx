"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tradeStats } from "@/lib/portfolio-data"

export function TradeStats() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Trading Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tradeStats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg font-mono font-bold ${
                    stat.changeType === "positive"
                      ? "text-[hsl(145,70%,50%)]"
                      : stat.changeType === "negative"
                        ? "text-[hsl(25,80%,55%)]"
                        : "text-foreground"
                  }`}
                >
                  {stat.value}
                </span>
                {stat.change !== undefined && (
                  <span
                    className={`flex items-center text-xs ${
                      stat.change >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"
                    }`}
                  >
                    {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change >= 0 ? "+" : ""}
                    {stat.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
