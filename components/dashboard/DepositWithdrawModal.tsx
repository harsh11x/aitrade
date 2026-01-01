"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { useTrading } from "@/lib/context/TradingContext"
import { GradientButton } from "@/components/ui/gradient-button"

interface DepositWithdrawModalProps {
    type: "DEPOSIT" | "WITHDRAW"
    children: React.ReactNode
}

export function DepositWithdrawModal({ type, children }: DepositWithdrawModalProps) {
    const { deposit, withdraw, balance } = useTrading()
    const [amount, setAmount] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = () => {
        const val = parseFloat(amount)
        if (isNaN(val) || val <= 0) return

        if (type === "DEPOSIT") {
            deposit(val)
        } else {
            withdraw(val)
        }
        setIsOpen(false)
        setAmount("")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-white/10 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {type === "DEPOSIT" ? <ArrowDownLeft className="text-green-500" /> : <ArrowUpRight className="text-red-500" />}
                        {type === "DEPOSIT" ? "Deposit Funds" : "Withdraw Funds"}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Amount (USDT)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="pl-6 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-pink-500"
                                placeholder="0.00"
                                autoFocus
                            />
                        </div>
                        {type === "WITHDRAW" && (
                            <div className="text-xs text-gray-500">
                                Available: <span className="text-white font-mono">${balance.toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                    <GradientButton onClick={handleSubmit} className="w-full">
                        Confirm {type === "DEPOSIT" ? "Deposit" : "Withdrawal"}
                    </GradientButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}
