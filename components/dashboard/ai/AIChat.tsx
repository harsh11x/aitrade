"use client"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Image as ImageIcon, Monitor, Mic, Paperclip, Bot } from "lucide-react"

export function AIChat() {
    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="font-bold text-white text-sm">FinAI Assistant</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-gray-400">Online | Analyzing BTC/USDT</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {/* Bot Message */}
                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-pink-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                            <Bot className="w-3 h-3 text-pink-500" />
                        </div>
                        <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                            <p className="text-xs text-gray-300">Hello! I'm monitoring the BTC/USDT pair. The market is currently showing bullish divergence. Would you like me to analyze a specific chart pattern or setup fully automated trading?</p>
                        </div>
                    </div>

                    {/* User Message */}
                    <div className="flex gap-3 flex-row-reverse">
                        <div className="w-6 h-6 rounded-full bg-gray-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                            <span className="text-[10px] font-bold text-white">YOU</span>
                        </div>
                        <div className="bg-purple-600/20 border border-purple-500/30 rounded-2xl rounded-tr-sm p-3 max-w-[85%]">
                            <p className="text-xs text-white">Can you analyze this support level?</p>
                            <div className="mt-2 rounded-lg overflow-hidden border border-white/10 relative group cursor-pointer">
                                <div className="bg-black/50 h-20 w-32 flex items-center justify-center">
                                    <ImageIcon className="w-6 h-6 text-gray-400" />
                                </div>
                                <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]">image.png</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-3 border-t border-white/5 bg-black/20">
                <div className="flex gap-2 mb-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5" title="Upload Screenshot">
                        <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5" title="Share Live Screen">
                        <Monitor className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5" title="Voice Input">
                        <Mic className="w-4 h-4" />
                    </Button>
                </div>

                <div className="relative">
                    <Input
                        placeholder="Ask FinAI about trends, alerts..."
                        className="pr-10 bg-white/5 border-white/10 text-white text-xs h-10 rounded-xl focus-visible:ring-pink-500/50"
                    />
                    <Button size="icon" className="absolute right-1 top-1 h-8 w-8 bg-gradient-to-tr from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 rounded-lg">
                        <Send className="w-4 h-4 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
