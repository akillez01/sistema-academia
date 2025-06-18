"use client";
import { useState } from "react";
import Aulas from "./Aulas";
import Configuracoes from "./Configuracoes";
import Equipamentos from "./Equipamentos";
import Financeiro from "./Financeiro";
import { Header } from "./header";
import Instrutores from "./Instrutores";
import { MembersTable } from "./members-table";
import Membros from "./Membros";
import Planos from "./Planos";
import { RecentActivities } from "./recent-activities";
import Relatorios from "./Relatorios";
import { RevenueChart } from "./revenue-chart";
import { Sidebar } from "./sidebar";
import { StatsCards } from "./stats-cards";

const menuComponents: Record<string, JSX.Element> = {
  Dashboard: (
    <>
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MembersTable />
        </div>
        <div className="space-y-6">
          <RevenueChart />
          <RecentActivities />
        </div>
      </div>
    </>
  ),
  Membros: <Membros />, // tela de membros com cadastro
  Planos: <Planos />,
  Equipamentos: <Equipamentos />,
  Instrutores: <Instrutores />,
  Aulas: <Aulas />,
  Financeiro: <Financeiro />,
  Relatórios: <Relatorios />,
  Configurações: <Configuracoes />
};

export default function Dashboard() {
  const [selected, setSelected] = useState("Membros");
  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setSelected} selected={selected} />
      <div className="flex-1 flex flex-col bg-muted/40">
        <Header />
        <main className="flex-1 p-6 space-y-6">
          {menuComponents[selected]}
        </main>
      </div>
    </div>
  );
}
