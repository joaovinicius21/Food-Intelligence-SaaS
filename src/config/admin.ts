import { Bell, Boxes, LayoutDashboard, Settings, Truck, UserCheck, Users } from "lucide-react";

export const adminNav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/clientes", label: "Clientes", icon: UserCheck },
  { to: "/admin/planos", label: "Planos", icon: Boxes },
  { to: "/admin/entregas", label: "Entregas", icon: Truck },
  { to: "/admin/lembretes", label: "Lembretes", icon: Bell },
  { to: "/admin/configuracoes", label: "Configurações", icon: Settings },
] as const;
