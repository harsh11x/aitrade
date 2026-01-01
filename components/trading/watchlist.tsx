"use client"

import { useState } from "react"
import { Star, TrendingUp, TrendingDown, Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { sampleWatchlist } from "@/lib/mock-data"

export function Watchlist() {
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>(["BTC/USDT", "ETH/USDT"])

  const filteredWatchlist = sampleWatchlist.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleFavorite = (symbol: string) => {
    setFavorites((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Watchlist</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-8 text-xs bg-secondary border-border"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredWatchlist.map((item) => (
          <div
            key={item.symbol}
            className="flex items-center gap-2 px-3 py-2 hover:bg-secondary/50 cursor-pointer transition-colors border-b border-border/50"
          >
            <button
              onClick={() => toggleFavorite(item.symbol)}
              className="text-muted-foreground hover:text-yellow-500 transition-colors"
            >
              <Star
                className={`w-3.5 h-3.5 ${favorites.includes(item.symbol) ? "fill-yellow-500 text-yellow-500" : ""}`}
              />
            </button>

            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{item.symbol}</div>
              <div className="text-xs text-muted-foreground truncate">{item.name}</div>
            </div>

            <div className="text-right">
              <div className="font-mono text-sm">${item.price.toLocaleString()}</div>
              <div
                className={`flex items-center justify-end gap-1 text-xs ${item.change >= 0 ? "text-[hsl(145,70%,50%)]" : "text-[hsl(25,80%,55%)]"}`}
              >
                {item.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>
                  {item.change >= 0 ? "+" : ""}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
