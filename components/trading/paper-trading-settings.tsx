"use client"

import { useState } from "react"
import { Settings, Plus, RefreshCw, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SimulationSettings, PaperAccount } from "@/lib/paper-trading"

interface PaperTradingSettingsProps {
  accounts: PaperAccount[]
  selectedAccount: PaperAccount | null
  onSelectAccount: (account: PaperAccount) => void
  onCreateAccount: (account: Omit<PaperAccount, "id" | "createdAt">) => void
  onResetAccount: (accountId: string) => void
  settings: SimulationSettings
  onUpdateSettings: (settings: SimulationSettings) => void
}

export function PaperTradingSettings({
  accounts,
  selectedAccount,
  onSelectAccount,
  onCreateAccount,
  onResetAccount,
  settings,
  onUpdateSettings,
}: PaperTradingSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newAccountName, setNewAccountName] = useState("Paper Account")
  const [newAccountBalance, setNewAccountBalance] = useState("100000")
  const [newAccountCurrency, setNewAccountCurrency] = useState("USDT")
  const [newAccountLeverage, setNewAccountLeverage] = useState("10")
  const [localSettings, setLocalSettings] = useState(settings)

  const handleCreateAccount = () => {
    onCreateAccount({
      name: newAccountName,
      balance: Number.parseFloat(newAccountBalance),
      initialBalance: Number.parseFloat(newAccountBalance),
      currency: newAccountCurrency,
      leverage: Number.parseFloat(newAccountLeverage),
    })
    setNewAccountName("Paper Account")
    setNewAccountBalance("100000")
  }

  const handleSaveSettings = () => {
    onUpdateSettings(localSettings)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          <span className="text-xs">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Paper Trading Settings</DialogTitle>
          <DialogDescription>
            Configure your paper trading accounts and simulation parameters for realistic trading practice.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Account Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Paper Accounts</Label>
            <div className="flex gap-2">
              <Select
                value={selectedAccount?.id}
                onValueChange={(id) => {
                  const account = accounts.find((a) => a.id === id)
                  if (account) onSelectAccount(account)
                }}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - {account.balance.toLocaleString()} {account.currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedAccount && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onResetAccount(selectedAccount.id)}
                  title="Reset account"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Create New Account */}
          <div className="space-y-3 p-4 border border-border rounded-lg">
            <Label className="text-sm font-medium">Create New Account</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Name</Label>
                <Input
                  value={newAccountName}
                  onChange={(e) => setNewAccountName(e.target.value)}
                  placeholder="Account name"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Starting Balance</Label>
                <Input
                  type="number"
                  value={newAccountBalance}
                  onChange={(e) => setNewAccountBalance(e.target.value)}
                  placeholder="100000"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Currency</Label>
                <Select value={newAccountCurrency} onValueChange={setNewAccountCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Max Leverage</Label>
                <Select value={newAccountLeverage} onValueChange={setNewAccountLeverage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1x (No leverage)</SelectItem>
                    <SelectItem value="5">5x</SelectItem>
                    <SelectItem value="10">10x</SelectItem>
                    <SelectItem value="20">20x</SelectItem>
                    <SelectItem value="50">50x</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleCreateAccount} className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Create Account
            </Button>
          </div>

          {/* Simulation Settings */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Simulation Parameters</Label>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-muted-foreground">Spread</Label>
                  <span className="text-xs font-mono">{localSettings.spreadPercent.toFixed(2)}%</span>
                </div>
                <Slider
                  value={[localSettings.spreadPercent * 100]}
                  onValueChange={([v]) => setLocalSettings((s) => ({ ...s, spreadPercent: v / 100 }))}
                  max={10}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-muted-foreground">Slippage</Label>
                  <span className="text-xs font-mono">{localSettings.slippagePercent.toFixed(2)}%</span>
                </div>
                <Slider
                  value={[localSettings.slippagePercent * 100]}
                  onValueChange={([v]) => setLocalSettings((s) => ({ ...s, slippagePercent: v / 100 }))}
                  max={20}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-muted-foreground">Maker Fee</Label>
                  <span className="text-xs font-mono">{localSettings.makerFeePercent.toFixed(2)}%</span>
                </div>
                <Slider
                  value={[localSettings.makerFeePercent * 100]}
                  onValueChange={([v]) => setLocalSettings((s) => ({ ...s, makerFeePercent: v / 100 }))}
                  max={50}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-muted-foreground">Taker Fee</Label>
                  <span className="text-xs font-mono">{localSettings.takerFeePercent.toFixed(2)}%</span>
                </div>
                <Slider
                  value={[localSettings.takerFeePercent * 100]}
                  onValueChange={([v]) => setLocalSettings((s) => ({ ...s, takerFeePercent: v / 100 }))}
                  max={50}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-muted-foreground">Latency</Label>
                  <span className="text-xs font-mono">{localSettings.latencyMs}ms</span>
                </div>
                <Slider
                  value={[localSettings.latencyMs]}
                  onValueChange={([v]) => setLocalSettings((s) => ({ ...s, latencyMs: v }))}
                  max={500}
                  step={10}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs text-muted-foreground">Funding Rate (8h)</Label>
                  <span className="text-xs font-mono">{localSettings.fundingRatePercent.toFixed(3)}%</span>
                </div>
                <Slider
                  value={[localSettings.fundingRatePercent * 1000]}
                  onValueChange={([v]) => setLocalSettings((s) => ({ ...s, fundingRatePercent: v / 1000 }))}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveSettings} className="gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
