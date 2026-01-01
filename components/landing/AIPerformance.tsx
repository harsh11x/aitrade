"use client"

import { useEffect, useRef, useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Activity, Zap, TrendingUp, DollarSign } from "lucide-react"
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts"

export function AIPerformance() {
    const chartContainerRef = useRef<HTMLDivElement>(null)
    const [currentProfit, setCurrentProfit] = useState(12450)
    const [activeSignal, setActiveSignal] = useState<string | null>(null)

    useEffect(() => {
        if (!chartContainerRef.current) return

        // 1. Initialize Chart
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: "#9ca3af",
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { color: "rgba(255, 255, 255, 0.05)" },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
                borderColor: "rgba(255, 255, 255, 0.1)",
            },
            rightPriceScale: {
                borderColor: "rgba(255, 255, 255, 0.1)",
            }
        })

        const newSeries = chart.addSeries(CandlestickSeries, {
            upColor: "#00ff9d",
            downColor: "#ff0055",
            borderVisible: false,
            wickUpColor: "#00ff9d",
            wickDownColor: "#ff0055"
        })

        // 2. Generate Initial Mock Data (BTC 5s candles)
        const initialData = []
        let price = 42000
        let time = Math.floor(Date.now() / 1000) - 100 * 5 // 100 candles ago

        for (let i = 0; i < 100; i++) {
            const open = price
            const close = open + (Math.random() - 0.45) * 20 // Slight uptrend bias
            const high = Math.max(open, close) + Math.random() * 10
            const low = Math.min(open, close) - Math.random() * 10
            initialData.push({ time: time + i * 5, open, high, low, close })
            price = close
        }

        newSeries.setData(initialData as any)
        chart.timeScale().fitContent()

        // 3. Live Simulation Loop
        let lastClose = initialData[initialData.length - 1].close
        let currentCandle = {
            time: initialData[initialData.length - 1].time + 5,
            open: lastClose,
            high: lastClose,
            low: lastClose,
            close: lastClose
        }

        // Markers tracking
        let markers: any[] = []

        const interval = setInterval(() => {
            // Update current candle physics (aggressive volatility)
            const volatility = Math.random() * 15
            const change = (Math.random() - 0.45) * volatility // Slight bullish bias

            currentCandle.close += change
            currentCandle.high = Math.max(currentCandle.high, currentCandle.close)
            currentCandle.low = Math.min(currentCandle.low, currentCandle.close)

            newSeries.update(currentCandle as any)

            // Randomly Trigger AI Signals
            if (Math.random() < 0.02) {
                const isBuy = Math.random() > 0.4
                const text = isBuy ? "AI ENTRY" : "TP HIT"
                const color = isBuy ? "#10b981" : "#eab308"
                const shape = isBuy ? "arrowUp" : "arrowDown"
                const position = isBuy ? "belowBar" : "aboveBar"

                // Update UI Stats
                setActiveSignal(isBuy ? "AGGRESSIVE BUY" : "TAKE PROFIT")
                setCurrentProfit(prev => prev + Math.floor(Math.random() * 150))
                setTimeout(() => setActiveSignal(null), 2000)

                // Add marker to chart
                markers.push({
                    time: currentCandle.time,
                    position: position,
                    color: color,
                    shape: shape,
                    text: text,
                })
                // Keep only last 10 markers to avoid clutter
                if (markers.length > 10) markers.shift()
                newSeries.setMarkers(markers)
            }

            // Close Candle every 5 seconds (approx) - simpler: just strict time check
            const now = Math.floor(Date.now() / 1000)
            if (now >= currentCandle.time + 5) {
                // Finalize candle
                const finalCandle = { ...currentCandle }
                newSeries.update(finalCandle as any)

                // Start new candle
                lastClose = finalCandle.close
                currentCandle = {
                    time: currentCandle.time + 5,
                    open: lastClose,
                    high: lastClose,
                    low: lastClose,
                    close: lastClose
                }
            }

        }, 100) // Update 10 times per second for smooth visuals

        const resizeObserver = new ResizeObserver(() => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight
                })
            }
        })
        resizeObserver.observe(chartContainerRef.current)

        return () => {
            clearInterval(interval)
            resizeObserver.disconnect()
            chart.remove()
        }
    }, [])

    return (
        <div className="w-full relative h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm group flex flex-col">
            {/* Header Overlay */}
            <div className="p-6 flex items-start justify-between z-10">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-green-400 tracking-wider">LIVE BTC/USDT 5s AI FEED</span>
                    </div>
                    <h3 className="text-3xl font-mono font-bold text-white flex items-center gap-2">
                        ${currentProfit.toLocaleString()} <span className="text-sm font-sans font-normal text-gray-400 opacity-60">Total Profit</span>
                    </h3>
                </div>
                {activeSignal && (
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg animate-in slide-in-from-right fade-in duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-green-400 fill-green-400" />
                            <span className="font-bold text-white text-sm">{activeSignal}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Chart Container */}
            <div ref={chartContainerRef} className="flex-1 w-full opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Stats Bar */}
            <div className="p-6 border-t border-white/5 bg-black/20 flex items-center gap-4 z-10">
                <GlassCard className="flex-1 p-3 bg-black/20 border-white/5 backdrop-blur-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold">Volatility</div>
                        <div className="text-sm font-bold text-white">Aggressive</div>
                    </div>
                </GlassCard>
                <GlassCard className="flex-1 p-3 bg-black/20 border-white/5 backdrop-blur-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold">Win Rate</div>
                        <div className="text-sm font-bold text-white">94.2%</div>
                    </div>
                </GlassCard>
                <GlassCard className="flex-1 p-3 bg-black/20 border-white/5 backdrop-blur-md flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold">Daily PNL</div>
                        <div className="text-sm font-bold text-green-400 animate-pulse">+$1,240</div>
                    </div>
                </GlassCard>
            </div>
        </div>
    )
}
