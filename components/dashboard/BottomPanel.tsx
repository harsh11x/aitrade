"use client"

import { useState } from "react"
import { useTrading } from "@/lib/context/TradingContext"
import { Clock, CheckCircle2, History, List, XCircle, Trash2 } from "lucide-react"

export function BottomPanel() {
    const { positions, history, currentPrice, closePosition, closeAllPositions, unrealizedPnL, balance, equity, resetAccount } = useTrading()
    const [activeTab, setActiveTab] = useState<'open_orders' | 'history'>('open_orders')

    return (
        <div className="h-full flex flex-col overflow-hidden bg-black/20 font-sans">
            {/* Simple Stats Bar */}
            <div className="flex items-center gap-6 px-4 py-2 border-b border-white/5 bg-black/40 text-xs text-gray-400 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span>Market Open</span>
                </div>
                <div className="h-3 w-[1px] bg-white/10" />
                <div>
                    <span className="text-gray-500 mr-2">Equity</span>
                    <span className="text-white font-mono">${equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="h-3 w-[1px] bg-white/10" />
                <div>
                    <span className="text-gray-500 mr-2">Realized P&L</span>
                    <span className={`font-mono font-bold ${history.reduce((acc, t) => acc + t.pnl, 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {history.reduce((acc, t) => acc + t.pnl, 0) >= 0 ? '+' : ''}{history.reduce((acc, t) => acc + t.pnl, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
                <div className="h-3 w-[1px] bg-white/10" />
                <div>
                    <span className="text-gray-500 mr-2">Unrealized P&L</span>
                    <span className={`font-mono font-bold ${unrealizedPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {unrealizedPnL >= 0 ? '+' : ''}{unrealizedPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex flex-col min-h-0 bg-black/40">
                {/* Tabs */}
                <div className="flex items-center px-4 border-b border-white/5">
                    <button
                        onClick={() => setActiveTab('open_orders')}
                        className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'open_orders' ? 'border-primary text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                    >
                        <List className="w-3.5 h-3.5" />
                        Positions ({positions.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'history' ? 'border-primary text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                    >
                        <History className="w-3.5 h-3.5" />
                        Order History
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                        {activeTab === 'open_orders' && positions.length > 0 && (
                            <button
                                onClick={closeAllPositions}
                                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded border border-red-500/20 transition-all font-medium"
                            >
                                <XCircle className="w-3 h-3" /> Close All
                            </button>
                        )}
                    </div>
                </div>

                {/* Table Area */}
                <div className="flex-1 overflow-auto custom-scrollbar">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-white/[0.02] text-gray-500 font-medium sticky top-0 z-10 backdrop-blur-md">
                            <tr>
                                {activeTab === 'open_orders' ? (
                                    <>
                                        <th className="px-6 py-3">Symbol</th>
                                        <th className="px-6 py-3">Invested (Margin)</th>
                                        <th className="px-6 py-3">Entry Price</th>
                                        <th className="px-6 py-3">Mark Price</th>
                                        <th className="px-6 py-3">PnL</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="px-6 py-3">Time</th>
                                        <th className="px-6 py-3">Symbol</th>
                                        <th className="px-6 py-3">Side</th>
                                        <th className="px-6 py-3">Invested (Margin)</th>
                                        <th className="px-6 py-3">Close Price</th>
                                        <th className="px-6 py-3 text-right">Realized PnL</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {activeTab === 'open_orders' ? (
                                positions.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-10 text-gray-600">No open positions</td>
                                    </tr>
                                ) : (
                                    positions.map(pos => {
                                        const pnl = (currentPrice - pos.entryPrice) * pos.size * (pos.side === 'LONG' ? 1 : -1)
                                        // Margin = (Size * Entry) / Leverage
                                        const invested = (pos.size * pos.entryPrice) / pos.leverage
                                        const pnlPercent = (pnl / invested) * 100
                                        return (
                                            <tr key={pos.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-3 font-medium text-white flex items-center gap-2">
                                                    <div className={`w-1 h-4 rounded-full ${pos.side === 'LONG' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    {pos.symbol}
                                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${pos.side === 'LONG' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                        {pos.side} {pos.leverage}x
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 text-gray-300 font-mono">${invested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                <td className="px-6 py-3 text-gray-300 font-mono">${pos.entryPrice.toFixed(2)}</td>
                                                <td className="px-6 py-3 text-gray-300 font-mono">${currentPrice.toFixed(2)}</td>
                                                <td className="px-6 py-3 font-mono">
                                                    <div className={pnl >= 0 ? "text-green-400" : "text-red-400"}>
                                                        {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}
                                                    </div>
                                                    <div className={`text-[10px] ${pnl >= 0 ? "text-green-500/60" : "text-red-500/60"}`}>
                                                        {pnlPercent.toFixed(2)}%
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 text-right">
                                                    <button
                                                        onClick={() => closePosition(pos.id)}
                                                        className="text-[10px] bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded transition-colors"
                                                    >
                                                        Close
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                )
                            ) : (
                                history.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 text-gray-600">No trade history</td>
                                    </tr>
                                ) : (
                                    history.map((trade, i) => (
                                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-3 text-gray-500 text-[11px] font-mono">
                                                {new Date(trade.closeTime).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-3 text-white font-medium">{trade.symbol}</td>
                                            <td className={`px-6 py-3 font-bold text-[11px] ${trade.side === 'LONG' ? 'text-green-400' : 'text-red-400'}`}>
                                                {trade.side}
                                            </td>
                                            <td className="px-6 py-3 text-gray-300 font-mono">${((trade.size * trade.entryPrice) / trade.leverage).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                            <td className="px-6 py-3 text-gray-300 font-mono">${trade.closePrice.toFixed(2)}</td>
                                            <td className={`px-6 py-3 text-right font-mono font-bold ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
