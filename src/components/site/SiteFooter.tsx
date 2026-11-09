import { Link } from "@tanstack/react-router";
import { navLinks, siteConfig } from "@/config/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm opacity-70">{siteConfig.description}</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm opacity-80">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:opacity-100">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm opacity-80">
          <Link to="/montar-plano">Montar plano</Link>
          <Link to="/admin">Área administrativa</Link>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
