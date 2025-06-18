import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    user: "João Silva",
    action: "Check-in realizado",
    time: "2 min atrás",
    type: "checkin",
  },
  {
    id: 2,
    user: "Maria Santos",
    action: "Plano renovado",
    time: "15 min atrás",
    type: "payment",
  },
  {
    id: 3,
    user: "Pedro Costa",
    action: "Novo membro cadastrado",
    time: "1h atrás",
    type: "signup",
  },
  {
    id: 4,
    user: "Ana Oliveira",
    action: "Aula agendada",
    time: "2h atrás",
    type: "booking",
  },
  {
    id: 5,
    user: "Carlos Lima",
    action: "Check-out realizado",
    time: "3h atrás",
    type: "checkout",
  },
]

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    activity.type === "checkin"
                      ? "default"
                      : activity.type === "payment"
                        ? "secondary"
                        : activity.type === "signup"
                          ? "outline"
                          : "secondary"
                  }
                  className="mb-1"
                >
                  {activity.type === "checkin"
                    ? "Check-in"
                    : activity.type === "payment"
                      ? "Pagamento"
                      : activity.type === "signup"
                        ? "Cadastro"
                        : activity.type === "booking"
                          ? "Agendamento"
                          : "Check-out"}
                </Badge>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
