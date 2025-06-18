import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Membros Ativos",
    value: "1,234",
    change: "+12%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Receita Mensal",
    value: "R$ 45.231",
    change: "+8%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Check-ins Hoje",
    value: "89",
    change: "+23%",
    changeType: "positive",
    icon: Activity,
  },
  {
    title: "Taxa de Retenção",
    value: "94.5%",
    change: "+2%",
    changeType: "positive",
    icon: TrendingUp,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
