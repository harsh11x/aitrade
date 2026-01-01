"use client"

import { TrendingUp, TrendingDown, Wallet, BarChart3, Target, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { portfolioSummary } from "@/lib/portfolio-data"

export function PortfolioSummary() {
  const {
    totalValue,
    totalPnL,
    totalPnLPercent,
    dayChange,
    dayChangePercent,
    weekChange,
    weekChangePercent,
    monthChange,
    monthChangePercent,
  } = portfolioSummary
  const isPositive = totalPnL >= 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Portfolio Value */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
          <Wallet className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-mono">${totalValue.toLocaleString()}</div>
          <div
            className={`flex items-center gap-1 text-sm ${isPositive ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
          >
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>
              {isPositive ? "+" : ""}
              {totalPnL.toLocaleString()} ({isPositive ? "+" : ""}
              {totalPnLPercent.toFixed(2)}%)
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Today's Change */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
          <Activity className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold font-mono ${dayChange >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
          >
            {dayChange >= 0 ? "+" : ""}
            {dayChange.toLocaleString()}
          </div>
          <div className={`text-sm ${dayChange >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}>
            {dayChange >= 0 ? "+" : ""}
            {dayChangePercent.toFixed(2)}% from yesterday
          </div>
        </CardContent>
      </Card>

      {/* This Week */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold font-mono ${weekChange >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
          >
            {weekChange >= 0 ? "+" : ""}
            {weekChange.toLocaleString()}
          </div>
          <div className={`text-sm ${weekChange >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}>
            {weekChange >= 0 ? "+" : ""}
            {weekChangePercent.toFixed(2)}% this week
          </div>
        </CardContent>
      </Card>

      {/* This Month */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          <Target className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div
            className={`text-2xl font-bold font-mono ${monthChange >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
          >
            {monthChange >= 0 ? "+" : ""}
            {monthChange.toLocaleString()}
          </div>
          <div className={`text-sm ${monthChange >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}>
            {monthChange >= 0 ? "+" : ""}
            {monthChangePercent.toFixed(2)}% this month
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
