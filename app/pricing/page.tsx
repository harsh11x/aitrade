import { LandingHeader } from "@/components/landing/header"
import { Footer as LandingFooter } from "@/components/landing/Footer"
import { AnimatedSection } from "@/components/landing/animated-section"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for learning and paper trading",
    features: [
      "Paper trading with $100K virtual",
      "Basic charting tools",
      "5 watchlist slots",
      "Community access",
      "Email support",
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For active traders who want an edge",
    features: [
      "Everything in Free",
      "AI Trading Agent (Hybrid Mode)",
      "Advanced TradingView charts",
      "50 watchlist slots",
      "Real-time alerts",
      "Multi-broker support",
      "Portfolio analytics",
      "Priority support",
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Elite",
    price: "$99",
    period: "per month",
    description: "For professional traders and firms",
    features: [
      "Everything in Pro",
      "AI Trading Agent (All 3 Modes)",
      "Autonomous trading",
      "Unlimited watchlists",
      "Strategy backtesting",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "Phone support",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your trading style. All plans include a 14-day free trial.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <AnimatedSection key={plan.name} delay={index * 100}>
                <div
                  className={`relative rounded-2xl p-8 h-full flex flex-col ${plan.popular ? "bg-primary/5 border-2 border-primary" : "bg-card border border-border"
                    }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full h-11 ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                      }`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
