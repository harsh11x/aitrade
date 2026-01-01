"use client"

import { useState, useMemo } from "react"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateEquityCurve } from "@/lib/portfolio-data"

const timeRanges = [
  { label: "1W", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
  { label: "ALL", days: 730 },
]

export function EquityCurve() {
  const [selectedRange, setSelectedRange] = useState("3M")

  const data = useMemo(() => {
    const range = timeRanges.find((r) => r.label === selectedRange)
    return generateEquityCurve(range?.days || 90)
  }, [selectedRange])

  const startValue = data[0]?.value || 0
  const endValue = data[data.length - 1]?.value || 0
  const totalChange = endValue - startValue
  const changePercent = (totalChange / startValue) * 100
  const isPositive = totalChange >= 0

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-medium">Equity Curve</CardTitle>
          <div className={`text-sm mt-1 ${isPositive ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}>
            {isPositive ? "+" : ""}
            {totalChange.toFixed(2)} ({isPositive ? "+" : ""}
            {changePercent.toFixed(2)}%)
          </div>
        </div>
        <div className="flex items-center gap-1">
          {timeRanges.map((range) => (
            <Button
              key={range.label}
              variant={selectedRange === range.label ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setSelectedRange(range.label)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145, 70%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145, 70%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(260, 10%, 50%)", fontSize: 11 }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(260, 10%, 50%)", fontSize: 11 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                domain={["auto", "auto"]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-popover border border-border rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">{data.date}</p>
                        <p className="font-mono font-bold">${data.value.toLocaleString()}</p>
                        <p
                          className={`text-sm ${data.pnl >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
                        >
                          P&L: {data.pnl >= 0 ? "+" : ""}
                          {data.pnl.toFixed(2)}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(145, 70%, 50%)"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
