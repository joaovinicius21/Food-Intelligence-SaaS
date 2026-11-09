import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/leads")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader title="Leads" description="Solicitações recebidas pelo montador de planos." />
      <EmptyState icon={Users} title="Nenhum lead ainda" text="Quando visitantes enviarem um plano, eles aparecerão aqui." />
    </>
  );
}
