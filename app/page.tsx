"use client"

import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { AIAdvantage } from "@/components/landing/AIAdvantage"
import { Footer } from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-pink-500/30">
      <Navbar />
      <Hero />
      <Features />
      <AIAdvantage />
      <Footer />
    </main>
  )
}
