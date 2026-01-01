"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "outline"
}

export function GradientButton({ children, className, variant = "primary", ...props }: GradientButtonProps) {
    return (
        <Button
            className={cn(
                "relative overflow-hidden transition-all duration-300",
                variant === "primary" && "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] border-0",
                variant === "secondary" && "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10",
                variant === "outline" && "bg-transparent border border-white/20 text-white hover:bg-white/5",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    )
}
