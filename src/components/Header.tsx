import { Trophy, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useState } from "react"
import { AuthModal } from "./AuthModal"

export function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">Palpita Agora</h1>
            <p className="text-xs text-muted-foreground">Bolões Esportivos</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Bolões
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Enquetes
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Rankings
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Como Funciona
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowAuthModal(true)}
            className="hidden sm:flex"
          >
            <User className="h-4 w-4 mr-2" />
            Entrar
          </Button>
          <Button 
            className="btn-premium hidden sm:block"
            onClick={() => setShowAuthModal(true)}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Cadastrar
          </Button>
          
          {/* Mobile Login */}
          <Button 
            size="icon"
            variant="ghost"
            className="sm:hidden"
            onClick={() => setShowAuthModal(true)}
          >
            <LogIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </header>
  )
}