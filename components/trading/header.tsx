"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bell, Settings, User, ChevronDown, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TradingHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Trade" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "#", label: "Markets" },
    { href: "#", label: "Screener" },
  ]

  return (
    <header className="h-14 border-b border-border/50 glass sticky top-0 z-50 flex items-center justify-between px-4 backdrop-blur-xl bg-background/60 supports-[backdrop-filter]:bg-background/20">
      {/* Logo and Navigation */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-sm">NT</span>
          </div>
          <span className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">NexTrade</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={pathname === item.href ? "text-foreground" : "text-muted-foreground"}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-8 hidden lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search symbols, pairs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary border-border h-9"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Connection Status */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
          <Wifi className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline">Connected</span>
        </div>

        {/* Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <span className="text-sm">Paper Trading</span>
              <span className="text-xs text-primary bg-primary/20 px-1.5 py-0.5 rounded">$100,000</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span>Paper Account</span>
                <span className="text-xs text-muted-foreground">$100,000.00 USDT</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Connect Broker</DropdownMenuItem>
            <DropdownMenuItem>Connect Exchange</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
