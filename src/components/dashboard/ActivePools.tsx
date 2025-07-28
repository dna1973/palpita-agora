import { useState } from "react"
import { Trophy, Users, Calendar, Clock, MoreHorizontal, Star, TrendingUp, Target, Award, Plus, Edit, Trash2, Copy, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { usePools, PoolData } from "@/hooks/usePools"
import { CreatePoolModal } from "./CreatePoolModal"
import { JoinPoolModal } from "./JoinPoolModal"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { format, differenceInDays } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ActivePoolsProps {
  showAll?: boolean
}

export function ActivePools({ showAll = false }: ActivePoolsProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [joinModalOpen, setJoinModalOpen] = useState(false)
  const { userPools, isLoadingUserPools, deletePool, isDeletingPool } = usePools()
  const { toast } = useToast()
  const { user } = useAuth()

  const displayPools = showAll ? userPools : userPools?.slice(0, 2)

  const copyInviteCode = (inviteCode: string) => {
    navigator.clipboard.writeText(inviteCode)
    toast({
      title: "Código copiado!",
      description: "O código de convite foi copiado para a área de transferência.",
    })
  }

  const handleDeletePool = (poolId: string, poolName: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o bolão "${poolName}"?`)) {
      deletePool(poolId)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Rascunho</Badge>
      case 'open':
        return <Badge variant="default">Aberto</Badge>
      case 'active':
        return <Badge variant="default" className="bg-green-500">Ativo</Badge>
      case 'finished':
        return <Badge variant="outline">Finalizado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR })
  }

  const calculateDaysLeft = (endDate?: string) => {
    if (!endDate) return 0
    return Math.max(0, differenceInDays(new Date(endDate), new Date()))
  }

  const calculateProgress = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()
    const total = differenceInDays(end, start)
    const elapsed = differenceInDays(now, start)
    return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)))
  }

  if (isLoadingUserPools) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-brand-600" />
              Meus Bolões
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto mb-2"></div>
              <p className="text-muted-foreground">Carregando bolões...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!userPools || userPools.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-brand-600" />
              Meus Bolões
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setJoinModalOpen(true)}>
                <Users className="h-4 w-4 mr-2" />
                Entrar
              </Button>
              <Button size="sm" onClick={() => setCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum bolão encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Crie seu primeiro bolão ou entre em um existente
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => setCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Bolão
              </Button>
              <Button variant="outline" onClick={() => setJoinModalOpen(true)}>
                <Users className="h-4 w-4 mr-2" />
                Entrar em Bolão
              </Button>
            </div>
          </div>
        </CardContent>
        <CreatePoolModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
        <JoinPoolModal open={joinModalOpen} onOpenChange={setJoinModalOpen} />
      </Card>
    )
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "ending_soon":
        return {
          variant: "destructive" as const,
          label: "Encerrando",
          color: "text-error"
        }
      case "active":
        return {
          variant: "default" as const,
          label: "Ativo",
          color: "text-success"
        }
      default:
        return {
          variant: "secondary" as const,
          label: "Inativo",
          color: "text-muted-foreground"
        }
    }
  }

  const getPositionIcon = (position: number) => {
    if (position === 1) return <Award className="h-4 w-4 text-warning-600 dark:text-warning-400" />
    if (position <= 3) return <Trophy className="h-4 w-4 text-brand-600" />
    return <Target className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Trophy className="h-5 w-5 text-brand-600" />
          Bolões Ativos
        </CardTitle>
        {!showAll && (
          <Button variant="ghost" size="sm" className="hover:shadow-soft">
            Ver todos
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {displayPools.map((pool) => {
          const statusConfig = getStatusConfig(pool.status)
          
          return (
            <Card key={pool.id} className="relative overflow-hidden hover:shadow-medium transition-normal border-l-4 border-l-brand-500">
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground">{pool.name}</h3>
                      <Badge 
                        variant={statusConfig.variant}
                        className="text-xs font-medium"
                      >
                        {statusConfig.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {pool.status === 'active' ? 'Ativo' : pool.status === 'open' ? 'Aberto' : 'Rascunho'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{pool.description}</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:shadow-soft">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="shadow-medium">
                      <DropdownMenuItem className="cursor-pointer">Ver detalhes</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Fazer palpite</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Convidar amigos</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Users className="h-4 w-4 text-brand-600" />
                    <div>
                      <p className="text-sm font-medium">{pool.participant_count || 0}/{pool.max_participants || 'Ilimitado'}</p>
                      <p className="text-xs text-muted-foreground">Participantes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    {getPositionIcon(1)}
                    <div>
                      <p className="text-sm font-medium">#1</p>
                      <p className="text-xs text-muted-foreground">Sua posição</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Calendar className="h-4 w-4 text-brand-600" />
                    <div>
                      <p className="text-sm font-medium">{calculateDaysLeft(pool.end_date)} dias</p>
                      <p className="text-xs text-muted-foreground">Restantes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <Star className="h-4 w-4 text-success-600 dark:text-success-400" />
                    <div>
                      <p className="text-sm font-medium">0</p>
                      <p className="text-xs text-muted-foreground">Seus pontos</p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">Progresso do Campeonato</span>
                    <span className="text-sm font-bold text-brand-600">{calculateProgress(pool.start_date, pool.end_date)}%</span>
                  </div>
                  <Progress value={calculateProgress(pool.start_date, pool.end_date)} className="h-2" />
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {/* Avatars mockados por enquanto */}
                      <Avatar className="h-7 w-7 border-2 border-background shadow-soft">
                        <AvatarFallback className="text-xs font-medium bg-gradient-brand text-white">
                          U
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="h-7 w-7 border-2 border-background shadow-soft">
                        <AvatarFallback className="text-xs font-medium bg-gradient-brand text-white">
                          A
                        </AvatarFallback>
                      </Avatar>
                      {(pool.participant_count || 0) > 2 && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted border-2 border-background text-xs font-medium shadow-soft">
                          +{(pool.participant_count || 0) - 2}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">participantes</span>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-success-600 dark:text-success-400">
                      {pool.prize_amount ? `R$ ${pool.prize_amount.toFixed(2)}` : 'Sem prêmio'}
                    </p>
                    <p className="text-xs text-muted-foreground">Prêmio total</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button variant="brand" size="sm" className="flex-1 shadow-soft">
                    <Trophy className="h-4 w-4 mr-2" />
                    Fazer Palpite
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 hover:shadow-soft">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Ver Ranking
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {displayPools.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Nenhum bolão ativo</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Crie seu primeiro bolão ou participe de um existente para começar a competir com seus amigos
            </p>
            <Button variant="brand" className="shadow-soft" onClick={() => setCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Bolão
            </Button>
          </div>
        )}
      </CardContent>
      
      {/* Modais */}
      <CreatePoolModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
      <JoinPoolModal open={joinModalOpen} onOpenChange={setJoinModalOpen} />
    </Card>
  )
}
