import { Plus, Users, Target, Settings, Bell, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function QuickActions() {
  return (
    <div className="flex items-center gap-2">
      {/* Notificações */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>Notificações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
            <div className="flex items-center gap-2 w-full">
              <Target className="h-4 w-4 text-brand-600" />
              <span className="font-medium">Novo jogo disponível</span>
              <Badge variant="secondary" className="ml-auto text-xs">2h</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Brasil x Argentina - Faça seu palpite
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
            <div className="flex items-center gap-2 w-full">
              <Users className="h-4 w-4 text-success" />
              <span className="font-medium">Amigo entrou no bolão</span>
              <Badge variant="secondary" className="ml-auto text-xs">5h</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Pedro Silva entrou em "Copa do Mundo 2024"
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
            <div className="flex items-center gap-2 w-full">
              <Share2 className="h-4 w-4 text-brand-600" />
              <span className="font-medium">Resultado do jogo</span>
              <Badge variant="secondary" className="ml-auto text-xs">1d</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Você ganhou 15 pontos no palpite
            </p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center">
            Ver todas as notificações
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Menu de Ações Rápidas */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Ações Rápidas
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Ações Rápidas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2">
            <Plus className="h-4 w-4" />
            Criar Novo Bolão
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Target className="h-4 w-4" />
            Fazer Palpite
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Users className="h-4 w-4" />
            Convidar Amigos
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2">
            <Share2 className="h-4 w-4" />
            Compartilhar Bolão
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
