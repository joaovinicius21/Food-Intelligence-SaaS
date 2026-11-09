import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  ListChecks,
  MessageCircle,
  Puzzle,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FeatureCard, Section } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { planOptions } from "@/config/plans";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/plan";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.name} — ${siteConfig.tagline}` },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: `${siteConfig.name} — ${siteConfig.tagline}` },
      { property: "og:description", content: siteConfig.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { icon: <SlidersHorizontal className="size-5" />, title: "Monte seu plano", text: "Escolha o plano base e os recursos que fazem sentido para você." },
  { icon: <ListChecks className="size-5" />, title: "Revise o resumo", text: "Veja tudo o que foi escolhido antes de enviar a solicitação." },
  { icon: <MessageCircle className="size-5" />, title: "Fale com a equipe", text: "Continue a conversa pelo WhatsApp e finalize com atendimento humano." },
];

const faqs = [
  { q: "Preciso pagar para montar meu plano?", a: "Não. Montar o plano e enviar a solicitação é gratuito e sem compromisso." },
  { q: "Como funciona a contratação?", a: "Depois de enviar seu plano, você é direcionado ao WhatsApp para tirar dúvidas e concluir com a nossa equipe." },
  { q: "Posso alterar o plano depois?", a: "Sim. Durante a conversa você pode ajustar recursos e necessidades antes de fechar." },
  { q: "E se eu não souber o que escolher?", a: "Descreva sua necessidade no campo de observações e a equipe ajuda a definir o melhor caminho." },
];

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="hero-glow relative overflow-hidden">
          <div className="container-page grid gap-12 py-20 md:py-32 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
                <Sparkles className="size-3.5 text-primary" /> Plano sob medida, sem complicação
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                Pague só pelo que você realmente precisa.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">{siteConfig.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="h-12 px-6 shadow-elevated">
                  <Link to="/montar-plano">
                    Montar meu plano <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6">
                  <a href="#como-funciona">Como funciona</a>
                </Button>
              </div>
            </div>
            <div className="fade-up rounded-3xl border bg-card p-6 shadow-elevated [animation-delay:150ms]">
              <p className="text-sm font-medium text-muted-foreground">Seu plano</p>
              <div className="mt-4 space-y-3">
                {["Escolha o plano base", "Adicione recursos", "Descreva necessidades", "Envie pelo WhatsApp"].map((t) => (
                  <div key={t} className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3 text-sm">
                    <CheckCircle2 className="size-4 text-primary" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Problema */}
        <Section
          eyebrow="O problema"
          title="Planos prontos raramente servem para todo mundo"
          subtitle="Você acaba pagando por recursos que não usa ou ficando sem o que realmente importa."
        >
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard icon={<Puzzle className="size-5" />} title="Pacotes engessados" text="Opções fixas que não se adaptam à sua realidade." />
            <FeatureCard icon={<Clock className="size-5" />} title="Processos demorados" text="Muitas etapas até conseguir uma proposta clara." />
            <FeatureCard icon={<HelpCircle className="size-5" />} title="Falta de clareza" text="Difícil entender o que está incluso em cada opção." />
          </div>
        </Section>

        {/* Solução + Benefícios */}
        <Section
          id="solucao"
          eyebrow="A solução"
          title="Você monta, a gente cuida do resto"
          subtitle="Um processo simples para escolher exatamente o que precisa e falar direto com quem resolve."
          className="bg-card"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<SlidersHorizontal className="size-5" />} title="Flexível" text="Combine recursos de acordo com o seu momento." />
            <FeatureCard icon={<ListChecks className="size-5" />} title="Transparente" text="Resumo claro de tudo o que foi escolhido." />
            <FeatureCard icon={<MessageCircle className="size-5" />} title="Atendimento humano" text="Conversa direta pelo WhatsApp." />
            <FeatureCard icon={<ShieldCheck className="size-5" />} title="Sem compromisso" text="Monte e envie sem custo algum." />
          </div>
        </Section>

        {/* Como funciona */}
        <Section id="como-funciona" eyebrow="Como funciona" title="Três passos simples">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border bg-card p-6 shadow-soft">
                <span className="absolute right-6 top-6 text-5xl font-semibold text-muted">{i + 1}</span>
                <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">{s.icon}</div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Planos */}
        <Section id="planos" eyebrow="Planos" title="Comece por uma base e personalize" className="bg-card">
          <div className="grid gap-5 md:grid-cols-3">
            {planOptions.map((p, i) => (
              <div
                key={p.id}
                className={`flex flex-col rounded-2xl border p-6 shadow-soft ${i === 1 ? "border-primary bg-secondary" : "bg-background"}`}
              >
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                <p className="mt-6 text-2xl font-semibold">
                  {p.basePrice !== null ? formatPrice(p.basePrice) : <span className="text-base text-muted-foreground">Valor sob consulta</span>}
                </p>
                <Button asChild variant={i === 1 ? "default" : "outline"} className="mt-6">
                  <Link to="/montar-plano" search={{ plano: p.id }}>
                    Personalizar
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <section className="py-20">
          <div className="container-page">
            <div className="rounded-3xl bg-ink px-6 py-14 text-center text-ink-foreground md:px-16">
              <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">Pronto para montar o seu?</h2>
              <p className="mx-auto mt-4 max-w-lg opacity-70">Leva poucos minutos e você já sai com um resumo claro do que precisa.</p>
              <Button asChild size="lg" variant="secondary" className="mt-8 h-12 px-6">
                <Link to="/montar-plano">
                  Montar meu plano <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <Section id="faq" eyebrow="Dúvidas" title="Perguntas frequentes">
          <Accordion type="single" collapsible className="mx-auto max-w-2xl">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
