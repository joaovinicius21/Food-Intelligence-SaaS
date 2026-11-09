export interface PlanOption {
  id: string;
  name: string;
  description: string;
  /** Preço base mensal. null = ainda não definido. */
  basePrice: number | null;
}

export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  /** Preço adicional. null = ainda não definido. */
  price: number | null;
}

export interface LeadContact {
  name: string;
  email: string;
  phone: string;
}

export interface PlanRequest {
  optionId: string | null;
  featureIds: string[];
  notes: string;
  contact: LeadContact;
}

export type LeadStatus = "novo" | "em_contato" | "convertido" | "perdido";
