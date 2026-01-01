"use client"

import { useState, useEffect } from "react"
import { Activity, Zap, Wifi } from "lucide-react"

interface TickerItem {
    symbol: string
    price: number
    change: number
    isForex?: boolean
}

const INITIAL_DATA: TickerItem[] = [
    { symbol: "BTC/USDT", price: 42350.50, change: 1.2 },
    { symbol: "ETH/USDT", price: 2210.80, change: -0.5 },
    { symbol: "SOL/USDT", price: 98.50, change: 5.4 },
    { symbol: "EUR/USD", price: 1.0924, change: 0.1, isForex: true },
    { symbol: "GBP/USD", price: 1.2750, change: -0.2, isForex: true },
    { symbol: "USD/JPY", price: 144.80, change: 0.05, isForex: true },
    { symbol: "XRP/USDT", price: 0.6240, change: 2.1 },
    { symbol: "ADA/USDT", price: 0.5500, change: -1.1 },
    { symbol: "AUD/USD", price: 0.6810, change: 0.3, isForex: true },
]

export function MarketTicker() {
    const [data, setData] = useState(INITIAL_DATA)

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => prev.map(item => {
                const volatility = item.isForex ? 0.0005 : 0.002 // Forex is less volatile
                const changeP = (Math.random() - 0.5) * volatility
                const newPrice = item.price * (1 + changeP)
                // Update percentage change slightly to look 'live'
                const newChange = item.change + (changeP * 100)

                return {
                    ...item,
                    price: newPrice,
                    change: newChange
                }
            }))
        }, 1500) // Update every 1.5s

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-8 bg-black/40 border-b border-white/5 flex items-center px-4 overflow-hidden whitespace-nowrap z-40 backdrop-blur-sm">
            <div className="flex items-center gap-6 text-[10px] font-mono text-gray-400 w-full">

                {/* Static Status Items */}
                <span className="flex items-center gap-1.5 text-green-500 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    SYSTEM ONLINE
                </span>
                <span className="flex items-center gap-1.5 shrink-0 hidden sm:flex">
                    <Wifi className="w-3 h-3" /> 12ms
                </span>
                <span className="flex items-center gap-1.5 shrink-0 hidden sm:flex">
                    <Zap className="w-3 h-3 text-yellow-500" /> Gas: 15
                </span>

                <span className="text-gray-700 shrink-0">|</span>

                {/* Animated Marquee */}
                <div className="flex-1 overflow-hidden relative mask-linear-fade">
                    <div className="flex gap-8 animate-ticker hover:pause ">
                        {/* Duplicate Key workaround for seamless loop if needed, but flex gap is simple */}
                        {[...data, ...data].map((item, i) => ( // Double data for infinite loop illusion prep
                            <div key={i} className="flex items-center gap-2 shrink-0">
                                <span className={item.isForex ? "text-blue-400 font-bold" : "text-gray-300 font-bold"}>
                                    {item.symbol}
                                </span>
                                <span className="text-gray-200">
                                    {item.isForex ? item.price.toFixed(4) : item.price.toFixed(2)}
                                </span>
                                <span className={item.change >= 0 ? "text-green-500" : "text-red-500"}>
                                    ({item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .mask-linear-fade {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker {
                    animation: ticker 40s linear infinite;
                }
                .pause:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    )
}
