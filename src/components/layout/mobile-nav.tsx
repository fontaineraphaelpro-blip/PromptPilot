"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wand2,
  History,
  Star,
  Menu,
  FileText,
  ListOrdered,
  Settings,
  CreditCard,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useLocale } from "@/components/providers/locale-provider";
import { useScrollLock } from "@/hooks/use-scroll-lock";

const items = [
  { href: "/dashboard", icon: LayoutDashboard, labelKey: "dashboard" as const },
  { href: "/generate", icon: Wand2, labelKey: "generate" as const },
  { href: "/history", icon: History, labelKey: "history" as const },
  { href: "/favorites", icon: Star, labelKey: "favorites" as const },
];

const moreLinks = [
  { href: "/templates", icon: FileText, labelKey: "templates" as const },
  { href: "/workflows", icon: ListOrdered, labelKey: "workflows" as const },
  { href: "/settings/billing", icon: CreditCard, labelKey: "billing" as const },
  { href: "/settings", icon: Settings, labelKey: "settings" as const },
];

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { messages: m } = useLocale();
  useScrollLock(open);

  async function handleLogout() {
    setOpen(false);
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute bottom-[calc(4rem+env(safe-area-inset-bottom))] left-3 right-3 max-h-[min(70vh,70dvh)] overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-card p-3 shadow-2xl pb-[env(safe-area-inset-bottom)]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-2 pb-2">
              <p className="text-sm font-medium">Menu</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {moreLinks.map(({ href, icon: Icon, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-xl px-3 py-3 text-sm transition-colors",
                    (href === "/settings"
                      ? pathname === "/settings"
                      : pathname.startsWith(href))
                      ? "bg-white text-black"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {m.app[labelKey]}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 min-h-11 w-full rounded-xl px-3 py-3 text-left text-sm text-muted-foreground hover:bg-white/5"
            >
              {m.app.logout}
            </button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav-bottom lg:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around py-1.5">
          {items.map(({ href, icon: Icon, labelKey }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-h-11 min-w-[4.25rem] flex-col items-center justify-center gap-0.5 px-2 text-[11px] transition-colors",
                pathname.startsWith(href) ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {m.app[labelKey]}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "flex min-h-11 min-w-[4.25rem] flex-col items-center justify-center gap-0.5 px-2 text-[11px] transition-colors",
              open ||
                pathname.startsWith("/settings") ||
                pathname.startsWith("/templates") ||
                pathname.startsWith("/workflows")
                ? "text-foreground"
                : "text-muted-foreground"
            )}
            aria-label="Plus"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
            Plus
          </button>
        </div>
      </nav>
    </>
  );
}
