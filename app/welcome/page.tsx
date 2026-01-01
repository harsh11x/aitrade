import { LandingHeader } from "@/components/landing/header"
import { Footer as LandingFooter } from "@/components/landing/Footer"
import { HeroSection } from "@/components/landing/hero-section"
import { ComparisonSection } from "@/components/landing/comparison-section"
import { AIAgentSection } from "@/components/landing/ai-agent-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CTASection } from "@/components/landing/cta-section"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <ComparisonSection />
        <AIAgentSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  )
}
