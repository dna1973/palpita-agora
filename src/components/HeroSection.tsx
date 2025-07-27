import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Trophy, Users, TrendingUp, Star } from "lucide-react"
import { AuthModal } from "./AuthModal"

export function HeroSection() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Plataforma #1 em Bolões Esportivos
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-gradient">
              Transforme Cada Jogo
            </span>
            <br />
            em uma Vitória
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Participe dos bolões mais emocionantes, faça seus palpites e compete com amigos. 
            Dados em tempo real direto da API oficial do futebol.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in">
            <Button 
              size="lg"
              className="btn-hero text-lg px-8 py-4"
              onClick={() => setShowAuthModal(true)}
            >
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-2 hover:bg-accent/50"
            >
              Ver Como Funciona
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Bolões Ativos</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto mb-3">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">Usuários Ativos</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Taxa de Precisão</div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </section>
  )
}