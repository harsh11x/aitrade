"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Maximize2, Minimize2 } from "lucide-react"

export function MarketOverview() {
    const containerRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        const initWidget = () => {
            if (window.TradingView && containerRef.current) {
                new window.TradingView.widget({
                    autosize: true,
                    symbol: "BINANCE:BTCUSDT",
                    interval: "D",
                    timezone: "Etc/UTC",
                    theme: "dark",
                    style: "1",
                    locale: "en",
                    enable_publishing: false,
                    allow_symbol_change: true,
                    container_id: "tradingview_widget",
                    hide_side_toolbar: false,
                    studies: [
                        "MASimple@tv-basicstudies",
                        "RSI@tv-basicstudies"
                    ]
                })
            }
        }

        if (window.TradingView) {
            initWidget()
        } else {
            const scriptId = 'tradingview-widget-script'
            if (!document.getElementById(scriptId)) {
                const script = document.createElement("script")
                script.id = scriptId
                script.src = "https://s3.tradingview.com/tv.js"
                script.async = true
                script.onload = initWidget
                document.head.appendChild(script)
            } else {
                const checkInterval = setInterval(() => {
                    if (window.TradingView) {
                        initWidget()
                        clearInterval(checkInterval)
                    }
                }, 100)
                return () => clearInterval(checkInterval)
            }
        }
    }, [])

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            wrapperRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`)
            })
        } else {
            document.exitFullscreen()
        }
    }

    return (
        <div ref={wrapperRef} className="h-full w-full">
            <GlassCard className="flex flex-col p-0 overflow-hidden transition-all duration-300 relative group h-full">
                <div id="tradingview_widget" className="w-full h-full min-h-[500px]" ref={containerRef} />

                {/* Overlay Controls */}
                <div className="absolute top-4 right-20 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`text-gray-400 hover:text-white hover:bg-white/5 bg-black/50 backdrop-blur-sm border border-white/5 ${isFullscreen ? 'text-pink-500 bg-pink-500/10' : ''}`}
                        onClick={toggleFullscreen}
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                </div>
            </GlassCard>
        </div>
    )
}

declare global {
    interface Window {
        TradingView: any;
    }
}
