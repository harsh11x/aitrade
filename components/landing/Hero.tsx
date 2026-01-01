"use client"

import { GradientButton } from "@/components/ui/gradient-button"
import { GlassCard } from "@/components/ui/glass-card"
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-yellow-500 mb-8 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                    Built for Various Crypto, Forex, and Stock Solutions
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    The World&apos;s Most Advanced <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">AI Trading Terminal</span>
                </h1>

                <p className="text-lg text-gray-400 max-w-2xl mb-10">
                    Stop gambling. Start trading with institutional-grade AI. Experience unbeatable performance with our autonomous trading bots, real-time sentiment analysis, and zero-latency execution.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/dashboard">
                        <GradientButton className="h-12 px-8 text-base rounded-full">
                            Open Dashboard Demo <ArrowRight className="ml-2 w-4 h-4" />
                        </GradientButton>
                    </Link>
                    <GradientButton variant="outline" className="h-12 px-8 text-base rounded-full">
                        Explore AI Features
                    </GradientButton>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Trusted */}
                <GlassCard hoverEffect className="cursor-pointer group">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xs text-gray-400">Trusted over by 250k+ customers</span>
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                    <div className="flex -space-x-3 mb-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-black/50 bg-gray-600" />
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-black/50 bg-gray-800 flex items-center justify-center text-xs text-white font-medium">+8</div>
                    </div>

                    <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold text-white">4.7</span>
                        <div className="flex text-yellow-500 mb-1">
                            <Star className="w-4 h-4 fill-yellow-500" />
                            <Star className="w-4 h-4 fill-yellow-500" />
                            <Star className="w-4 h-4 fill-yellow-500" />
                            <Star className="w-4 h-4 fill-yellow-500" />
                            <Star className="w-4 h-4 fill-yellow-500 text-white/20" />
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4 opacity-50">
                        <div className="h-6 w-20 bg-white/20 rounded" />
                        <div className="h-6 w-20 bg-white/20 rounded" />
                    </div>
                </GlassCard>

                {/* Card 2: Exchange */}
                <GlassCard hoverEffect className="relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-xs text-gray-400">Exchange at Favorable Rates</span>
                        <div className="flex gap-2">
                            <button className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20"><ChevronLeft className="w-3 h-3 text-white" /></button>
                            <button className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20"><ChevronRight className="w-3 h-3 text-white" /></button>
                        </div>
                    </div>

                    <div className="bg-black/40 rounded-xl p-3 mb-2 border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-gray-400">YOU SELL</span>
                            <span className="text-white font-mono">276.55</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-blue-500" />
                            <span className="font-bold text-white">INJ</span>
                        </div>
                    </div>

                    <div className="flex justify-center -my-3 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center text-gray-400">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4"><path d="M7 10v4h10l-3-3m-4 6l3-3H7v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>

                    <div className="bg-black/40 rounded-xl p-3 mt-2 border border-white/5">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-gray-400">YOU BUY</span>
                            <span className="text-white font-mono">28,582.67</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-white" />
                            <span className="font-bold text-white">ZRX</span>
                        </div>
                    </div>
                </GlassCard>

                {/* Card 3: Insights */}
                <GlassCard hoverEffect className="group">
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xs text-gray-400">Detailed Insights and Strategies</span>
                    </div>

                    {/* Abstract Chip Visualization */}
                    <div className="relative h-20 mb-6 flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 skew-y-6 transform translate-y-2 opacity-50" />
                        <div className="w-14 h-14 rounded-xl border border-pink-500/50 bg-pink-500/10 skew-y-6 shadow-[0_0_20px_rgba(236,72,153,0.3)] flex items-center justify-center">
                            <span className="text-pink-500 font-bold">S</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 skew-y-6 transform -translate-y-2 opacity-50" />
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white">Since Yesterday,</h3>
                        <h3 className="text-xl font-bold text-gray-400">Your Assets Have</h3>
                        <h3 className="text-xl font-bold text-white">Grown by <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">$755.47</span></h3>
                    </div>
                </GlassCard>
            </div>
        </section>
    )
}
