"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { Brain, Zap, Shield, Cpu, BarChart, Lock } from "lucide-react"
import { AIPerformance } from "./AIPerformance"

const features = [
    {
        icon: Brain,
        title: "Neural Network Analysis",
        description: "Our proprietary AI models process billions of market data points per second to identify profitable patterns invisible to the human eye."
    },
    {
        icon: Zap,
        title: "Microsecond Execution",
        description: "Execute trades faster than the speed of light. Our infrastructure is co-located with major exchanges for zero-latency fills."
    },
    {
        icon: Shield,
        title: "Risk Management Guardrails",
        description: "Set hard limits on losses. Our AI automatically adjusts position sizing based on real-time volatility tracking."
    },
    {
        icon: Cpu,
        title: "Sentiment Analysis Engine",
        description: "We scrape 50+ social platforms and news sources instantly to gauge market sentiment and predict trend reversals."
    },
    {
        icon: BarChart,
        title: "Backtesting Simulator",
        description: "Test your AI strategies against 10 years of historical data in seconds before risking real capital."
    },
    {
        icon: Lock,
        title: "Bank-Grade Security",
        description: "Your assets are protected by MPC wallets and insurance funds. Trade with peace of mind."
    }
]

export function AIAdvantage() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="text-pink-500 font-bold tracking-wider text-sm uppercase mb-2 block">Why Choose CE Web AI?</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Traders Sleep. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Our AI Doesn&apos;t.</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Dominate the markets with a technological unfair advantage. Our AI systems work 24/7 to grow your portfolio while you live your life.
                    </p>
                </div>

                <div className="mb-20">
                    <AIPerformance />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <GlassCard key={i} hoverEffect className="p-8 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <f.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {f.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
