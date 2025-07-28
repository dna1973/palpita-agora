import { Clock, Trophy, Target, Users, TrendingUp, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentActivityProps {
  showAll?: boolean
}

const activities = [
  {
    id: 1,
    type: "prediction",
    title: "Palpite realizado",
    description: "Brasil x Argentina - Copa do Mundo",
    time: "2 horas atrás",
    icon: Target,
    color: "text-brand-600",
    bgColor: "bg-brand-500/10",
    status: "pending",
    details: "Brasil 2x1 Argentina",
  },
  {
    id: 2,
    type: "points",
    title: "Pontos ganhos",
    description: "Acertou o placar exato",
    time: "5 horas atrás",
    icon: Trophy,
    color: "text-success",
    bgColor: "bg-success-500/10",
    status: "success",
    details: "+15 pontos",
  },
  {
    id: 3,
    type: "ranking",
    title: "Subiu no ranking",
    description: "Copa do Mundo 2024",
    time: "1 dia atrás",
    icon: TrendingUp,
    color: "text-brand-600",
    bgColor: "bg-brand-500/10",
    status: "success",
    details: "15º → 12º posição",
  },
  {
    id: 4,
    type: "invite",
    title: "Amigo convidado",
    description: "Pedro Silva entrou no bolão",
    time: "2 dias atrás",
    icon: Users,
    color: "text-brand-600",
    bgColor: "bg-brand-500/10",
    status: "info",
    details: "Brasileirão 2024",
    avatar: "/avatar-pedro.jpg",
  },
  {
    id: 5,
    type: "achievement",
    title: "Conquista desbloqueada",
    description: "Primeira vitória no bolão",
    time: "3 dias atrás",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success-500/10",
    status: "success",
    details: "Champions League",
  },
  {
    id: 6,
    type: "prediction",
    title: "Palpite realizado",
    description: "Real Madrid x Barcelona",
    time: "4 dias atrás",
    icon: Target,
    color: "text-brand-600",
    bgColor: "bg-brand-500/10",
    status: "correct",
    details: "Real Madrid 3x1 Barcelona",
  },
]

export function RecentActivity({ showAll = false }: RecentActivityProps) {
  const displayActivities = showAll ? activities : activities.slice(0, 5)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="text-xs">Pendente</Badge>
      case "success":
        return <Badge variant="default" className="text-xs bg-success-500/20 text-success-700 dark:text-success-300 border-success-500/30">Sucesso</Badge>
      case "correct":
        return <Badge variant="default" className="text-xs bg-success-500/20 text-success-700 dark:text-success-300 border-success-500/30">Acertou</Badge>
      case "info":
        return <Badge variant="outline" className="text-xs">Info</Badge>
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-600" />
          Atividade Recente
        </CardTitle>
        {!showAll && (
          <Button variant="ghost" size="sm">
            Ver todas
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity, index) => (
            <div key={activity.id} className="flex items-start gap-3">
              {/* Ícone da atividade */}
              <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>

              {/* Conteúdo da atividade */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium">{activity.title}</h4>
                  {getStatusBadge(activity.status)}
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">
                  {activity.description}
                </p>
                
                {activity.details && (
                  <p className="text-sm font-medium text-foreground mb-1">
                    {activity.details}
                  </p>
                )}
                
                <div className="flex items-center gap-2">
                  {activity.avatar && (
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={activity.avatar} alt="Avatar" />
                      <AvatarFallback className="text-xs">P</AvatarFallback>
                    </Avatar>
                  )}
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              </div>

              {/* Linha de conexão (exceto no último item) */}
              {index < displayActivities.length - 1 && (
                <div className="absolute left-[22px] mt-10 h-6 w-px bg-border" />
              )}
            </div>
          ))}
        </div>

        {displayActivities.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Nenhuma atividade recente</h3>
            <p className="text-sm text-muted-foreground">
              Suas atividades aparecerão aqui
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
