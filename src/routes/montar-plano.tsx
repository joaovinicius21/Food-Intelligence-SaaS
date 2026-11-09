import { createFileRoute } from "@tanstack/react-router";
import { PlanBuilderForm } from "@/components/forms/PlanBuilderForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/montar-plano")({
  validateSearch: (s: Record<string, unknown>): { plano?: string } => ({
    plano: typeof s.plano === "string" ? s.plano : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Monte seu plano — ${siteConfig.name}` },
      { name: "description", content: "Escolha seu plano base, adicione recursos e envie sua solicitação pelo WhatsApp." },
      { property: "og:title", content: `Monte seu plano — ${siteConfig.name}` },
      { property: "og:description", content: "Escolha seu plano base, adicione recursos e envie sua solicitação pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlanBuilderPage,
});

function PlanBuilderPage() {
  const { plano } = Route.useSearch();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container-page py-12 md:py-16">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Monte seu plano</h1>
          <p className="mt-3 text-muted-foreground">Escolha o que precisa, revise o resumo e fale com a nossa equipe.</p>
        </div>
        <PlanBuilderForm initialPlan={plano} />
      </main>
      <SiteFooter />
    </div>
  );
}
