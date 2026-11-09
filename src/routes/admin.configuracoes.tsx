import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "lucide-react";
import { EmptyState, PageHeader } from "@/components/admin/AdminUI";

export const Route = createFileRoute("/admin/configuracoes")({ component: Page });

function Page() {
  return (
    <>
      <PageHeader title="Configurações" description="Dados do negócio e WhatsApp comercial." />
      <EmptyState icon={Settings} title="Configurações em breve" text="O número do WhatsApp e os dados do negócio poderão ser editados aqui após conectar o banco de dados." />
    </>
  );
}
