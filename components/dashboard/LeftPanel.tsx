"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Search, Star, TrendingUp, Filter, SlidersHorizontal } from "lucide-react"
import { BalanceCard } from "./BalanceCard"

export function LeftPanel() {
    return (
        <div className="flex flex-col gap-3 h-full p-2">
            {/* Balance Card Section */}
            <BalanceCard />

            {/* Header Actions */}
            <div className="flex items-center gap-2 px-1">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 group-hover:text-pink-500 transition-colors" />
                    <Input
                        placeholder="Search..."
                        className="pl-9 h-9 text-xs bg-black/40 border-white/5 text-white rounded-xl focus-visible:ring-1 focus-visible:ring-pink-500/50 hover:bg-white/5 transition-all w-full"
                    />
                </div>
                <Button size="icon" variant="ghost" className="h-9 w-9 text-gray-500 hover:text-white hover:bg-white/10 rounded-xl">
                    <SlidersHorizontal className="w-4 h-4" />
                </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 p-1 bg-black/40 rounded-xl border border-white/5 mx-1">
                {['All', 'Favorites', 'Gainers', 'Vol'].map((fw, i) => (
                    <button key={fw} className={`flex-1 h-7 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${i === 0 ? 'bg-pink-500/20 text-pink-500 shadow-sm border border-pink-500/20' : 'text-gray-600 hover:text-gray-300 hover:bg-white/5'}`}>
                        {fw}
                    </button>
                ))}
            </div>

            {/* Column Headers */}
            <div className="flex items-center justify-between px-3 text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">
                <span>Pair</span>
                <span className="flex gap-4">
                    <span>Last</span>
                    <span>24h</span>
                </span>
            </div>

            {/* Pro List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 scroll-smooth">
                <div className="flex flex-col gap-1">
                    {[
                        { p: "BTC", q: "USDT", v: "42,391.22", c: "+1.2%", color: "text-green-500", chart: "green" },
                        { p: "ETH", q: "USDT", v: "2,251.44", c: "+0.8%", color: "text-green-500", chart: "green" },
                        { p: "SOL", q: "USDT", v: "98.44", c: "+5.1%", color: "text-green-500", chart: "green" },
                        { p: "BNB", q: "USDT", v: "302.11", c: "-0.5%", color: "text-red-500", chart: "red" },
                        { p: "XRP", q: "USDT", v: "0.6201", c: "-1.1%", color: "text-red-500", chart: "red" },
                        { p: "ADA", q: "USDT", v: "0.5822", c: "+0.2%", color: "text-green-500", chart: "green" },
                        { p: "AVAX", q: "USDT", v: "35.20", c: "+2.4%", color: "text-green-500", chart: "green" },
                        { p: "DOGE", q: "USDT", v: "0.0821", c: "-0.9%", color: "text-red-500", chart: "red" },
                        { p: "DOT", q: "USDT", v: "7.502", c: "+1.1%", color: "text-green-500", chart: "green" },
                        { p: "MATIC", q: "USDT", v: "0.854", c: "+0.5%", color: "text-green-500", chart: "green" },
                        { p: "LINK", q: "USDT", v: "14.20", c: "-1.5%", color: "text-red-500", chart: "red" },
                        { p: "UNI", q: "USDT", v: "6.402", c: "+0.3%", color: "text-green-500", chart: "green" },
                        { p: "ATOM", q: "USDT", v: "9.85", c: "-2.1%", color: "text-red-500", chart: "red" },
                        { p: "LTC", q: "USDT", v: "65.40", c: "+0.1%", color: "text-green-500", chart: "green" },
                    ].map((pair, i) => (
                        <div key={i} className="relative group p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-3">
                                    <Star className="w-3 h-3 text-gray-800 group-hover:text-yellow-500 transition-colors" />
                                    <div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm font-bold text-white">{pair.p}</span>
                                            <span className="text-[9px] font-bold text-gray-600">/{pair.q}</span>
                                        </div>
                                        {/* Vol Mock */}
                                        <div className="text-[9px] text-gray-600 font-mono">Vol 24M</div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-xs font-mono font-medium text-gray-200 group-hover:text-white transition-colors">{pair.v}</div>
                                    <div className={`text-[10px] font-bold ${pair.color} bg-black/40 px-1 rounded inline-block mt-0.5`}>{pair.c}</div>
                                </div>
                            </div>

                            {/* Mini Sparkline Background Effect */}
                            <svg className="absolute bottom-1 right-12 w-10 h-4 opacity-20 group-hover:opacity-40 transition-opacity" viewBox="0 0 20 10" fill="none">
                                <path d={`M0 5 Q 5 ${pair.chart === 'green' ? '0' : '10'}, 10 5 T 20 5`} stroke={pair.chart === 'green' ? '#22c55e' : '#ef4444'} strokeWidth="2" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
