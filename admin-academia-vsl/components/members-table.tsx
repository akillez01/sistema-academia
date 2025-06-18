"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

// Função para buscar membros reais da API
async function fetchMembers() {
  try {
    console.log("Buscando membros da API...")
    const res = await fetch("http://localhost:3001/api/users")
    if (!res.ok) {
      console.error("Erro ao buscar membros:", res.status, res.statusText)
      return []
    }
    const users = await res.json()
    console.log("Membros encontrados:", users.length, users)
    return users
  } catch (error) {
    console.error("Erro ao buscar membros:", error)
    return []
  }
}

export function MembersTable({ reload }: { reload?: number }) {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchMembers()
      .then(users => {
        setMembers(users)
        setLoading(false)
      })
      .catch(err => {
        console.error("Erro no useEffect:", err)
        setLoading(false)
      })
  }, [reload])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Membro</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Entrada</TableHead>
            <TableHead>Última Visita</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder-user.jpg`} />
                    <AvatarFallback>
                      {(member.nome || member.name || "?")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.nome || member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={member.plan === "VIP" ? "default" : member.plan === "Premium" ? "secondary" : "outline"}
                >
                  {member.plan || "-"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={member.status === "Ativo" ? "default" : "destructive"}>{member.status || "-"}</Badge>
              </TableCell>
              <TableCell>{member.joinDate || "-"}</TableCell>
              <TableCell>{member.lastVisit || "-"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
