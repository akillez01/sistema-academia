import { cn } from "@/lib/utils"
import { BarChart3, Calendar, CreditCard, DollarSign, Dumbbell, Home, Settings, UserCheck, Users } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Membros", href: "#", icon: Users, current: false },
  { name: "Planos", href: "#", icon: CreditCard, current: false },
  { name: "Equipamentos", href: "#", icon: Dumbbell, current: false },
  { name: "Instrutores", href: "#", icon: UserCheck, current: false },
  { name: "Aulas", href: "#", icon: Calendar, current: false },
  { name: "Financeiro", href: "#", icon: DollarSign, current: false },
  { name: "Relatórios", href: "#", icon: BarChart3, current: false },
  { name: "Configurações", href: "#", icon: Settings, current: false },
]

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-background border-r">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">GymAdmin</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              item.current
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
            )}
          >
            <item.icon
              className={cn(
                item.current ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                "mr-3 h-5 w-5 flex-shrink-0",
              )}
            />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}