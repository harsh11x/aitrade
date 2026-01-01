import { LandingHeader } from "@/components/landing/header"
import { Footer as LandingFooter } from "@/components/landing/Footer"
import { AnimatedSection } from "@/components/landing/animated-section"
import { Target, Users, Zap, Globe } from "lucide-react"

const stats = [
  { value: "50K+", label: "Active Traders" },
  { value: "$2B+", label: "Volume Traded" },
  { value: "150+", label: "Countries" },
  { value: "99.99%", label: "Uptime" },
]

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We believe every trader deserves access to institutional-grade tools and AI-powered insights.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Our community of 50,000+ traders helps shape every feature we build.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We push the boundaries of what's possible in trading technology every single day.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Trading should be borderless. We serve traders in over 150 countries worldwide.",
  },
]

const team = [
  { name: "Sarah Chen", role: "CEO & Co-Founder", image: "/professional-woman-ceo-headshot.png" },
  { name: "Michael Park", role: "CTO & Co-Founder", image: "/professional-man-cto-headshot.jpg" },
  { name: "Emily Rodriguez", role: "Head of AI", image: "/professional-woman-ai-researcher-headshot.jpg" },
  { name: "David Kim", role: "Head of Product", image: "/professional-man-product-manager-headshot.jpg" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Democratizing Professional Trading</h1>
            <p className="text-lg text-muted-foreground">
              We started NexTrade with a simple belief: the tools that power hedge funds should be available to
              everyone. Today, we&apos;re building the most advanced AI-powered trading platform in the world.
            </p>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={100} className="mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection delay={200} className="mb-24">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.title} className="bg-card rounded-xl p-6 border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Team */}
          <AnimatedSection delay={300}>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Leadership Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </main>
      <LandingFooter />
    </div>
  )
}
