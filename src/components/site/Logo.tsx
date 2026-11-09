import { Link } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span
        className={cn(
          "grid size-8 place-items-center rounded-lg",
          inverted ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        <Layers className="size-4" />
      </span>
      <span>{siteConfig.name}</span>
    </Link>
  );
}
