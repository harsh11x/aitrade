"use client"

import { Sidebar } from "@/components/layout/Sidebar"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTrading } from "@/lib/context/TradingContext"
import { LogOut, Settings, Shield, Bell, User, Monitor, Database, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
    const { resetAccount } = useTrading()
    const [notifications, setNotifications] = useState(true)
    const [soundEnabled, setSoundEnabled] = useState(true)

    const handleReset = () => {
        if (confirm("Are you sure you want to reset your account? This will clear all history, positions, and reset your balance to $100,000.")) {
            resetAccount()
            alert("Account reset successfully.")
        }
    }

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
            <Sidebar />
            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <Settings className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Settings</h1>
                            <p className="text-gray-400">Manage your trading preferences and account settings.</p>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-500" /> Account
                        </h2>
                        <GlassCard className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Display Name</Label>
                                    <Input defaultValue="Alex Trader" className="bg-white/5 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input defaultValue="alex@example.com" disabled className="bg-white/5 border-white/10 opacity-50" />
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                <div className="text-sm text-gray-400">
                                    Member since Dec 2025
                                </div>
                                <Button>Save Changes</Button>
                            </div>
                        </GlassCard>
                    </section>

                    {/* Trading Preferences */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Monitor className="w-5 h-5 text-purple-500" /> Trading
                        </h2>
                        <GlassCard className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base">Trade Notifications</Label>
                                    <p className="text-sm text-gray-400">Receive alerts when orders are filled.</p>
                                </div>
                                <Switch checked={notifications} onCheckedChange={setNotifications} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base">Sound Effects</Label>
                                    <p className="text-sm text-gray-400">Play sounds for trade execution and signals.</p>
                                </div>
                                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                            </div>
                        </GlassCard>
                    </section>

                    {/* System / Danger Zone */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-red-500">
                            <AlertTriangle className="w-5 h-5" /> Danger Zone
                        </h2>
                        <GlassCard className="p-6 border-red-500/20 bg-red-500/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-white">Reset Demo Account</h3>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Reset your balance to $100,000 and clear all trade history.
                                        This action cannot be undone.
                                    </p>
                                </div>
                                <Button variant="destructive" onClick={handleReset}>
                                    Reset Account
                                </Button>
                            </div>
                        </GlassCard>
                    </section>

                </div>
            </div>
        </div>
    )
}
