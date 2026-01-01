"use client"

import { Search, Bell, ChevronRight, Home, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { AuthModal } from "@/components/auth/AuthModal"
import { Wallet } from "lucide-react"
import { useTrading } from "@/lib/context/TradingContext"

export function Header() {
    const { resetAccount } = useTrading()
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-transparent sticky top-0 z-10 animate-in fade-in slide-in-from-top-2 duration-500">
            {/* Left: Breadcrumbs / Page Title */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Home className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-300 font-medium hover:text-white transition-colors cursor-pointer">Dashboard</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white font-bold">Trade</span>
            </div>

            <div className="flex items-center gap-8 flex-1 justify-center max-w-xl mx-auto hidden md:flex">
                {/* Search */}
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-pink-500 transition-colors" />
                    <Input
                        placeholder="Search for assets..."
                        className="pl-10 bg-black/20 border-white/5 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-pink-500/50 rounded-xl h-10 transition-all hover:bg-white/5"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-600 border border-white/10 px-1.5 rounded">/</div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => {
                        if (confirm("Hard Reset: Clear history and reset balance to $100k?")) {
                            resetAccount()
                        }
                    }}
                    className="flex items-center gap-2 text-xs font-medium text-red-400 hover:text-red-300 mr-4 transition-colors"
                    title="Hard Reset Account"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    Reset App
                </button>

                <div className="flex items-center gap-2 mr-2">
                    <span className="text-xs font-medium text-gray-400">Reserve Wallet</span>
                    <div className="w-8 h-4 bg-white/10 rounded-full relative cursor-pointer hover:bg-pink-500/20 transition-colors">
                        <div className="absolute left-1 top-1 w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                </div>

                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white hover:bg-white/5 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
                </Button>

                <div className="h-6 w-[1px] bg-white/10" />

                <AuthModal>
                    <GradientButton className="rounded-full h-9 px-4 text-xs font-bold shadow-lg shadow-pink-500/20">
                        <Wallet className="w-3 h-3 mr-2" /> Connect
                    </GradientButton>
                </AuthModal>
            </div>
        </header>
    )
}
