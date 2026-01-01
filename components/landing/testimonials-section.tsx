"use client"

import { AnimatedSection } from "./animated-section"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "NexTrade's AI agent increased my win rate from 52% to 73%. The autonomous mode is like having a hedge fund manager working for you 24/7.",
    author: "Michael Chen",
    role: "Hedge Fund Manager",
    avatar: "/professional-asian-man-headshot.png",
    rating: 5,
  },
  {
    quote:
      "I've used Bloomberg Terminal for 15 years. NexTrade does everything it does at 1/10th the cost, plus the AI features are game-changing.",
    author: "Sarah Williams",
    role: "Portfolio Manager",
    avatar: "/professional-blonde-headshot.png",
    rating: 5,
  },
  {
    quote:
      "The natural language commands are incredible. I literally told it 'scale into TSLA if it breaks 250' and it executed perfectly.",
    author: "David Park",
    role: "Day Trader",
    avatar: "/professional-korean-man-headshot.png",
    rating: 5,
  },
  {
    quote:
      "Paper trading mode helped me develop a strategy that's now returning 47% annually. Best decision I ever made switching to NexTrade.",
    author: "Emma Rodriguez",
    role: "Swing Trader",
    avatar: "/professional-latina-woman-headshot.png",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Trusted by 50,000+ Traders Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From retail traders to hedge fund managers, NexTrade is transforming how professionals trade.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.author} delay={index * 100}>
              <div className="glass rounded-2xl p-6 h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 text-pretty">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
