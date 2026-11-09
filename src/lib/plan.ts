import { planFeatures, planOptions } from "@/config/plans";
import { siteConfig } from "@/config/site";
import type { PlanRequest } from "@/types/plan";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: siteConfig.currency }).format(value);
}

/** Retorna a estimativa apenas se todos os itens escolhidos tiverem preço configurado. */
export function estimatePrice(req: Pick<PlanRequest, "optionId" | "featureIds">): number | null {
  const option = planOptions.find((o) => o.id === req.optionId);
  if (!option || option.basePrice === null) return null;
  let total = option.basePrice;
  for (const id of req.featureIds) {
    const f = planFeatures.find((x) => x.id === id);
    if (!f || f.price === null) return null;
    total += f.price;
  }
  return total;
}

export function buildWhatsAppMessage(req: PlanRequest): string {
  const option = planOptions.find((o) => o.id === req.optionId);
  const features = planFeatures.filter((f) => req.featureIds.includes(f.id));
  const estimate = estimatePrice(req);
  const lines = [
    `Olá! Montei meu plano no site da ${siteConfig.name}.`,
    "",
    `*Plano:* ${option?.name ?? "Não selecionado"}`,
    `*Recursos:* ${features.length ? features.map((f) => f.name).join(", ") : "Nenhum adicional"}`,
  ];
  if (req.notes.trim()) lines.push(`*Necessidades adicionais:* ${req.notes.trim()}`);
  if (estimate !== null) lines.push(`*Estimativa:* ${formatPrice(estimate)}`);
  lines.push("", `*Nome:* ${req.contact.name}`, `*E-mail:* ${req.contact.email}`, `*Telefone:* ${req.contact.phone}`);
  return lines.join("\n");
}

/** null quando o número comercial ainda não foi configurado. */
export function buildWhatsAppUrl(message: string): string | null {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
