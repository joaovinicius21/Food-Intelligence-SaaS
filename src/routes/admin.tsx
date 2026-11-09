import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ExternalLink, Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { adminNav } from "@/config/admin";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: `Painel — ${siteConfig.name}` },
      { name: "description", content: "Painel administrativo de leads, clientes, entregas e lembretes." },
      { property: "og:title", content: `Painel — ${siteConfig.name}` },
      { property: "og:description", content: "Painel administrativo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {adminNav.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/admin" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground"
        >
          <Icon className="size-4" /> {label}
        </Link>
      ))}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-8 bg-sidebar p-4 text-sidebar-foreground">
      <Logo inverted className="px-2 pt-2" />
      <NavList onNavigate={onNavigate} />
      <Link to="/" className="mt-auto flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground">
        <ExternalLink className="size-3.5" /> Ver site
      </Link>
    </div>
  );
}

function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[256px_1fr]">
      <aside className="sticky top-0 hidden h-screen lg:block">
        <SidebarBody />
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-0 p-0">
              <SheetTitle className="sr-only">Menu administrativo</SheetTitle>
              <SidebarBody onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-medium">Painel</span>
        </header>
        <main className="mx-auto max-w-6xl p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
