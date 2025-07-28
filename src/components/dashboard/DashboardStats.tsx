import { Trophy, Target, TrendingUp, Users, Award, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    title: "Bolões Ativos",
    value: "3",
    description: "Participando atualmente",
    icon: Target,
    trend: "+1 esta semana",
    trendUp: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total de Pontos",
    value: "1,247",
    description: "Pontos acumulados",
    icon: Trophy,
    trend: "+89 esta semana",
    trendUp: true,
    color: "text-brand-600",
    bgColor: "bg-brand-500/10",
  },
  {
    title: "Posição no Ranking",
    value: "#12",
    description: "Entre 156 jogadores",
    icon: Award,
    trend: "↑3 posições",
    trendUp: true,
    color: "text-success",
    bgColor: "bg-success-500/10",
  },
  {
    title: "Taxa de Acerto",
    value: "68%",
    description: "Últimos 30 palpites",
    icon: TrendingUp,
    trend: "+5% este mês",
    trendUp: true,
    color: "text-success",
    bgColor: "bg-success-500/10",
  },
  {
    title: "Amigos Convidados",
    value: "8",
    description: "Participando dos bolões",
    icon: Users,
    trend: "+2 esta semana",
    trendUp: true,
    color: "text-brand-600",
    bgColor: "bg-brand-500/10",
  },
  {
    title: "Próximos Jogos",
    value: "5",
    description: "Para palpitar hoje",
    icon: Calendar,
    trend: "2 em andamento",
    trendUp: false,
    color: "text-brand-600",
    bgColor: "bg-brand-500/10",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title} 
          className="relative overflow-hidden hover:shadow-medium transition-normal hover:scale-[1.02] animate-fade-in group"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Subtle Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-success-500/3 opacity-0 group-hover:opacity-100 transition-normal"></div>
          
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor} transition-fast group-hover:scale-110`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground transition-fast">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="flex items-center gap-1">
                <Badge 
                  variant={stat.trendUp ? "default" : "secondary"} 
                  className={`text-xs transition-fast ${
                    stat.trendUp 
                      ? "bg-success-500/20 text-success-700 dark:text-success-300 border-success-500/30 hover:bg-success-500/30" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stat.trend}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
