"use client"

import { useTrading } from "@/lib/context/TradingContext"
import { ArrowDown, ArrowUp, Wallet, PieChart, Activity, TrendingUp, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"

export function DashboardHero() {
    const { equity, currentPrice, balance, usedMargin, unrealizedPnL } = useTrading()

    // Calculate Margin Level safely
    const marginLevel = usedMargin > 0 ? (equity / usedMargin) * 100 : 999
    const freeMargin = equity - usedMargin
    const pnlColor = unrealizedPnL >= 0 ? "text-green-500" : "text-red-500"
    const pnlBg = unrealizedPnL >= 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"

    return (
        <div className="flex flex-col gap-4 p-4 pb-0 animate-in fade-in slide-in-from-top-4 duration-700">
            {/* Account Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* 1. Main Equity Card - High Visibility */}
                <GlassCard className="col-span-1 md:col-span-2 p-5 relative overflow-hidden group border-pink-500/10">
                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Wallet className="w-16 h-16 text-pink-500 -rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                            Total Equity <span className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-white border border-white/5">USD</span>
                        </div>
                        <div className="text-4xl font-mono font-bold text-white tracking-tighter shadow-pink-500/10 drop-shadow-sm mb-2">
                            {equity.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className={`flex items-center gap-1 font-bold ${pnlColor} ${pnlBg} px-2 py-0.5 rounded-md border`}>
                                {unrealizedPnL >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                PnL: {unrealizedPnL.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </div>
                            <div className="text-gray-400 text-xs">
                                Today: <span className="text-white font-bold">+2.4%</span>
                            </div>
                        </div>
                    </div>
                    {/* Background Decorative Line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent opacity-50" />
                </GlassCard>

                {/* 2. Margin Health Monitor */}
                <GlassCard className="p-4 flex flex-col justify-between border-white/5 bg-black/40">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Margin Level</div>
                            <div className={`text-2xl font-bold ${marginLevel < 150 ? 'text-red-500' : 'text-green-500'}`}>
                                {marginLevel > 1000 ? '>1000%' : `${marginLevel.toFixed(1)}%`}
                            </div>
                        </div>
                        <Activity className={`w-5 h-5 ${marginLevel < 150 ? 'text-red-500 animate-pulse' : 'text-green-500'}`} />
                    </div>

                    <div className="space-y-2 mt-2">
                        <div className="flex justify-between text-[10px] text-gray-400">
                            <span>Used: ${usedMargin.toFixed(0)}</span>
                            <span>Free: ${freeMargin.toFixed(0)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex">
                            <div className="h-full bg-orange-500" style={{ width: `${(usedMargin / equity) * 100}%` }} />
                            <div className="h-full bg-green-500" style={{ width: `${(freeMargin / equity) * 100}%` }} />
                        </div>
                    </div>
                </GlassCard>

                {/* 3. Quick Stats / Mini Ticker */}
                <GlassCard className="p-0 overflow-hidden border-white/5 bg-black/40 flex flex-col">
                    <div className="p-3 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Market Watch</span>
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-500" />
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
                        {/* Mini Rows */}
                        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                <span className="text-xs font-bold text-white">BTC</span>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-mono text-white">${currentPrice.toLocaleString()}</div>
                                <div className="text-[9px] text-red-500">-0.42%</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                <span className="text-xs font-bold text-white">ETH</span>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-mono text-white">$2,245.10</div>
                                <div className="text-[9px] text-green-500">+1.20%</div>
                            </div>
                        </div>
                    </div>
                </GlassCard>

            </div>
        </div>
    )
}
