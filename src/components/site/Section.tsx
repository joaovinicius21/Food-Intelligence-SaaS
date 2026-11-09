import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, subtitle, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-20 md:py-28", className)}>
      <div className="container-page">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          )}
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-muted-foreground text-pretty">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function FeatureCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-4 grid size-11 place-items-center rounded-xl bg-secondary text-primary">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
