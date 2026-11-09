import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/lembretes")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader title="Lembretes" description="Follow-ups e tarefas importantes." />
      <EmptyState icon={Bell} title="Nenhum lembrete" text="Crie lembretes para não perder nenhum contato." />
    </>
  );
}
