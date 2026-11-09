import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/planos")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader title="Planos" description="Planos base e recursos oferecidos." />
      <EmptyState icon={Boxes} title="Gestão de planos em breve" text="Por enquanto, os planos são definidos na configuração do site. A edição pelo painel virá numa próxima etapa." />
    </>
  );
}
