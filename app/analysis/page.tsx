"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Activity, BarChart3, Zap, Brain, ArrowUpRight, ArrowDownRight, Globe } from "lucide-react"

export default function AnalysisPage() {
    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-black via-[#050505] to-[#0a0a0a] overflow-y-auto custom-scrollbar">
                <Header />

                <main className="p-6 space-y-6 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* Page Header */}
                    <div className="flex items-end justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">Market Analysis</h1>
                            <p className="text-gray-500">Deep dive into market trends, sentiment, and AI predictions.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="border-white/10 hover:bg-white/5 text-gray-400">
                                <Globe className="w-4 h-4 mr-2" /> Global
                            </Button>
                            <Button className="bg-pink-600 hover:bg-pink-500 text-white border-none shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                                <Zap className="w-4 h-4 mr-2" /> Generate Report
                            </Button>
                        </div>
                    </div>

                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { label: "Market Sentiment", val: "Extreme Greed", score: "78/100", color: "text-green-500", icon: Brain },
                            { label: "BTC Dominance", val: "52.4%", score: "+1.2%", color: "text-yellow-500", icon: Activity },
                            { label: "Global Volatility", val: "High", score: "8.4%", color: "text-red-500", icon: TrendingUp },
                            { label: "Long/Short Ratio", val: "1.24", score: "Bullish", color: "text-green-500", icon: BarChart3 },
                        ].map((stat, i) => (
                            <GlassCard key={i} className="p-4 flex items-center justify-between border-white/5 bg-white/[0.02]">
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{stat.label}</div>
                                    <div className="text-xl font-bold text-white">{stat.val}</div>
                                    <div className={`text-xs font-mono mt-1 ${stat.color}`}>{stat.score}</div>
                                </div>
                                <div className={`p-3 rounded-xl bg-white/5 ${stat.color} border border-white/5`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                            </GlassCard>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">

                        {/* Chart Area */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <GlassCard className="flex-1 p-6 relative overflow-hidden group border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                                <div className="absolute top-0 right-0 p-6 opacity-50">
                                    <div className="flex gap-2">
                                        {['1H', '4H', '1D', '1W'].map(tf => (
                                            <button key={tf} className="px-3 py-1 text-xs font-bold rounded-lg bg-black/40 border border-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                                                {tf}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-pink-500" />
                                        BTC/USDT Technical Analysis
                                    </h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Support: 41,200</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Resistance: 44,500</span>
                                    </div>
                                </div>

                                {/* Placeholder for a complex chart - using CSS visuals for now */}
                                <div className="w-full h-[300px] relative flex items-end gap-1 opacity-80">
                                    {/* Simulated Chart Bars */}
                                    {Array.from({ length: 40 }).map((_, i) => {
                                        const height = 20 + Math.random() * 60;
                                        const isGreen = Math.random() > 0.4;
                                        return (
                                            <div
                                                key={i}
                                                className={`flex-1 rounded-t-sm transition-all duration-500 hover:opacity-100 opacity-60 ${isGreen ? 'bg-green-500/50 hover:bg-green-400' : 'bg-red-500/50 hover:bg-red-400'}`}
                                                style={{ height: `${height}%` }}
                                            />
                                        )
                                    })}
                                    {/* Overlay Line */}
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                        <path d="M0 250 C 100 200, 200 280, 300 150 S 500 100, 800 50" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                                    </svg>
                                </div>

                                <div className="mt-6 flex flex-col gap-2">
                                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">AI Insight</div>
                                    <p className="text-sm text-gray-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                                        Currently trading within a <span className="text-white font-bold">bullish pennant</span> formation.
                                        RSI divergence suggests potential upside breakout.
                                        Recommended entry zone: <span className="text-green-400">$42,100 - $42,300</span>.
                                    </p>
                                </div>
                            </GlassCard>
                        </div>

                        {/* Right Sidebar: Signals & Events */}
                        <div className="space-y-6 flex flex-col">
                            <GlassCard className="p-5 flex-1 border-pink-500/10 bg-pink-900/5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-pink-500" /> Live Signals
                                    </h3>
                                    <Badge className="bg-pink-500 text-white hover:bg-pink-600">Strong Buy</Badge>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { pair: "AVAX/USDT", type: "LONG", price: "35.42", time: "2m ago" },
                                        { pair: "SOL/USDT", type: "LONG", price: "98.10", time: "15m ago" },
                                        { pair: "LINK/USDT", type: "SHORT", price: "14.15", time: "42m ago" },
                                    ].map((signal, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-pink-500/30 transition-colors cursor-pointer group">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-sm text-white">{signal.pair}</span>
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${signal.type === 'LONG' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{signal.type}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-0.5">Entry: {signal.price}</div>
                                            </div>
                                            <div className="text-xs text-gray-600 group-hover:text-pink-400 transition-colors">{signal.time}</div>
                                        </div>
                                    ))}
                                </div>
                                <Button className="w-full mt-4 bg-white/5 hover:bg-white/10 text-gray-300 text-xs">View All Signals</Button>
                            </GlassCard>

                            <GlassCard className="p-5 flex-1 border-white/5">
                                <h3 className="font-bold text-white mb-4">Important Events</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-3">
                                        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 shrink-0">
                                            <span className="text-[10px] text-gray-500 uppercase">Jan</span>
                                            <span className="text-lg font-bold text-white">10</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">SEC ETF Decision</div>
                                            <div className="text-xs text-gray-500 mt-1">High Volatility Expected</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 shrink-0">
                                            <span className="text-[10px] text-gray-500 uppercase">Jan</span>
                                            <span className="text-lg font-bold text-white">14</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">CPI Data Release</div>
                                            <div className="text-xs text-gray-500 mt-1">Inflation Metrics</div>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
