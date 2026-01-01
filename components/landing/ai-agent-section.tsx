"use client"

import { AnimatedSection } from "./animated-section"
import { CursorSpotlight } from "./cursor-spotlight"
import { Bot, Cpu, Eye, Brain, Shield, Zap, MessageSquare, Target, TrendingUp, Settings2 } from "lucide-react"

const aiModes = [
  {
    name: "Autonomous Mode",
    description:
      "Full autopilot trading with AI making all decisions based on your risk parameters and strategy preferences.",
    icon: Cpu,
    features: [
      "24/7 market monitoring",
      "Automatic trade execution",
      "Dynamic position sizing",
      "Self-adjusting strategies",
    ],
    color: "from-primary to-emerald-400",
  },
  {
    name: "Hybrid Mode",
    description: "AI suggests trades and manages risk while you maintain final approval on all executions.",
    icon: Eye,
    features: [
      "AI-generated trade signals",
      "One-click approval system",
      "Risk pre-assessment",
      "Strategy recommendations",
    ],
    color: "from-accent to-blue-400",
  },
  {
    name: "Manual Mode",
    description: "You control all trading decisions with AI providing real-time analysis and insights on demand.",
    icon: Settings2,
    features: ["On-demand analysis", "Market commentary", "Technical insights", "News sentiment"],
    color: "from-amber-400 to-orange-500",
  },
]

const aiCapabilities = [
  {
    icon: Brain,
    title: "Market Analysis",
    description: "Real-time sentiment, technical, and fundamental analysis across all markets",
  },
  {
    icon: MessageSquare,
    title: "Natural Language",
    description: "Control your trades with simple commands like 'Buy $5K of AAPL'",
  },
  {
    icon: Target,
    title: "Trade Signals",
    description: "AI-generated entry/exit points with confidence scores and risk assessment",
  },
  {
    icon: TrendingUp,
    title: "Pattern Recognition",
    description: "Advanced ML models detect chart patterns and market anomalies",
  },
  {
    icon: Shield,
    title: "Risk Protection",
    description: "Automatic stop-losses, position limits, and drawdown protection",
  },
  { icon: Zap, title: "Lightning Execution", description: "Sub-millisecond order routing to capture optimal prices" },
]

export function AIAgentSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80">AI Trading Agent</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Meet Your AI Trading Partner
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The most advanced AI trading agent ever built. Three powerful modes to match your trading style — from full
            automation to complete manual control.
          </p>
        </AnimatedSection>

        {/* Three Modes */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {aiModes.map((mode, index) => (
            <AnimatedSection key={mode.name} delay={index * 100}>
              <CursorSpotlight className="h-full">
                <div className="glass rounded-2xl p-6 h-full group hover:border-primary/30 transition-colors">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center mb-4`}
                  >
                    <mode.icon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{mode.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>
                  <ul className="space-y-2">
                    {mode.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CursorSpotlight>
            </AnimatedSection>
          ))}
        </div>

        {/* Capabilities Grid */}
        <AnimatedSection delay={400}>
          <h3 className="text-2xl font-bold text-foreground text-center mb-10">Powered by Advanced AI Capabilities</h3>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiCapabilities.map((capability, index) => (
            <AnimatedSection key={capability.title} delay={500 + index * 50}>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <capability.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">{capability.title}</h4>
                  <p className="text-sm text-muted-foreground">{capability.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
