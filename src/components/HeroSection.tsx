import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Trophy, Users, TrendingUp, Star, Play, Sparkles } from "lucide-react"
import { AuthModal } from "./AuthModal"

export function HeroSection() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  const stats = [
    {
      icon: Trophy,
      value: "500+",
      label: "Bolões Ativos",
      color: "text-brand-600",
      bgColor: "bg-brand-500/10"
    },
    {
      icon: Users,
      value: "10K+",
      label: "Usuários Ativos",
      color: "text-success",
      bgColor: "bg-success-500/10"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Taxa de Precisão",
      color: "text-brand-600",
      bgColor: "bg-brand-500/10"
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 via-transparent to-success-50/20 dark:from-brand-900/10 dark:to-success-900/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-success-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero Badge */}
          <div className="flex justify-center mb-8">
            <Badge 
              variant="outline" 
              className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium border-brand-200 bg-brand-50/50 text-brand-700 dark:border-brand-800 dark:bg-brand-900/20 dark:text-brand-300 animate-fade-in hover:shadow-soft transition-normal"
            >
              <Sparkles className="h-4 w-4" />
              <span>Plataforma #1 em Bolões Esportivos</span>
            </Badge>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground mb-6 animate-slide-up">
              Transforme{" "}
              <span className="text-gradient-brand relative">
                Cada Jogo
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-brand rounded-full opacity-30"></div>
              </span>
              <br />
              em uma Vitória
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Participe dos bolões mais emocionantes, faça seus palpites e compete com amigos. 
              <br className="hidden sm:block" />
              Dados em tempo real direto da API oficial do futebol.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
            <Button 
              variant="brand"
              size="lg"
              className="text-lg px-8 py-4 h-14 shadow-medium hover:shadow-strong transition-normal"
              onClick={() => setShowAuthModal(true)}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 h-14 hover:shadow-soft transition-normal"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Como Funciona
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-normal shadow-soft`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center animate-fade-in">
            <p className="text-sm text-muted-foreground mb-4">
              Confiado por milhares de usuários
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
                <span className="ml-2 text-sm font-medium text-muted-foreground">4.9/5</span>
              </div>
              <div className="text-sm text-muted-foreground">
                +10.000 avaliações
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </section>
  )
}