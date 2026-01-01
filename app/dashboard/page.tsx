"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { LeftPanel } from "@/components/dashboard/LeftPanel"
import { MarketOverview } from "@/components/dashboard/MarketOverview"
import { BottomPanel } from "@/components/dashboard/BottomPanel"
import { RightPanel } from "@/components/dashboard/RightPanel"
import { MarketTicker } from "@/components/dashboard/MarketTicker"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

export default function TradePage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])
    return (
        <div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans relative">
            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

            <div className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-black via-[#050505] to-[#0a0a0a] overflow-hidden">
                <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

                {/* Scaled down Ticker instead of huge Hero */}
                <MarketTicker />

                <div className="flex-1 overflow-hidden p-2 pt-0">
                    {isMobile ? (
                        <div className="h-full overflow-y-auto space-y-4 pb-20 custom-scrollbar">
                            {/* Mobile Layout: Stacked in specific order */}

                            {/* 1. Chart - Most Important */}
                            <div className="h-[400px] w-full bg-black/40 rounded-2xl border border-white/5 overflow-hidden shrink-0">
                                <MarketOverview />
                            </div>

                            {/* 2. Order Form */}
                            <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden text-sm">
                                <RightPanel />
                            </div>

                            {/* 3. Positions */}
                            <div className="h-[300px] bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                                <BottomPanel />
                            </div>

                            {/* 4. Market List & Balance */}
                            <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                                <LeftPanel />
                            </div>
                        </div>
                    ) : (
                        <PanelGroup direction="horizontal" className="h-full rounded-2xl border border-white/5 bg-black/40 backdrop-blur-sm shadow-2xl">

                            {/* Left Panel: Balance & Pairs (Restored) */}
                            <Panel defaultSize={20} minSize={15} maxSize={25} className="bg-black/20">
                                <LeftPanel />
                            </Panel>

                            <PanelResizeHandle className="w-1 bg-white/5 hover:bg-pink-500/50 transition-colors" />

                            {/* Middle Panel: Chart & Bottom Stats */}
                            <Panel defaultSize={55} minSize={30}>
                                <PanelGroup direction="vertical">
                                    {/* Chart Area */}
                                    <Panel defaultSize={65} minSize={30} className="relative">
                                        <MarketOverview />
                                    </Panel>

                                    <PanelResizeHandle className="h-1 bg-white/5 hover:bg-pink-500/50 transition-colors" />

                                    {/* Bottom Panel: Orders & Stats */}
                                    <Panel defaultSize={35} minSize={20} className="bg-black/20">
                                        <BottomPanel />
                                    </Panel>
                                </PanelGroup>
                            </Panel>

                            <PanelResizeHandle className="w-1 bg-white/5 hover:bg-pink-500/50 transition-colors" />

                            {/* Right Panel: Order Form & Order Book */}
                            <Panel defaultSize={25} minSize={20} maxSize={35} className="bg-black/20">
                                <RightPanel />
                            </Panel>

                        </PanelGroup>
                    )}
                </div>
            </div>
        </div>
    )
}
