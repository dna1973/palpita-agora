import { Award, TrendingUp, TrendingDown, Minus, Crown, Medal, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface UserRankingProps {
  showAll?: boolean
}

const rankings = [
  {
    position: 1,
    name: "Maria Silva",
    avatar: "/avatar-maria.jpg",
    points: 1456,
    change: "up",
    changeValue: 2,
    accuracy: 78,
    pools: 5,
    isCurrentUser: false,
  },
  {
    position: 2,
    name: "Carlos Santos",
    avatar: "/avatar-carlos.jpg",
    points: 1398,
    change: "down",
    changeValue: 1,
    accuracy: 75,
    pools: 4,
    isCurrentUser: false,
  },
  {
    position: 3,
    name: "Ana Costa",
    avatar: "/avatar-ana.jpg",
    points: 1367,
    change: "up",
    changeValue: 3,
    accuracy: 72,
    pools: 6,
    isCurrentUser: false,
  },
  {
    position: 4,
    name: "Pedro Lima",
    avatar: "/avatar-pedro.jpg",
    points: 1298,
    change: "same",
    changeValue: 0,
    accuracy: 69,
    pools: 3,
    isCurrentUser: false,
  },
  {
    position: 5,
    name: "Sofia Oliveira",
    avatar: "/avatar-sofia.jpg",
    points: 1267,
    change: "up",
    changeValue: 1,
    accuracy: 71,
    pools: 4,
    isCurrentUser: false,
  },
  {
    position: 12,
    name: "João Silva (Você)",
    avatar: "/avatar-joao.jpg",
    points: 1247,
    change: "up",
    changeValue: 3,
    accuracy: 68,
    pools: 3,
    isCurrentUser: true,
  },
]

export function UserRanking({ showAll = false }: UserRankingProps) {
  const displayRankings = showAll ? rankings : rankings.slice(0, 5)
  const currentUser = rankings.find(user => user.isCurrentUser)

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-4 w-4 text-warning" />
      case 2:
        return <Medal className="h-4 w-4 text-neutral-500" />
      case 3:
        return <Trophy className="h-4 w-4 text-success" />
      default:
        return <span className="text-sm font-semibold text-muted-foreground">#{position}</span>
    }
  }

  const getChangeIcon = (change: string, value: number) => {
    switch (change) {
      case "up":
        return (
          <div className="flex items-center gap-1 text-success-600 dark:text-success-400">
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs">+{value}</span>
          </div>
        )
      case "down":
        return (
          <div className="flex items-center gap-1 text-destructive">
            <TrendingDown className="h-3 w-3" />
            <span className="text-xs">-{value}</span>
          </div>
        )
      case "same":
        return (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Minus className="h-3 w-3" />
            <span className="text-xs">0</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Ranking Geral
        </CardTitle>
        {!showAll && (
          <Button variant="ghost" size="sm">
            Ver ranking completo
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sua posição atual (destaque) */}
        {currentUser && !showAll && (
          <div className="border-2 border-primary/20 rounded-lg p-4 bg-primary/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary">Sua Posição</span>
              <Badge variant="outline" className="border-primary text-primary">
                #{currentUser.position}
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{currentUser.name}</h4>
                  {getChangeIcon(currentUser.change, currentUser.changeValue)}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{currentUser.points} pontos</span>
                  <span>{currentUser.accuracy}% acerto</span>
                  <span>{currentUser.pools} bolões</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista do ranking */}
        <div className="space-y-3">
          {displayRankings.map((user) => (
            <div 
              key={user.position} 
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                user.isCurrentUser 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'hover:bg-muted/50'
              }`}
            >
              {/* Posição */}
              <div className="flex items-center justify-center w-8">
                {getRankIcon(user.position)}
              </div>

              {/* Avatar e Info */}
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className={`font-medium truncate ${user.isCurrentUser ? 'text-primary' : ''}`}>
                    {user.name}
                  </h4>
                  {getChangeIcon(user.change, user.changeValue)}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{user.points} pts</span>
                  <span>{user.accuracy}% acerto</span>
                  <span>{user.pools} bolões</span>
                </div>
              </div>

              {/* Progresso de acurácia */}
              <div className="hidden sm:flex flex-col items-end gap-1 w-20">
                <span className="text-xs font-medium">{user.accuracy}%</span>
                <Progress value={user.accuracy} className="h-1 w-full" />
              </div>
            </div>
          ))}
        </div>

        {displayRankings.length === 0 && (
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Ranking vazio</h3>
            <p className="text-sm text-muted-foreground">
              Participe de bolões para aparecer no ranking
            </p>
          </div>
        )}

        {!showAll && displayRankings.length > 0 && (
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              Ver Ranking Completo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
