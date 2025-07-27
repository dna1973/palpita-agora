import { 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  Bell, 
  Trophy,
  Users,
  Target,
  Clock
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Dados em Tempo Real",
    description: "Informações atualizadas automaticamente da API oficial do futebol",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Plataforma Segura",
    description: "Sistema robusto com autenticação e proteção de dados",
    color: "text-success"
  },
  {
    icon: BarChart3,
    title: "Rankings Dinâmicos",
    description: "Acompanhe sua posição e evolução nos bolões",
    color: "text-primary"
  },
  {
    icon: Globe,
    title: "Ligas Mundiais",
    description: "Campeonatos do Brasil e do mundo na palma da sua mão",
    color: "text-success"
  },
  {
    icon: Bell,
    title: "Notificações Inteligentes",
    description: "Alertas personalizados para seus jogos favoritos",
    color: "text-primary"
  },
  {
    icon: Trophy,
    title: "Sistema de Pontuação",
    description: "Algoritmo justo que premia os melhores palpiteiros",
    color: "text-success"
  },
  {
    icon: Users,
    title: "Bolões Privados",
    description: "Crie grupos exclusivos com seus amigos",
    color: "text-primary"
  },
  {
    icon: Target,
    title: "Enquetes Interativas",
    description: "Vote em enquetes sobre seus times e jogadores favoritos",
    color: "text-success"
  },
  {
    icon: Clock,
    title: "Histórico Completo",
    description: "Acesse todo seu histórico de palpites e resultados",
    color: "text-primary"
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">
              Funcionalidades Exclusivas
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma completa desenvolvida para oferecer a melhor experiência 
            em bolões esportivos e enquetes interativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-elegant p-6 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-${feature.color.split('-')[1]}/10 to-${feature.color.split('-')[1]}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-primary font-medium">
              Pronto para começar a ganhar?
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}