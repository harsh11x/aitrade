"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, Wallet, RefreshCw } from "lucide-react"
import { useTrading } from "@/lib/context/TradingContext"

export default function WalletPage() {
    const { equity, balance, positions, history, deposit, withdraw } = useTrading()

    // Calculate simulated assets based on balance and positions
    const assetList = [
        { icon: "U", name: "Tether", sym: "USDT", bal: balance.toLocaleString(undefined, { maximumFractionDigits: 2 }), val: `$${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, alloc: (balance / equity) * 100, color: "bg-green-500" },
    ]

    // Add active positions as assets (simplified)
    positions.forEach(pos => {
        const value = pos.size * pos.entryPrice // Simplification, strictly speaking 'value' is margin + pnl or notional. Let's use Notional for visualization.
        // Or better, let's just list the "Margin" locked as "Active Trades"
    })

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
                <Header />

                <main className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">My Wallet</h1>
                            <p className="text-gray-400">Manage your assets and track your portfolio growth.</p>
                        </div>
                        <div className="flex gap-4">
                            <GradientButton className="h-10 px-6 shadow-lg shadow-pink-500/20" onClick={() => deposit(10000)}>Deposit Demo Funds</GradientButton>
                            <Button variant="outline" className="h-10 px-6 border-white/10 hover:bg-white/5" onClick={() => withdraw(1000)}>Withdraw</Button>
                        </div>
                    </div>

                    {/* Portfolio Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Balance Card */}
                        <GlassCard className="col-span-2 p-8 relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-black border-white/5">
                            <div className="absolute top-0 right-0 p-32 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10 flex justify-between items-start mb-8">
                                <div>
                                    <div className="text-sm text-gray-400 font-medium mb-1 flex items-center gap-2">
                                        <Wallet className="w-4 h-4" /> Total Equity
                                    </div>
                                    <h2 className="text-5xl font-mono font-bold text-white mb-2 tracking-tight">
                                        {equity.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </h2>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20 font-bold flex items-center">
                                            <TrendingUp className="w-3 h-3 mr-1" /> +12.4%
                                        </span>
                                        <span className="text-xs text-gray-500">vs last month</span>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                                        <div className="text-xs text-gray-400 mb-1">Available Balance</div>
                                        <div className="text-xl font-bold text-white">
                                            {balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mini Chart Visualization */}
                            <div className="h-24 w-full relative">
                                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <path d="M0,80 C100,70 200,85 300,50 S500,60 600,20 S800,40 1000,10" fill="none" stroke="url(#gradient)" strokeWidth="3" className="drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="50%" stopColor="#ec4899" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </GlassCard>

                        {/* Recent Activity (From History) */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                            <div className="space-y-3">
                                {history.slice(0, 4).map((activity, i) => (
                                    <GlassCard key={i} className="p-4 flex items-center justify-between hover:border-white/20 transition-colors group cursor-pointer w-full">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors">
                                                {activity.pnl >= 0 ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : <RefreshCw className="w-4 h-4 text-red-500" />}

                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-sm">{activity.side} {activity.symbol}</div>
                                                <div className="text-xs text-gray-500">Trade Closed</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-mono text-sm font-bold ${activity.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                {activity.pnl >= 0 ? '+' : ''}{activity.pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(activity.closeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))}
                                {history.length === 0 && (
                                    <div className="text-center text-gray-500 py-4 text-sm">No recent activity</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Assets & History Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Assets List */}
                        <div className="xl:col-span-2 space-y-4">
                            <h3 className="text-xl font-bold text-white">Your Assets</h3>
                            <GlassCard className="overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-xs text-gray-400 uppercase">
                                        <tr>
                                            <th className="px-6 py-4 font-normal">Asset</th>
                                            <th className="px-6 py-4 font-normal">Balance</th>
                                            <th className="px-6 py-4 font-normal">Value</th>
                                            <th className="px-6 py-4 font-normal text-right">Allocation</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-sm">
                                        {/* Mock Assets + Real USDT */}
                                        {[
                                            { icon: "B", name: "Bitcoin", sym: "BTC", bal: "0.0000", val: "$0.00", alloc: 0, color: "bg-orange-500" },
                                            { icon: "E", name: "Ethereum", sym: "ETH", bal: "0.0000", val: "$0.00", alloc: 0, color: "bg-blue-500" },
                                            // Real USDT Balance
                                            {
                                                icon: "U",
                                                name: "Tether",
                                                sym: "USDT",
                                                bal: balance.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                                                val: balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
                                                alloc: (balance > 0 ? (balance / equity) * 100 : 0), // Simplistic alloc
                                                color: "bg-green-500"
                                            },
                                        ].map((asset, i) => (
                                            <tr key={i} className="group hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full ${asset.color}/20 flex items-center justify-center text-white font-bold text-xs`}>{asset.icon}</div>
                                                        <div>
                                                            <div className="font-bold text-white">{asset.name}</div>
                                                            <div className="text-xs text-gray-500">{asset.sym}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-gray-300">{asset.bal}</td>
                                                <td className="px-6 py-4 font-bold text-white">{asset.val}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                            <div className={`h-full ${asset.color}`} style={{ width: `${Math.min(asset.alloc, 100)}%` }} />
                                                        </div>
                                                        <span className="text-xs text-gray-500 w-8">{asset.alloc.toFixed(0)}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </GlassCard>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
