"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { ArrowUpRight } from "lucide-react"

export function Features() {
    return (
        <section className="py-20 px-6 relative" id="features">
            <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Large Feature 1 (8 cols) */}
                <GlassCard className="col-span-1 md:col-span-8 min-h-[400px] flex flex-col justify-between overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Unified & Seamless Trading Experience</h3>
                            <p className="text-gray-400 max-w-md text-sm">Seamlessly connect your trading accounts from a variety of exchanges and execute trades directly through CE Web with a one-stop-shop.</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    {/* Abstract Connectivity Visual */}
                    <div className="mt-10 relative h-[200px] w-full">
                        <svg className="w-full h-full opacity-30" viewBox="0 0 400 200">
                            <path d="M50 100 L150 50 L250 150 L350 80" stroke="url(#line-grad)" strokeWidth="2" fill="none" />
                            <defs>
                                <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="transparent" />
                                    <stop offset="50%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* Nodes */}
                        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]" />
                        <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />
                        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                    </div>
                </GlassCard>

                {/* Small Feature 2 (4 cols) */}
                <GlassCard className="col-span-1 md:col-span-4 min-h-[400px] flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 flex flex-col items-end">
                        <div className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-right mb-2">
                            <div className="text-[10px] text-gray-400">Chain</div>
                            <div className="text-white font-bold">$18.31</div>
                            <div className="text-[10px] text-green-500">+9.97%</div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <h3 className="text-xl font-bold text-white mb-2">Fast International Transfers</h3>
                        <p className="text-gray-400 text-sm mb-4">You can easily and securely transfer stocks and crypto between your accounts.</p>
                        <div className="flex items-center gap-2 text-pink-500 text-sm font-medium cursor-pointer hover:text-pink-400">
                            Open Dashboard <div className="w-4 h-4 rounded-full bg-pink-500/20 flex items-center justify-center"><ArrowUpRight className="w-3 h-3" /></div>
                        </div>
                    </div>

                    {/* Globe Grid Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
                </GlassCard>

                {/* Learning Center (6 cols) */}
                <GlassCard className="col-span-1 md:col-span-6 flex flex-col justify-end">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Learning Center for <br /> Every Experience Level</h3>
                        <p className="text-gray-400 text-sm">We provide educational materials to help our users better understand the world of cryptocurrencies.</p>
                    </div>

                    <div className="bg-black/30 rounded-xl p-4 border border-white/5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Professional Mentors</div>
                            <div className="text-xs text-gray-500">Video • 13:37</div>
                        </div>
                    </div>
                </GlassCard>

                {/* Security (6 cols) */}
                <GlassCard className="col-span-1 md:col-span-6 relative overflow-hidden bg-gradient-to-br from-pink-900/20 to-purple-900/20">
                    <h3 className="text-2xl font-bold text-white mb-2">Independent Audited <br /> & ISO Certified</h3>
                    <p className="text-gray-400 text-sm mb-8 max-w-sm">We regularly undergo audits by reputable third-party security auditing firms to identify and fix potential vulnerabilities.</p>

                    <div className="grid grid-cols-2 gap-4 mt-auto">
                        <div className="h-8 bg-white/5 rounded w-24" /> {/* Logo placeholder */}
                        <div className="h-8 bg-white/5 rounded w-24" /> {/* Logo placeholder */}
                        <div className="h-8 bg-white/5 rounded w-24" /> {/* Logo placeholder */}
                    </div>

                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                </GlassCard>
            </div>
        </section>
    )
}
