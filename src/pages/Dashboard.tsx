import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { ActivePools } from "@/components/dashboard/ActivePools"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { UserRanking } from "@/components/dashboard/UserRanking"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DashboardProps {
  defaultTab?: string
}

const Dashboard = ({ defaultTab = "overview" }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex h-screen">
          <DashboardSidebar />
          <SidebarInset className="flex-1 overflow-auto">
            <main className="p-6 space-y-6">
              {/* Cabeçalho do Dashboard */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                  <p className="text-muted-foreground">
                    Gerencie seus bolões e acompanhe seu desempenho
                  </p>
                </div>
                <QuickActions />
              </div>

              {/* Estatísticas Principais */}
              <DashboardStats />

              {/* Conteúdo Principal com Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="pools">Meus Bolões</TabsTrigger>
                  <TabsTrigger value="ranking">Ranking</TabsTrigger>
                  <TabsTrigger value="activity">Atividade</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ActivePools />
                    <RecentActivity />
                  </div>
                  <UserRanking />
                </TabsContent>

                <TabsContent value="pools" className="space-y-6">
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Meus Bolões</h2>
                    <ActivePools showAll />
                  </Card>
                </TabsContent>

                <TabsContent value="ranking" className="space-y-6">
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Ranking Geral</h2>
                    <UserRanking showAll />
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <Card className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Atividade Recente</h2>
                    <RecentActivity showAll />
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default Dashboard
