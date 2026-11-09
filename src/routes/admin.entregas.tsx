import { createFileRoute } from "@tanstack/react-router";
import { Truck } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/entregas")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader title="Entregas" description="Acompanhe o que precisa ser entregue a cada cliente." />
      <EmptyState icon={Truck} title="Nenhuma entrega cadastrada" text="As entregas dos clientes aparecerão aqui." />
    </>
  );
}
