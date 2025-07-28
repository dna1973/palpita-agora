import { 
  Home, 
  Trophy, 
  Target,
  TrendingUp,
  Settings,
  Award,
  BarChart3,
  LogOut,
  User,
  HelpCircle
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/dashboard",
    isActive: true
  },
  {
    title: "Meus Bolões",
    icon: Trophy,
    url: "/dashboard/pools",
    badge: "3"
  },
  {
    title: "Ranking",
    icon: Award,
    url: "/dashboard/ranking"
  },
  {
    title: "Estatísticas",
    icon: BarChart3,
    url: "/dashboard/stats"
  }
]

const quickStats = [
  {
    title: "Bolões Ativos",
    value: "3",
    icon: Target,
    color: "text-brand-600",
    bgColor: "bg-brand-500/10",
    trend: "+1"
  },
  {
    title: "Posição Geral",
    value: "#12",
    icon: TrendingUp,
    color: "text-success",
    bgColor: "bg-success-500/10",
    trend: "↑3"
  }
]

export function DashboardSidebar() {
  const { user, isAdmin, signOut } = useAuth()

  return (
    <Sidebar variant="inset" className="border-r shadow-soft z-40">
      <SidebarHeader className="border-b bg-gradient-to-r from-brand-50/50 to-success-50/30 dark:from-brand-900/20 dark:to-success-900/10">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-brand shadow-soft">
            <Trophy className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gradient-brand">Palpita Agora</span>
            <span className="text-xs text-muted-foreground">Dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 flex flex-col h-full">
        {/* Menu Principal */}
        <SidebarGroup className="flex-none">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={item.isActive}
                    className={`w-full justify-start rounded-lg transition-normal hover:shadow-soft ${
                      item.highlight ? 'bg-gradient-brand text-white hover:bg-gradient-brand/90' : ''
                    } ${item.isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300' : ''}`}
                  >
                    <a href={item.url} className="flex items-center gap-3 p-2">
                      <item.icon className={`h-4 w-4 ${item.highlight ? 'text-white' : ''}`} />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Estatísticas Rápidas */}
        <SidebarGroup className="flex-none mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Estatísticas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2">
              {quickStats.map((stat) => (
                <div 
                  key={stat.title} 
                  className="flex items-center gap-3 p-2 rounded-lg bg-card border hover:shadow-soft transition-normal"
                >
                  <div className={`p-1.5 rounded-md ${stat.bgColor}`}>
                    <stat.icon className={`h-3 w-3 ${stat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                      <span className="text-xs font-medium text-success-600 dark:text-success-400">{stat.trend}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Progresso do Usuário */}
        <SidebarGroup className="flex-none mt-4">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Progresso
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3 rounded-lg bg-gradient-to-br from-success-50 to-brand-50 dark:from-success-900/20 dark:to-brand-900/20 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Nível 3</span>
                <Badge variant="outline" className="text-xs">68%</Badge>
              </div>
              <Progress value={68} className="h-2 mb-1" />
              <p className="text-xs text-muted-foreground">
                32% para próximo nível
              </p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Spacer para empurrar o footer para baixo */}
        <div className="flex-1"></div>
      </SidebarContent>

      <SidebarFooter className="border-t bg-muted/30 p-3 flex-none">
        {/* Perfil do Usuário */}
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-card transition-fast">
          <Avatar className="h-8 w-8 shadow-soft">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Usuário" />
            <AvatarFallback className="bg-gradient-brand text-white font-semibold text-xs">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">
              {user?.email?.split('@')[0] || 'Usuário'}
            </p>
            <div className="flex items-center gap-1">
              <p className="text-xs text-muted-foreground truncate">
                {isAdmin ? 'Admin' : 'Usuário'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            
            {/* Menu do Usuário */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:shadow-soft">
                  <Settings className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-medium">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ajuda
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-error hover:text-error hover:bg-error-50 dark:hover:bg-error-900/20"
                  onClick={signOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
