import { createFileRoute } from "@tanstack/react-router";
import { Bell, LayoutDashboard, Truck, UserCheck, Users } from "lucide-react";
import { EmptyState, PageHeader, StatCard } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" description="Visão geral do seu negócio." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Leads" value="—" />
        <StatCard icon={UserCheck} label="Clientes" value="—" />
        <StatCard icon={Truck} label="Entregas pendentes" value="—" />
        <StatCard icon={Bell} label="Lembretes hoje" value="—" />
      </div>
      <div className="mt-8">
        <EmptyState
          icon={LayoutDashboard}
          title="Nenhum dado ainda"
          text="Os indicadores aparecerão aqui assim que o banco de dados for conectado e as primeiras solicitações chegarem."
        />
      </div>
    </>
  );
}
