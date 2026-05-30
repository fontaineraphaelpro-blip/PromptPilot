"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wand2, History, Star, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Accueil" },
  { href: "/generate", icon: Wand2, label: "Générer" },
  { href: "/history", icon: History, label: "Historique" },
  { href: "/favorites", icon: Star, label: "Favoris" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card lg:hidden">
      <div className="flex justify-around py-2">
        {items.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1 text-xs",
              pathname.startsWith(href) ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
        <Link
          href="/settings"
          className={cn(
            "flex flex-col items-center gap-0.5 px-3 py-1 text-xs",
            pathname.startsWith("/settings") ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Menu className="h-5 w-5" />
          Plus
        </Link>
      </div>
    </nav>
  );
}
