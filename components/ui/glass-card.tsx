"use client"

import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    hoverEffect?: boolean
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "glass-panel rounded-2xl p-6 transition-all duration-300",
                hoverEffect && "hover:bg-white/5 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
