"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Home, LineChart, Wallet, Settings, User, LogOut, LayoutDashboard, Zap, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(true)

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: LineChart, label: 'Analysis', href: '/analysis' },
        { icon: Wallet, label: 'Wallet', href: '/wallet' },
        { icon: User, label: 'Profile', href: '/profile' },
        { icon: Settings, label: 'Settings', href: '/settings' },
        { icon: HelpCircle, label: 'Help', href: '/help' },
    ]

    return (
        <GlassCard
            className={cn(
                "border-r border-white/5 flex flex-col justify-between py-6 z-20 transition-all duration-300",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <div>
                {/* Header / Logo (Toggle) */}
                <div
                    className={cn(
                        "flex items-center px-4 mb-8 cursor-pointer group",
                        isCollapsed ? "justify-center" : "justify-between"
                    )}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-white fill-current" />
                        </div>
                        {!isCollapsed && (
                            <span className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 animate-in fade-in slide-in-from-left-4 duration-300">
                                PULSE
                            </span>
                        )}
                    </div>
                </div>

                {/* Nav Items */}
                <div className="flex flex-col gap-2 px-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full rounded-xl transition-all duration-300 group relative overflow-hidden",
                                        isCollapsed ? "justify-center px-0" : "justify-start px-4 gap-3",
                                        isActive
                                            ? 'bg-pink-500/10 text-white shadow-[0_0_20px_rgba(236,72,153,0.15)]'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    )}
                                >
                                    {/* Active Indicator Line */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-pink-500 rounded-r-full shadow-[0_0_10px_#ec4899]" />
                                    )}

                                    <item.icon className={cn(
                                        "w-5 h-5 transition-transform duration-300 z-10",
                                        isActive && "text-pink-400 scale-110",
                                        !isActive && "group-hover:scale-110 group-hover:text-gray-200"
                                    )} />

                                    {!isCollapsed && (
                                        <span className={cn(
                                            "font-medium tracking-wide transition-all duration-300 z-10",
                                            isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                                        )}>
                                            {item.label}
                                        </span>
                                    )}

                                    {/* Tooltip for Collapsed State */}
                                    {isCollapsed && (
                                        <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-xs font-medium text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-all duration-200 translate-x-2 group-hover:translate-x-0 shadow-xl">
                                            {item.label}
                                            {/* Tooltip Arrow */}
                                            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1a1a1a] border-l border-b border-white/10 transform rotate-45" />
                                        </div>
                                    )}
                                </Button>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Footer / Toggle & Logout */}
            <div className="px-3 space-y-2">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors",
                        isCollapsed ? "justify-center px-0" : "justify-start px-4 gap-3"
                    )}
                >
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span>Logout</span>}
                </Button>
            </div>
        </GlassCard>
    )
}
