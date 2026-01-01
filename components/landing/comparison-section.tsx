"use client"

import { AnimatedSection } from "./animated-section"
import { Check, X, Minus } from "lucide-react"

const comparisonData = [
  {
    feature: "AI-Powered Autonomous Trading",
    nextrade: "full",
    tradingview: "none",
    bloomberg: "partial",
    thinkorswim: "none",
  },
  {
    feature: "Real-Time TradingView Charts",
    nextrade: "full",
    tradingview: "full",
    bloomberg: "full",
    thinkorswim: "full",
  },
  { feature: "3 AI Trading Modes", nextrade: "full", tradingview: "none", bloomberg: "none", thinkorswim: "none" },
  {
    feature: "Multi-Broker Connectivity",
    nextrade: "full",
    tradingview: "partial",
    bloomberg: "full",
    thinkorswim: "partial",
  },
  {
    feature: "Paper Trading Simulation",
    nextrade: "full",
    tradingview: "full",
    bloomberg: "full",
    thinkorswim: "full",
  },
  {
    feature: "Natural Language Commands",
    nextrade: "full",
    tradingview: "none",
    bloomberg: "partial",
    thinkorswim: "none",
  },
  {
    feature: "Automated Risk Management",
    nextrade: "full",
    tradingview: "partial",
    bloomberg: "full",
    thinkorswim: "partial",
  },
  {
    feature: "Social Trading & Copy",
    nextrade: "full",
    tradingview: "partial",
    bloomberg: "none",
    thinkorswim: "none",
  },
  { feature: "Strategy Backtesting", nextrade: "full", tradingview: "full", bloomberg: "full", thinkorswim: "full" },
  {
    feature: "Free Tier Available",
    nextrade: "full",
    tradingview: "partial",
    bloomberg: "none",
    thinkorswim: "partial",
  },
]

const FeatureIcon = ({ status }: { status: string }) => {
  if (status === "full") return <Check className="w-5 h-5 text-primary" />
  if (status === "partial") return <Minus className="w-5 h-5 text-muted-foreground" />
  return <X className="w-5 h-5 text-destructive/60" />
}

export function ComparisonSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            See How We Stack Up Against the Competition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NexTrade isn&apos;t just another trading platform — it&apos;s a quantum leap forward in trading technology.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Feature</th>
                  <th className="text-center py-4 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        N
                      </div>
                      <span className="text-sm font-semibold text-foreground">NexTrade</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-bold">
                        TV
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">TradingView</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-bold">
                        BB
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Bloomberg</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground font-bold">
                        TOS
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Thinkorswim</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                    <td className="py-4 px-4 text-sm text-foreground">{row.feature}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <FeatureIcon status={row.nextrade} />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <FeatureIcon status={row.tradingview} />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <FeatureIcon status={row.bloomberg} />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <FeatureIcon status={row.thinkorswim} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
