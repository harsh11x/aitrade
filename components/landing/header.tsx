"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, TrendingUp, Bot, BarChart3, Shield, Zap, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const productItems = [
    {
      title: "AI Trading Agent",
      description: "Autonomous trading with 3 modes",
      href: "/features/ai-agent",
      icon: Bot,
    },
    {
      title: "Advanced Charting",
      description: "TradingView-powered real-time charts",
      href: "/features/charting",
      icon: TrendingUp,
    },
    {
      title: "Portfolio Analytics",
      description: "Institutional-grade performance tracking",
      href: "/features/analytics",
      icon: BarChart3,
    },
    { title: "Risk Management", description: "Automated safety controls", href: "/features/risk", icon: Shield },
  ]

  const resourceItems = [
    { title: "Documentation", description: "Complete guides and API reference", href: "/docs", icon: Zap },
    { title: "Community", description: "Join 50,000+ traders", href: "/community", icon: Users },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/welcome" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
            <TrendingUp className="w-5 h-5 text-primary-foreground relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold text-foreground">NexTrade</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:text-foreground">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                  {productItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted transition-colors"
                        >
                          <item.icon className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-foreground">{item.title}</div>
                            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-foreground/80 hover:text-foreground">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  {resourceItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted transition-colors"
                        >
                          <item.icon className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-foreground">{item.title}</div>
                            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors">
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors">
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" className="text-foreground/80 hover:text-foreground" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background border-border">
            <nav className="flex flex-col gap-4 mt-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Products</p>
                {productItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{item.title}</span>
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Resources</p>
                {resourceItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{item.title}</span>
                  </Link>
                ))}
              </div>
              <Link
                href="/pricing"
                className="px-2 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="px-2 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <div className="border-t border-border pt-4 mt-4 space-y-2">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    Log In
                  </Link>
                </Button>
                <Button className="w-full bg-primary text-primary-foreground" asChild>
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
