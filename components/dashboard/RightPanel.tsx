"use client"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Maximize2, Brain, MessageSquare, BarChart2 } from "lucide-react"
import { TradingModes } from "@/components/dashboard/ai/TradingModes"
import { AIChat } from "@/components/dashboard/ai/AIChat"

const cryptos = [
    { name: "Casper", symbol: "CSPR", price: "€381.58", change: "+2.54%", low: "€4.90 3.71%", color: "text-green-500", icon: "C" },
    { name: "Trinity Network", symbol: "TNC", price: "€248.79", change: "-4.67%", low: "€0.67 0.51%", color: "text-red-500", icon: "T" },
    { name: "The Graph", symbol: "GRT", price: "€0.0", change: "0.0%", low: "€0.0", color: "text-gray-400", icon: "G" },
    { name: "Shiba Inu", symbol: "SHIB", price: "€395.58", change: "-5.31%", low: "", color: "text-red-500", icon: "S" },
]

export function RightPanel() {
    return (
        <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
            <Tabs defaultValue="ai" className="h-full flex flex-col p-2 gap-2">
                <TabsList className="bg-black/40 border border-white/5 rounded-xl p-1 h-auto w-full grid grid-cols-3 gap-1 overflow-x-auto no-scrollbar shrink-0">
                    <TabsTrigger
                        value="market"
                        className="data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-500 text-[10px] uppercase font-bold tracking-wider py-2.5 rounded-lg transition-all"
                    >
                        Market
                    </TabsTrigger>
                    <TabsTrigger
                        value="ai"
                        className="data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400 data-[state=active]:border-pink-500/20 data-[state=active]:shadow-[0_0_15px_rgba(236,72,153,0.15)] border border-transparent text-gray-500 text-[10px] uppercase font-bold tracking-wider py-2.5 rounded-lg transition-all"
                    >
                        Trade
                    </TabsTrigger>
                    <TabsTrigger
                        value="chat"
                        className="data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-500 text-[10px] uppercase font-bold tracking-wider py-2.5 rounded-lg transition-all"
                    >
                        Chat
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="market" className="flex-1 flex flex-col gap-3 mt-0 min-h-0 overflow-y-auto no-scrollbar">
                    {/* Top Section - Watchlist */}
                    <GlassCard className="flex flex-col p-4 bg-black/40 border-white/5">
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                            <div className="flex gap-4 text-xs font-bold text-gray-500 w-full uppercase tracking-wider">
                                <span className="text-white border-b-2 border-pink-500 pb-2.5 -mb-2.5">Crypto</span>
                                <span className="cursor-pointer hover:text-white transition-colors">Assets</span>
                                <span className="cursor-pointer hover:text-white transition-colors">Shares</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {cryptos.map((c, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-3 rounded-lg -mx-2 transition-colors border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full border border-dashed border-pink-500/50 flex items-center justify-center text-xs font-bold text-pink-500 bg-pink-500/5">
                                            {c.icon}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm text-white">{c.name}</div>
                                            <div className="text-[10px] text-gray-500 font-mono">{c.symbol}</div>
                                        </div>
                                    </div>

                                    <div className="flex-1 px-4">
                                        <div className="h-4 w-full flex items-center gap-0.5 opacity-30 group-hover:opacity-100 transition-opacity">
                                            {[1, 2, 3, 2, 4, 3, 5, 3, 4, 2].map((v, k) => (
                                                <div key={k} className={`flex-1 ${c.color.includes('red') ? 'bg-red-500' : 'bg-green-500'} rounded-full`} style={{ height: `${v * 20}%` }} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-right min-w-[60px]">
                                        <div className="font-bold text-sm text-white">{c.price}</div>
                                        <div className={`text-[9px] font-bold ${c.color}`}>{c.change}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    {/* Bottom Section - Order Book */}
                    <GlassCard className="flex-1 flex flex-col p-4 min-h-[300px] bg-black/40 border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                                <Button size="sm" variant="ghost" className="bg-white/10 shadow-sm h-7 text-[10px] font-bold uppercase text-white hover:bg-white/20">Order book</Button>
                                <Button size="sm" variant="ghost" className="h-7 text-[10px] font-bold uppercase text-gray-500 hover:text-white">Recent</Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-gray-500 uppercase font-bold">Spread</span>
                                <span className="text-xs font-mono text-gray-300">0.01%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] text-gray-500 uppercase font-bold">Last Price</span>
                                <span className="text-sm font-bold text-white flex items-center gap-1">
                                    34,232.20 <span className="text-red-500 text-[10px]">▼</span>
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between text-[9px] text-gray-500 mb-2 px-1 font-bold uppercase tracking-wider">
                            <span>Price (USDT)</span>
                            <span className="text-right">Amount (BTC)</span>
                        </div>

                        <div className="flex-1 overflow-hidden font-mono">
                            <div className="flex flex-col gap-[1px]">
                                {/* Asks (Red) */}
                                {[
                                    { p: "42,355.50", a: "0.4421" },
                                    { p: "42,354.00", a: "1.2005" },
                                    { p: "42,353.50", a: "0.1500" },
                                    { p: "42,352.00", a: "0.8542" },
                                ].reverse().map((row, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs py-1 px-1 relative cursor-pointer hover:bg-white/5 transition-colors group">
                                        <span className="text-red-400 group-hover:text-red-300">{row.p}</span>
                                        <span className="text-gray-400 group-hover:text-white">{row.a}</span>
                                        <div className="absolute right-0 top-0 bottom-0 bg-red-500/5 w-[30%]" />
                                    </div>
                                ))}

                                <div className="py-2 flex items-center justify-center text-sm font-bold text-white border-y border-white/5 my-1 bg-white/5">
                                    42,351.20
                                </div>

                                {/* Bids (Green) */}
                                {[
                                    { p: "42,350.50", a: "2.4421" },
                                    { p: "42,348.00", a: "0.5000" },
                                    { p: "42,346.50", a: "3.1500" },
                                    { p: "42,342.00", a: "0.2242" },
                                    { p: "42,341.00", a: "1.0023" },
                                ].map((row, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs py-1 px-1 relative cursor-pointer hover:bg-white/5 transition-colors group">
                                        <span className="text-green-400 group-hover:text-green-300">{row.p}</span>
                                        <span className="text-gray-400 group-hover:text-white">{row.a}</span>
                                        <div className="absolute right-0 top-0 bottom-0 bg-green-500/5 w-[40%]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                </TabsContent>

                <TabsContent value="ai" className="flex-1 flex flex-col mt-0 overflow-y-auto no-scrollbar">
                    <TradingModes />
                </TabsContent>

                <TabsContent value="chat" className="flex-1 flex flex-col mt-0 h-full overflow-hidden">
                    <GlassCard className="h-full flex flex-col p-0 overflow-hidden bg-black/40 border-white/5">
                        <AIChat />
                    </GlassCard>
                </TabsContent>
            </Tabs>
        </div>
    )
}
