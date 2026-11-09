import type { PlanFeature, PlanOption } from "@/types/plan";

/**
 * Estrutura inicial dos planos. Nomes e descrições são genéricos e
 * devem ser substituídos pela oferta real. Preços ficam null até serem definidos.
 */
export const planOptions: PlanOption[] = [
  { id: "essencial", name: "Essencial", description: "Para começar com o básico.", basePrice: null },
  { id: "profissional", name: "Profissional", description: "Para quem precisa de mais recursos.", basePrice: null },
  { id: "completo", name: "Completo", description: "Tudo o que oferecemos, sob medida.", basePrice: null },
];

export const planFeatures: PlanFeature[] = [
  { id: "recurso-1", name: "Recurso 1", description: "Descrição do recurso a definir.", price: null },
  { id: "recurso-2", name: "Recurso 2", description: "Descrição do recurso a definir.", price: null },
  { id: "recurso-3", name: "Recurso 3", description: "Descrição do recurso a definir.", price: null },
  { id: "recurso-4", name: "Recurso 4", description: "Descrição do recurso a definir.", price: null },
];
