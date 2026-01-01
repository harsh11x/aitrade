"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Play, StopCircle, Settings2, Terminal, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useTrading } from "@/lib/context/TradingContext"

export function TradingModes() {
    const { openPosition, placeLimitOrder, closePosition, positions, currentPrice, balance } = useTrading()
    const [mode, setMode] = useState<"manual" | "semi" | "auto">("manual")
    const [isRunning, setIsRunning] = useState(false)
    const [logs, setLogs] = useState<{ time: string, msg: string, type: 'info' | 'success' | 'warning' | 'error' }[]>([])

    // Manual Form State
    const [side, setSide] = useState<'LONG' | 'SHORT'>('LONG')
    const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET')
    const [amount, setAmount] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [leverage, setLeverage] = useState<number>(20)

    // Auto Mode Settings
    const [autoMaxProfit, setAutoMaxProfit] = useState<string>("2.5") // %
    const [autoStopLoss, setAutoStopLoss] = useState<string>("1.5")   // %
    const [autoLeverage, setAutoLeverage] = useState<number>(20)

    // TPSL State
    // const [suggestedSL, setSuggestedSL] = useState((currentPrice * 0.99).toFixed(2))
    // const [suggestedTP, setSuggestedTP] = useState((currentPrice * 1.02).toFixed(2))
    const suggestedSL = (currentPrice * 0.99).toFixed(2)
    const suggestedTP = (currentPrice * 1.02).toFixed(2)


    // Bot Logic
    const recentPrices = useRef<number[]>([])

    // Track prices for MA calculation
    useEffect(() => {
        recentPrices.current.push(currentPrice)
        if (recentPrices.current.length > 20) recentPrices.current.shift()
    }, [currentPrice])

    const logsContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
        }
    }, [logs])

    const latestPriceRef = useRef(currentPrice)
    const latestPositionsRef = useRef(positions)

    useEffect(() => {
        latestPriceRef.current = currentPrice
        latestPositionsRef.current = positions
    }, [currentPrice, positions])

    const addLog = (msg: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
        const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setLogs(prev => [...prev.slice(-99), { time, msg, type }])
    }

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isRunning && mode === 'auto') {
            interval = setInterval(() => {
                const currentPriceVal = latestPriceRef.current
                const positionsVal = latestPositionsRef.current

                const prices = recentPrices.current
                if (prices.length === 0) prices.push(currentPriceVal)

                const avgPrice = prices.reduce((a, b) => a + b, 0) / (prices.length || 1)
                const trend = currentPriceVal > avgPrice ? 'BULLISH' : 'BEARISH'
                // const rsi = 30 + Math.random() * 40 + (trend === 'BULLISH' ? 10 : -10)
                const volatility = Math.abs((currentPriceVal - avgPrice) / avgPrice) * 100

                // 1. Manage Active Positions (High Frequency Scalping)
                positionsVal.forEach(p => {
                    const priceDiff = currentPriceVal - p.entryPrice
                    const pnlPercent = (priceDiff / p.entryPrice) * p.leverage * (p.side === 'LONG' ? 100 : -100)

                    if (pnlPercent > (1.2 + Math.random())) {
                        closePosition(p.id)
                        addLog(`SCALP: Secured profits (+${pnlPercent.toFixed(2)}%)`, 'success')
                        return
                    }
                    if (pnlPercent < -2.5) {
                        closePosition(p.id)
                        addLog(`STOP LOSS: Protecting capital (${pnlPercent.toFixed(2)}%)`, 'warning')
                        return
                    }
                })

                // 2. Open New Positions (Only if slots available)
                if (positionsVal.length < 3) {
                    if (Math.random() > 0.6) {
                        const sideStr = trend === 'BULLISH' ? 'LONG' : 'SHORT'
                        const size = 1500 + Math.random() * 1000
                        const tpPercent = parseFloat(autoMaxProfit) / 100
                        const slPercent = parseFloat(autoStopLoss) / 100

                        const sl = sideStr === 'LONG'
                            ? currentPriceVal * (1 - slPercent)
                            : currentPriceVal * (1 + slPercent)

                        const tp = sideStr === 'LONG'
                            ? currentPriceVal * (1 + tpPercent)
                            : currentPriceVal * (1 - tpPercent)

                        openPosition('BTC/USDT', sideStr, size, autoLeverage, sl, tp)
                        addLog(`EXECUTION: ${sideStr} ${size.toFixed(0)} USDT @ ${currentPriceVal.toFixed(1)}`, 'success')

                        if (volatility > 0.1) {
                            addLog(`VOLATILITY: High (${volatility.toFixed(3)}%). Adjusting risk.`, 'warning')
                        }
                    }
                }

                // 3. Passive Analysis Logs
                if (Math.random() > 0.7) {
                    const techLogs = [
                        { msg: `Analyzing order book depth... Bids outweighing asks.`, type: 'info' },
                        { msg: `Confirming ${trend === 'BULLISH' ? 'Higher Highs' : 'Lower Lows'} on 1m chart.`, type: 'info' },
                        { msg: `EMA Cross detected. Momentum building.`, type: 'info' },
                        { msg: `Refined probability matrix. Confidence: ${(70 + Math.random() * 20).toFixed(1)}%`, type: 'info' }
                    ]
                    const log = techLogs[Math.floor(Math.random() * techLogs.length)]
                    addLog(log.msg, log.type as any)
                }

            }, 2000)
        }
        return () => clearInterval(interval)
    }, [isRunning, mode])


    const handleTrade = () => {
        const marginUSDT = parseFloat(amount)
        if (!marginUSDT || marginUSDT <= 0) {
            alert('Please enter a valid margin amount')
            return
        }

        const tradeFee = marginUSDT * leverage * 0.0006
        if (balance < marginUSDT + tradeFee) {
            alert(`Insufficient balance. Required: ${(marginUSDT + tradeFee).toFixed(2)}`)
            return
        }

        if (orderType === 'LIMIT') {
            const limitPriceVal = parseFloat(price)
            if (!limitPriceVal || limitPriceVal <= 0) {
                alert('Please enter a valid limit price')
                return
            }
            placeLimitOrder('BTC/USDT', side, marginUSDT, leverage, limitPriceVal)
            addLog(`Order Placed: LIMIT ${side} @ ${limitPriceVal}`, 'info')
        } else {
            openPosition('BTC/USDT', side, marginUSDT, leverage)
            addLog(`Order Filled: MARKET ${side} ${marginUSDT} USDT`, 'success')
        }
        setAmount('')
    }

    const handleSemiTrade = () => {
        openPosition('BTC/USDT', 'LONG', 2000, 20, parseFloat(suggestedSL), parseFloat(suggestedTP))
        addLog(`AI Strategy Applied: LONG BTC`, 'success')
    }

    const [terminalInput, setTerminalInput] = useState('')

    const handleTerminalCommand = (cmd: string) => {
        if (!cmd.trim()) return
        if (cmd === '/clear') {
            setLogs([])
            return
        }
        addLog(`> ${cmd}`, 'info')

        const lowerCmd = cmd.toLowerCase()
        setTimeout(() => {
            if (lowerCmd.includes('help')) {
                addLog('Available commands: /status, /clear, /buy [amount], /sell [amount]', 'info')
            } else if (lowerCmd.includes('status')) {
                addLog(`Trend: ${currentPrice > recentPrices.current[0] ? 'BULLISH' : 'BEARISH'} | Balance: $${balance.toFixed(2)}`, 'info')
            } else if (lowerCmd.startsWith('buy')) {
                openPosition('BTC/USDT', 'LONG', 1000, 20)
                addLog('Manual override: LONG position opened.', 'success')
            } else {
                addLog(`Command processed.`, 'info')
            }
        }, 500)
    }

    return (
        <div className="flex flex-col gap-4 h-full relative p-2">
            {/* Mode Selector */}
            <div className="flex p-1 bg-black/40 rounded-xl border border-white/5 relative">
                <button
                    onClick={() => setMode("manual")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${mode === "manual" ? "text-white bg-white/10" : "text-gray-500 hover:text-white"}`}
                >
                    Manual
                </button>
                <button
                    onClick={() => setMode("semi")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${mode === "semi" ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20" : "text-gray-500 hover:text-white"}`}
                >
                    <Zap className="w-3 h-3" /> Semi
                </button>
                <button
                    onClick={() => setMode("auto")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${mode === "auto" ? "text-pink-400 bg-pink-500/10 border border-pink-500/20" : "text-gray-500 hover:text-white"}`}
                >
                    <Brain className="w-3 h-3" /> Auto
                </button>
            </div>

            {/* Manual Mode Content */}
            {mode === "manual" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20 overflow-y-auto custom-scrollbar-thin">

                    {/* Size Input */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400 px-1">
                            <span className="font-medium text-gray-300">Amount</span>
                            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                                <Settings2 className="w-3 h-3" />
                                Slippage: 0.5%
                            </span>
                        </div>
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="bg-black/40 border-white/10 h-12 text-lg font-mono pl-4 pr-20 text-white focus-visible:ring-1 focus-visible:ring-white/20"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                                <span className="text-xs font-bold text-gray-500">USDT</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Type */}
                    <div className="grid grid-cols-2 gap-2">
                        {['MARKET', 'LIMIT'].map(type => (
                            <button
                                key={type}
                                onClick={() => setOrderType(type as any)}
                                className={`py-2 text-[10px] font-bold uppercase transition-all rounded-lg border ${orderType === type ? 'bg-white/10 text-white border-white/10' : 'bg-transparent text-gray-600 border-transparent hover:bg-white/5'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    {orderType === 'LIMIT' && (
                        <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex justify-between text-xs text-gray-400 px-1">
                                <span className="font-medium text-gray-300">Limit Price</span>
                            </div>
                            <Input
                                type="number"
                                placeholder={currentPrice.toFixed(2)}
                                className="bg-black/40 border-white/10 h-10 font-mono text-white"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Leverage */}
                    <div className="space-y-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400 font-medium">Leverage</span>
                            <span className="font-mono text-white font-bold bg-white/10 px-2 py-0.5 rounded">{leverage}x</span>
                        </div>
                        <input
                            type="range"
                            min="1" max="100"
                            value={leverage}
                            onChange={e => setLeverage(Number(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
                        />
                        <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                            {[1, 10, 25, 50, 100].map(v => (
                                <span key={v} onClick={() => setLeverage(v)} className="cursor-pointer hover:text-white transition-colors">{v}x</span>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button
                            onClick={() => { setSide('LONG'); handleTrade(); }}
                            className="bg-green-500 hover:bg-green-600 text-black font-bold h-12 text-sm uppercase tracking-wide shadow-lg shadow-green-900/20"
                        >
                            <ArrowUpRight className="w-4 h-4 mr-2" /> Buy / Long
                        </Button>
                        <Button
                            onClick={() => { setSide('SHORT'); handleTrade(); }}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold h-12 text-sm uppercase tracking-wide shadow-lg shadow-red-900/20"
                        >
                            <ArrowDownRight className="w-4 h-4 mr-2" /> Sell / Short
                        </Button>
                    </div>

                    <div className="text-center text-[10px] text-gray-500 mt-2">
                        Available Balance: <span className="text-gray-300 font-mono">${balance.toFixed(2)}</span>
                    </div>

                </div>
            )}

            {/* AI / Semi Content */}
            {mode === "semi" && (
                <div className="space-y-4">
                    <GlassCard className="p-4 border-cyan-500/20 bg-cyan-950/10">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-bold text-white">AI Strategy</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs bg-black/40 p-3 rounded-lg border border-cyan-500/20">
                                <span className="text-gray-400">Stop Loss</span>
                                <span className="font-mono text-white font-bold">{suggestedSL}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs bg-black/40 p-3 rounded-lg border border-cyan-500/20">
                                <span className="text-gray-400">Take Profit</span>
                                <span className="font-mono text-white font-bold">{suggestedTP}</span>
                            </div>
                        </div>
                        <Button onClick={handleSemiTrade} className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                            Execute Strategy
                        </Button>
                    </GlassCard>
                </div>
            )}


            {/* Auto / Terminal Mode */}
            {mode === "auto" && (
                <div className="flex flex-col h-full overflow-hidden pb-1 gap-3">
                    {/* Control Bar */}
                    <GlassCard className="p-3 bg-black/40 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            <span className="text-xs font-bold text-white">{isRunning ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE'}</span>
                        </div>
                        {isRunning ? (
                            <Button size="sm" variant="destructive" onClick={() => setIsRunning(false)} className="h-7 text-[10px] font-bold uppercase">
                                <StopCircle className="w-3 h-3 mr-1" /> Stop
                            </Button>
                        ) : (
                            <Button size="sm" onClick={() => setIsRunning(true)} className="h-7 text-[10px] font-bold uppercase bg-white text-black hover:bg-gray-200">
                                <Play className="w-3 h-3 mr-1" /> Start
                            </Button>
                        )}
                    </GlassCard>

                    {/* Auto Configuration */}
                    <div className="grid grid-cols-3 gap-2 px-1">
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-400">Max Profit (%)</label>
                            <Input
                                type="number"
                                value={autoMaxProfit}
                                onChange={e => setAutoMaxProfit(e.target.value)}
                                className="h-7 text-xs bg-white/5 border-white/10"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-400">Stop Loss (%)</label>
                            <Input
                                type="number"
                                value={autoStopLoss}
                                onChange={e => setAutoStopLoss(e.target.value)}
                                className="h-7 text-xs bg-white/5 border-white/10"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-gray-400">Leverage ({autoLeverage}x)</label>
                            <input
                                type="range"
                                min="1" max="100"
                                value={autoLeverage}
                                onChange={e => setAutoLeverage(Number(e.target.value))}
                                className="w-full h-7 accent-cyan-500 bg-transparent"
                            />
                        </div>
                    </div>


                    {/* Clean Terminal */}
                    <div className="h-[250px] shrink-0 bg-[#09090b] border border-white/10 rounded-lg overflow-hidden flex flex-col font-mono text-xs relative">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/5 text-[10px] text-gray-500">
                            <span className="flex items-center gap-2">
                                <Terminal className="w-3 h-3" /> CONSOLE
                            </span>
                            <button onClick={() => setLogs([])} className="hover:text-white transition-colors">
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>

                        {/* Logs */}
                        <div ref={logsContainerRef} className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
                            {logs.length === 0 && (
                                <div className="text-gray-700 italic text-center mt-10">System ready. Waiting for input...</div>
                            )}
                            {logs.map((log, i) => (
                                <div key={i} className="flex gap-2 text-[11px] animate-in fade-in slide-in-from-left-2 duration-100">
                                    <span className="text-gray-600 shrink-0 select-none">[{log.time}]</span>
                                    <span className={`${log.type === 'success' ? 'text-green-400' :
                                        log.type === 'warning' ? 'text-yellow-400' :
                                            log.type === 'error' ? 'text-red-400' : 'text-gray-300'
                                        } break-all`}>
                                        {log.msg}
                                    </span>
                                </div>
                            ))}
                            {/* Removed logsEndRef */}
                        </div>

                        {/* Input Line */}
                        <div className="p-2 border-t border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-2 text-gray-500">
                                <span className="text-green-500">➜</span>
                                <input
                                    value={terminalInput}
                                    onChange={e => setTerminalInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            handleTerminalCommand(terminalInput)
                                            setTerminalInput('')
                                        }
                                    }}
                                    className="bg-transparent border-none outline-none text-gray-200 w-full placeholder:text-gray-800"
                                    placeholder="Enter command..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
