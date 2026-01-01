"use client"

import { AnimatedSection } from "./animated-section"
import { CursorSpotlight } from "./cursor-spotlight"
import {
  BarChart3,
  LineChart,
  PieChart,
  Wallet,
  Globe,
  Lock,
  Smartphone,
  Layers,
  Bell,
  Users,
  History,
  Gauge,
} from "lucide-react"

const features = [
  {
    icon: LineChart,
    title: "TradingView Charts",
    description:
      "Professional-grade charting with 100+ indicators, drawing tools, and real-time data across all markets.",
  },
  {
    icon: Wallet,
    title: "Multi-Broker Support",
    description:
      "Connect to 50+ brokers worldwide. Trade stocks, crypto, forex, and futures from one unified interface.",
  },
  {
    icon: BarChart3,
    title: "Portfolio Analytics",
    description: "Institutional-grade analytics with P&L tracking, Sharpe ratio, drawdown analysis, and risk metrics.",
  },
  {
    icon: History,
    title: "Paper Trading",
    description: "Risk-free practice with realistic market simulation, slippage modeling, and performance tracking.",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "Access stocks, ETFs, options, futures, forex, and crypto markets 24/7 from anywhere in the world.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "AI-powered alerts for price movements, technical patterns, news events, and custom conditions.",
  },
  {
    icon: Lock,
    title: "Bank-Grade Security",
    description: "256-bit encryption, 2FA, biometric login, and SOC 2 compliance to protect your assets.",
  },
  {
    icon: Users,
    title: "Social Trading",
    description: "Follow top traders, copy their strategies, and share your own performance with the community.",
  },
  {
    icon: Layers,
    title: "Strategy Builder",
    description: "Visual drag-and-drop strategy builder with backtesting across 20+ years of historical data.",
  },
  {
    icon: Gauge,
    title: "Risk Management",
    description: "Automatic stop-losses, position sizing, daily loss limits, and portfolio-wide risk controls.",
  },
  {
    icon: Smartphone,
    title: "Mobile Trading",
    description: "Full-featured mobile apps for iOS and Android with real-time sync across all devices.",
  },
  {
    icon: PieChart,
    title: "Tax Reporting",
    description: "Automated tax lot tracking, wash sale detection, and export reports for major jurisdictions.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to Dominate the Markets
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete trading ecosystem with tools that professional traders demand and retail traders deserve.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 50}>
              <CursorSpotlight>
                <div className="glass rounded-xl p-6 h-full group hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CursorSpotlight>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
