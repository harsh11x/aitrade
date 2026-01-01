import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { AuthModal } from "@/components/auth/AuthModal"
import { Menu, X } from "lucide-react"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">CE Web</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#pro-tools" className="hover:text-white transition-colors">AI Tools</a>
                    <a href="#markets" className="hover:text-white transition-colors">Markets</a>
                    <a href="#learn" className="hover:text-white transition-colors">Learn</a>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-6 text-sm">
                        <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
                        <a href="mailto:support@ceweb.com" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                    </div>
                    <AuthModal>
                        <Button variant="ghost" className="hidden md:flex text-white hover:bg-white/10 hover:text-white">Sign In</Button>
                    </AuthModal>
                    <AuthModal>
                        <GradientButton className="hidden md:flex rounded-full px-6">Join CE Web</GradientButton>
                    </AuthModal>
                    <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/95 pt-24 px-6 md:hidden animate-in fade-in slide-in-from-top-10">
                    <div className="flex flex-col gap-8 text-lg font-medium text-gray-300">
                        <a href="#features" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Features</a>
                        <a href="#pro-tools" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">AI Tools</a>
                        <a href="#markets" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Markets</a>
                        <a href="#learn" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Learn</a>
                        <div className="h-px bg-white/10 w-full" />
                        <AuthModal>
                            <Button className="w-full text-white" variant="ghost" onClick={() => setIsOpen(false)}>Sign In</Button>
                        </AuthModal>
                        <AuthModal>
                            <GradientButton className="w-full rounded-full">Join CE Web</GradientButton>
                        </AuthModal>
                    </div>
                </div>
            )}
        </>
    )
}
