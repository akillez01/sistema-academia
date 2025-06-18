"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita dos Últimos 6 Meses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-end justify-between gap-2">
          {[
            { month: "Jul", value: 35000, height: "60%" },
            { month: "Ago", value: 42000, height: "75%" },
            { month: "Set", value: 38000, height: "65%" },
            { month: "Out", value: 45000, height: "85%" },
            { month: "Nov", value: 41000, height: "70%" },
            { month: "Dez", value: 48000, height: "100%" },
          ].map((data, index) => (
            <div key={data.month} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-primary rounded-t-sm mb-2 min-h-[20px] flex items-end justify-center pb-2"
                style={{ height: data.height }}
              >
                <span className="text-xs text-primary-foreground font-medium">{(data.value / 1000).toFixed(0)}k</span>
              </div>
              <span className="text-sm text-muted-foreground">{data.month}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
