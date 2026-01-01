"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function OrderPanel() {
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("limit")
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [price, setPrice] = useState("62500")
  const [amount, setAmount] = useState("")
  const [total, setTotal] = useState("")
  const [sliderValue, setSliderValue] = useState([0])
  const [stopLoss, setStopLoss] = useState("")
  const [takeProfit, setTakeProfit] = useState("")

  const availableBalance = 100000

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    const percentage = value[0] / 100
    const amountValue = ((availableBalance * percentage) / Number.parseFloat(price || "1")).toFixed(6)
    setAmount(amountValue)
    setTotal((Number.parseFloat(amountValue) * Number.parseFloat(price || "0")).toFixed(2))
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-3 border-b border-border">
        <h3 className="font-semibold text-sm">Place Order</h3>
      </div>

      {/* Buy/Sell Toggle */}
      <div className="grid grid-cols-2 gap-1 p-3">
        <Button
          variant={side === "buy" ? "default" : "secondary"}
          onClick={() => setSide("buy")}
          className={side === "buy" ? "bg-[hsl(145,70%,50%)] hover:bg-[hsl(145,70%,45%)] text-black" : ""}
        >
          Buy
        </Button>
        <Button
          variant={side === "sell" ? "default" : "secondary"}
          onClick={() => setSide("sell")}
          className={side === "sell" ? "bg-[hsl(25,80%,55%)] hover:bg-[hsl(25,80%,50%)] text-white" : ""}
        >
          Sell
        </Button>
      </div>

      {/* Order Type Tabs */}
      <Tabs value={orderType} onValueChange={(v) => setOrderType(v as typeof orderType)} className="px-3">
        <TabsList className="grid w-full grid-cols-3 h-8">
          <TabsTrigger value="limit" className="text-xs">
            Limit
          </TabsTrigger>
          <TabsTrigger value="market" className="text-xs">
            Market
          </TabsTrigger>
          <TabsTrigger value="stop" className="text-xs">
            Stop
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex-1 p-3 space-y-3">
        {/* Available Balance */}
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Available</span>
          <span className="font-mono">{availableBalance.toLocaleString()} USDT</span>
        </div>

        {/* Price Input */}
        {orderType !== "market" && (
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Price</label>
            <div className="relative">
              <Input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pr-14 bg-secondary border-border font-mono"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">USDT</span>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Amount</label>
          <div className="relative">
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="pr-12 bg-secondary border-border font-mono"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">BTC</span>
          </div>
        </div>

        {/* Percentage Slider */}
        <div className="space-y-2">
          <Slider value={sliderValue} onValueChange={handleSliderChange} max={100} step={1} className="py-2" />
          <div className="grid grid-cols-4 gap-1">
            {[25, 50, 75, 100].map((pct) => (
              <Button
                key={pct}
                variant="outline"
                size="sm"
                className="h-6 text-xs bg-transparent"
                onClick={() => handleSliderChange([pct])}
              >
                {pct}%
              </Button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">Total</label>
          <div className="relative">
            <Input
              type="text"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              placeholder="0.00"
              className="pr-14 bg-secondary border-border font-mono"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">USDT</span>
          </div>
        </div>

        {/* TP/SL */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Take Profit</label>
            <Input
              type="text"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              placeholder="TP Price"
              className="bg-secondary border-border font-mono text-sm h-8"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Stop Loss</label>
            <Input
              type="text"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="SL Price"
              className="bg-secondary border-border font-mono text-sm h-8"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-3 border-t border-border">
        <Button
          className={`w-full ${
            side === "buy"
              ? "bg-[hsl(145,70%,50%)] hover:bg-[hsl(145,70%,45%)] text-black"
              : "bg-[hsl(25,80%,55%)] hover:bg-[hsl(25,80%,50%)] text-white"
          }`}
        >
          {side === "buy" ? "Buy" : "Sell"} BTC
        </Button>
        <div className="flex justify-center gap-4 mt-2 text-xs text-muted-foreground">
          <span>Fee: 0.1%</span>
          <span>Est. Cost: {total ? `$${Number.parseFloat(total).toFixed(2)}` : "$0.00"}</span>
        </div>
      </div>
    </div>
  )
}
