import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Header } from "./components/header"
import { MembersTable } from "./components/members-table"
import { RecentActivities } from "./components/recent-activities"
import { RevenueChart } from "./components/revenue-chart"
import { Sidebar } from "./components/sidebar"
import { StatsCards } from "./components/stats-cards"

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Visão geral da sua academia</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Membro
              </Button>
            </div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Charts and Activities */}
            <div className="grid gap-6 md:grid-cols-2">
              <RevenueChart />
              <RecentActivities />
            </div>

            {/* Members Table */}
            <Card>
              <CardHeader>
                <CardTitle>Membros Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <MembersTable />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
