import { createFileRoute } from "@tanstack/react-router";
import { UserCheck } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/clientes")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader title="Clientes" description="Leads que fecharam negócio." />
      <EmptyState icon={UserCheck} title="Nenhum cliente ainda" text="Converta leads em clientes para acompanhá-los aqui." />
    </>
  );
}
