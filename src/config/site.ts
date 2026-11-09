/**
 * Configurações centrais do negócio.
 * Todos os valores comerciais ainda não definidos ficam vazios/null
 * e a interface se adapta (sem inventar dados).
 */
export const siteConfig = {
  name: "Sua Marca",
  tagline: "Monte o plano ideal para você",
  description:
    "Escolha o que você precisa, veja o resumo do seu plano e fale com a nossa equipe pelo WhatsApp.",
  /** Número comercial no formato internacional, só dígitos (ex.: 5511999999999). Vazio = não configurado. */
  whatsappNumber: "",
  contactEmail: "",
  currency: "BRL",
};

export const navLinks = [
  { label: "Solução", href: "/#solucao" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Planos", href: "/#planos" },
  { label: "Dúvidas", href: "/#faq" },
] as const;
