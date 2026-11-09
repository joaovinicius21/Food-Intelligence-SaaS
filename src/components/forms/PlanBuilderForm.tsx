import { Check, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { planFeatures, planOptions } from "@/config/plans";
import { buildWhatsAppMessage, buildWhatsAppUrl, estimatePrice, formatPrice } from "@/lib/plan";
import { cn } from "@/lib/utils";
import type { PlanRequest } from "@/types/plan";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
});

function StepTitle({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-lg font-semibold">
      <span className="grid size-7 place-items-center rounded-full bg-primary text-xs text-primary-foreground">{n}</span>
      {title}
    </h2>
  );
}

export function PlanBuilderForm({ initialPlan }: { initialPlan?: string }) {
  const [optionId, setOptionId] = useState<string | null>(
    planOptions.some((p) => p.id === initialPlan) ? initialPlan! : null,
  );
  const [featureIds, setFeatureIds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const estimate = useMemo(() => estimatePrice({ optionId, featureIds }), [optionId, featureIds]);
  const option = planOptions.find((o) => o.id === optionId);

  const toggleFeature = (id: string) =>
    setFeatureIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!optionId) {
      toast.error("Escolha um plano base.");
      return;
    }
    const parsed = contactSchema.safeParse(contact);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const request: PlanRequest = { optionId, featureIds, notes: notes.slice(0, 1000), contact: parsed.data as PlanRequest["contact"] };
    // TODO (próxima etapa): salvar a solicitação no Lovable Cloud antes de redirecionar.
    const url = buildWhatsAppUrl(buildWhatsAppMessage(request));
    if (!url) {
      toast.warning("O WhatsApp comercial ainda não foi configurado.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-10">
        <section>
          <StepTitle n={1} title="Escolha o plano base" />
          <div className="grid gap-3 sm:grid-cols-3">
            {planOptions.map((p) => (
              <button
                type="button"
                key={p.id}
                onClick={() => setOptionId(p.id)}
                className={cn(
                  "rounded-2xl border bg-card p-4 text-left shadow-soft transition-all",
                  optionId === p.id ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/40",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{p.name}</span>
                  {optionId === p.id && <Check className="size-4 text-primary" />}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section>
          <StepTitle n={2} title="Adicione recursos" />
          <div className="grid gap-3 sm:grid-cols-2">
            {planFeatures.map((f) => {
              const active = featureIds.includes(f.id);
              return (
                <button
                  type="button"
                  key={f.id}
                  onClick={() => toggleFeature(f.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border bg-card p-4 text-left transition-all",
                    active ? "border-primary bg-secondary" : "hover:border-primary/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border",
                      active && "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {active && <Check className="size-3.5" />}
                  </span>
                  <span>
                    <span className="block font-medium">{f.name}</span>
                    <span className="text-sm text-muted-foreground">{f.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <StepTitle n={3} title="Necessidades adicionais" />
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Conte o que mais você precisa (opcional)"
            className="bg-card"
          />
        </section>

        <section>
          <StepTitle n={4} title="Seus dados" />
          <div className="grid gap-4 sm:grid-cols-2">
            {(
              [
                ["name", "Nome", "text", "Seu nome completo"],
                ["phone", "WhatsApp", "tel", "(00) 00000-0000"],
                ["email", "E-mail", "email", "voce@email.com"],
              ] as const
            ).map(([key, label, type, ph]) => (
              <div key={key} className={cn("space-y-2", key === "email" && "sm:col-span-2")}>
                <Label htmlFor={key}>{label}</Label>
                <Input
                  id={key}
                  type={type}
                  placeholder={ph}
                  value={contact[key]}
                  onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
                  className="h-11 bg-card"
                />
                {errors[key] && <p className="text-xs text-destructive">{errors[key]}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border bg-card p-6 shadow-elevated">
          <h3 className="font-semibold">Resumo do plano</h3>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Plano base</dt>
              <dd className="mt-1 font-medium">{option?.name ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Recursos</dt>
              <dd className="mt-1 font-medium">
                {featureIds.length
                  ? planFeatures.filter((f) => featureIds.includes(f.id)).map((f) => f.name).join(", ")
                  : "Nenhum"}
              </dd>
            </div>
            <div className="border-t pt-4">
              <dt className="text-muted-foreground">Estimativa</dt>
              <dd className="mt-1 text-xl font-semibold">
                {estimate !== null ? formatPrice(estimate) : <span className="text-base">Sob consulta</span>}
              </dd>
            </div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 h-12 w-full">
            <MessageCircle className="size-4" /> Enviar pelo WhatsApp
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Sem compromisso. Você conclui com a nossa equipe.</p>
        </div>
      </aside>
    </form>
  );
}
