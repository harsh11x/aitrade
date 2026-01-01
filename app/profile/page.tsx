"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { useTrading } from "@/lib/context/TradingContext"
import { User, Shield, Key, FileText, BadgeCheck, Camera, Mail, Phone, MapPin, Edit3 } from "lucide-react"

export default function ProfilePage() {
    const { history } = useTrading()

    const totalTrades = history.length
    const winRate = totalTrades > 0
        ? ((history.filter(t => t.pnl > 0).length / totalTrades) * 100).toFixed(1)
        : "0.0"

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
            <Sidebar />
            <div className="flex-1 overflow-y-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Profile & Security</h1>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                        <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Card */}
                    <GlassCard className="col-span-1 p-8 flex flex-col items-center text-center">
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-[2px]">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                    <User className="w-16 h-16 text-gray-400" />
                                </div>
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold mb-1">Alex Trader</h2>
                        <p className="text-gray-500 mb-4">@alextrader_99</p>

                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 text-sm font-medium mb-6">
                            <BadgeCheck className="w-4 h-4" /> Verified Trader
                        </div>

                        <div className="w-full grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="text-2xl font-bold text-white">{totalTrades}</div>
                                <div className="text-xs text-gray-500">Total Trades</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="text-2xl font-bold text-green-400">{winRate}%</div>
                                <div className="text-xs text-gray-500">Win Rate</div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Details & Security */}
                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        <GlassCard className="p-6">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-pink-500" /> Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">Full Name</label>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span>Alex Trader</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">Email Address</label>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span>alex@example.com</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">Phone Number</label>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500">Location</label>
                                    <div className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span>New York, USA</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        <h3 className="text-xl font-bold pt-4 mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-500" /> Security
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <GlassCard className="p-6 flex items-center justify-between group hover:border-pink-500/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                                        <Key className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Two-Factor Auth</h4>
                                        <p className="text-xs text-gray-500">Enabled (Google Auth)</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="border-green-500/20 text-green-500 bg-green-500/10">Active</Button>
                            </GlassCard>

                            <GlassCard className="p-6 flex items-center justify-between group hover:border-pink-500/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">KYC Status</h4>
                                        <p className="text-xs text-gray-500">Level 2 Verified</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="border-green-500/20 text-green-500 bg-green-500/10">Verified</Button>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
