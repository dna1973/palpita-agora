import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Trophy, 
  Star, 
  Users, 
  Target, 
  TrendingUp, 
  Award, 
  Zap, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Sparkles,
  BarChart3
} from "lucide-react"

export function ColorSystemDemo() {
  const modernStats = [
    {
      title: "Bolões Ativos",
      value: "12",
      change: "+2",
      icon: Trophy,
      color: "text-brand-600",
      bgColor: "bg-brand-500/10",
      trend: "up"
    },
    {
      title: "Taxa de Acerto",
      value: "87%",
      change: "+5%",
      icon: Target,
      color: "text-success",
      bgColor: "bg-success-500/10",
      trend: "up"
    },
    {
      title: "Ranking",
      value: "#3",
      change: "↑2",
      icon: Award,
      color: "text-warning",
      bgColor: "bg-warning-500/10",
      trend: "up"
    },
    {
      title: "Amigos",
      value: "24",
      change: "+3",
      icon: Users,
      color: "text-brand-600",
      bgColor: "bg-brand-500/10",
      trend: "up"
    }
  ]

  const componentShowcase = [
    {
      name: "Header Moderno",
      description: "Navigation responsiva com mobile menu",
      status: "✅ Implementado",
      improvements: ["Mobile-first design", "Backdrop blur", "Smooth transitions"]
    },
    {
      name: "HeroSection",
      description: "Landing page com gradientes sutis",
      status: "✅ Implementado", 
      improvements: ["Trust indicators", "Modern badges", "Improved CTA"]
    },
    {
      name: "Dashboard Sidebar",
      description: "Navegação lateral com progresso",
      status: "✅ Implementado",
      improvements: ["User progress", "Quick stats", "Modern icons"]
    },
    {
      name: "ActivePools Cards",
      description: "Cards de bolões com trending badges",
      status: "✅ Implementado",
      improvements: ["Status indicators", "Progress bars", "Action buttons"]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-50/30 via-transparent to-success-50/20 dark:from-brand-900/10 dark:to-success-900/5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-success-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium border-brand-200 bg-brand-50/50 text-brand-700 dark:border-brand-800 dark:bg-brand-900/20 dark:text-brand-300">
              <Sparkles className="h-4 w-4" />
              <span>Fase 3 Concluída - Componentes Refatorados</span>
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Design System{" "}
              <span className="text-gradient-brand relative">
                Modernizado
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-brand rounded-full opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sistema completo refatorado com componentes modernos, responsivos e acessíveis
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="brand" size="lg" className="shadow-medium">
                <CheckCircle className="mr-2 h-5 w-5" />
                Ver Implementação
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="hover:shadow-soft">
                <BarChart3 className="mr-2 h-5 w-5" />
                Métricas de Performance
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Stats Grid Moderno */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Resultados da Refatoração
            </h2>
            <p className="text-lg text-muted-foreground">
              Métricas de melhoria após a implementação do novo design system
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modernStats.map((stat, index) => (
              <Card 
                key={stat.title}
                className="relative overflow-hidden hover:shadow-medium transition-normal group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-success-500/3 opacity-0 group-hover:opacity-100 transition-normal"></div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-normal`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Componentes Implementados */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Componentes Refatorados
            </h2>
            <p className="text-lg text-muted-foreground">
              Todos os componentes principais foram modernizados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {componentShowcase.map((component, index) => (
              <Card key={component.name} className="hover:shadow-medium transition-normal">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{component.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {component.description}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-success-50 text-success border-success-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Concluído
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">Melhorias:</h4>
                    <ul className="space-y-2">
                      {component.improvements.map((improvement, i) => (
                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-brand-500 rounded-full mr-3"></div>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sistema de Cores */}
        <section>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Sistema de Cores Simplificado</CardTitle>
              <CardDescription>
                De 40+ variáveis para 12 principais - Redução de 70%
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Brand Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Brand Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <div className="w-full h-20 bg-brand-500 rounded-xl shadow-soft"></div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Brand Primary</p>
                      <p className="text-xs text-muted-foreground">#0284c7</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-20 bg-brand-600 rounded-xl shadow-soft"></div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Brand Dark</p>
                      <p className="text-xs text-muted-foreground">#0c4a6e</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-20 bg-gradient-brand rounded-xl shadow-soft"></div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Brand Gradient</p>
                      <p className="text-xs text-muted-foreground">Linear gradient</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Status Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-3">
                    <div className="w-full h-16 bg-success rounded-xl shadow-soft"></div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Success</p>
                      <p className="text-xs text-muted-foreground">#22c55e</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-16 bg-warning rounded-xl shadow-soft"></div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Warning</p>
                      <p className="text-xs text-muted-foreground">#f59e0b</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-16 bg-error rounded-xl shadow-soft"></div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Error</p>
                      <p className="text-xs text-muted-foreground">#ef4444</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-16 bg-neutral-500 rounded-xl shadow-soft"></div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Neutral</p>
                      <p className="text-xs text-muted-foreground">#737373</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Componentes UI */}
        <section>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Componentes Modernizados</CardTitle>
              <CardDescription>
                Botões, badges e elementos interativos com novo design
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Botões</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="brand">Brand</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Badges</h3>
                <div className="flex flex-wrap gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Progresso</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Implementação</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Testes</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sistema de Sombras */}
        <section>
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-2xl">Sistema de Sombras</CardTitle>
              <CardDescription>
                5 níveis de elevação para criar profundidade moderna
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { name: "Subtle", class: "shadow-subtle" },
                  { name: "Soft", class: "shadow-soft" },
                  { name: "Medium", class: "shadow-medium" },
                  { name: "Strong", class: "shadow-strong" },
                  { name: "Dramatic", class: "shadow-dramatic" }
                ].map((shadow) => (
                  <div key={shadow.name} className="text-center">
                    <div className={`h-24 bg-card rounded-xl ${shadow.class} flex items-center justify-center mb-3 hover:scale-105 transition-normal`}>
                      <span className="text-sm font-medium text-muted-foreground">{shadow.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{shadow.class}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}