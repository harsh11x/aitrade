"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, TrendingUp, BarChart2, Lightbulb, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { sampleAIMessages } from "@/lib/mock-data"

interface Message {
  role: "user" | "assistant"
  content: string
}

const quickActions = [
  { icon: TrendingUp, label: "Analyze BTC trend", action: "Analyze the current BTC/USDT trend and provide a bias" },
  { icon: Target, label: "Generate trade idea", action: "Generate a trade idea for BTC with entry, SL, and TP" },
  { icon: BarChart2, label: "Market overview", action: "Give me an overview of the crypto market right now" },
  { icon: Lightbulb, label: "Strategy suggestion", action: "Suggest a low-risk swing trading strategy" },
]

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(sampleAIMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (message?: string) => {
    const userMessage = message || input
    if (!userMessage.trim()) return

    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        trend: `**BTC/USDT Analysis**

📊 **Current Bias: Bullish**

**Technical Summary:**
• Price is above the 200 EMA on 4H timeframe
• RSI at 58 - room for upside before overbought
• Volume increasing on green candles
• Support at $61,000 holding strong

**Key Levels:**
• Resistance: $64,500, $67,000
• Support: $61,000, $59,500

**Recommendation:** Look for long entries on pullbacks to $62,000 with stops below $61,000.`,

        trade: `**Trade Idea: BTC/USDT LONG**

━━━━━━━━━━━━━━━━━━━━━
**Entry:** $62,250 (current pullback zone)
**Stop Loss:** $60,800 (-2.3%)
**Take Profit 1:** $64,500 (+3.6%)
**Take Profit 2:** $67,000 (+7.6%)

**Risk:Reward:** 1:1.6 (TP1) / 1:3.3 (TP2)
**Position Size:** 1% portfolio risk = 0.35 BTC

**Rationale:**
• Bullish breakout from consolidation
• High volume confirmation
• RSI divergence resolved
━━━━━━━━━━━━━━━━━━━━━

*Would you like me to place this order?*`,

        default: `I understand you're asking about "${userMessage}". Let me analyze that for you...

Based on current market conditions and your query, I'd recommend:

1. **Review your risk parameters** before placing any trades
2. **Check multiple timeframes** for confirmation
3. **Set appropriate stop losses** to protect your capital

Would you like me to provide a more detailed analysis on any specific aspect?`,
      }

      let response = responses.default
      if (userMessage.toLowerCase().includes("trend") || userMessage.toLowerCase().includes("analyze")) {
        response = responses.trend
      } else if (
        userMessage.toLowerCase().includes("trade") ||
        userMessage.toLowerCase().includes("idea") ||
        userMessage.toLowerCase().includes("entry")
      ) {
        response = responses.trade
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full bg-[#0d0d12] rounded-lg border border-primary/20 overflow-hidden shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
          <Bot className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-bold text-base text-white tracking-wide">NexTrade AI</h3>
          <p className="text-xs text-primary/80 font-medium">Always Active</p>
        </div>
        <div className="ml-auto flex items-center gap-2 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-green-400">Live</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-transparent to-black/20">
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-800 border border-white/10 text-white"
                }`}
            >
              {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-base leading-relaxed shadow-sm ${message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-white/10 text-gray-100 rounded-tl-sm border border-white/5"
                }`}
            >
              <div className="whitespace-pre-wrap prose prose-invert max-w-none">
                {message.content.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={i} className="font-bold text-lg my-1.5 text-white">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    )
                  }
                  if (line.startsWith("•")) {
                    return (
                      <p key={i} className="ml-3 my-1 flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{line.substring(1)}</span>
                      </p>
                    )
                  }
                  if (line.startsWith("━")) {
                    return <hr key={i} className="border-white/20 my-3" />
                  }
                  return (
                    <p key={i} className="my-1">
                      {line.replace(/\*\*/g, "")}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-surface-800 border border-white/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 border border-white/5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3 bg-white/5 border-t border-white/10">
        <p className="text-xs text-muted-foreground mb-2 font-medium ml-1">SUGGESTED ACTIONS</p>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleSend(action.action)}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 hover:text-primary hover:border-primary/30 border border-white/10 rounded-lg text-sm whitespace-nowrap transition-all duration-200"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI for trends, signals, or strategy..."
            className="flex-1 bg-black/20 border-white/10 h-12 text-base px-4 focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground/70"
          />
          <Button type="submit" size="icon" className="h-12 w-12 rounded-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" disabled={!input.trim() || isTyping}>
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
