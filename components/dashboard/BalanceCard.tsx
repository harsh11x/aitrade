"use client"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { ArrowUpRight, ArrowDownLeft, RefreshCcw, Wallet } from "lucide-react"

import { useTrading } from "@/lib/context/TradingContext"
import { DepositWithdrawModal } from "./DepositWithdrawModal"

export function BalanceCard() {
    const { equity } = useTrading()

    return (
        <GlassCard className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex gap-4 bg-white/5 p-1 rounded-lg border border-white/5">
                    <Button variant="ghost" size="sm" className="bg-white/10 shadow-sm text-white hover:bg-white/20">Balance</Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5">Pending</Button>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        {equity.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </h2>
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                        <Wallet className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-sm text-gray-300">DEMO</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>18:21:58</span>
                    <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-white/10 hover:text-white rounded-full">
                        <RefreshCcw className="w-3 h-3" />
                    </Button>
                    <span>Refresh</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <div className="text-sm font-medium text-white">€162.39</div>
                    <div className="text-xs text-gray-500">Daily volume</div>
                </div>
                <div>
                    <div className="text-sm font-medium text-white">0.029</div>
                    <div className="text-xs text-gray-500">BTC volume</div>
                </div>
                <div>
                    <div className="text-sm font-medium text-green-500">0.76%</div>
                    <div className="text-xs text-gray-500">% amount</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <DepositWithdrawModal type="DEPOSIT">
                    <GradientButton className="w-full shadow-lg">
                        <ArrowDownLeft className="w-4 h-4 mr-2" />
                        Deposit
                    </GradientButton>
                </DepositWithdrawModal>

                <DepositWithdrawModal type="WITHDRAW">
                    <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10 bg-transparent">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Withdraw
                    </Button>
                </DepositWithdrawModal>
            </div>
        </GlassCard>
    )
}
