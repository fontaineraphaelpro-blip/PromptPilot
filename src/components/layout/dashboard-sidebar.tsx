"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand/brand-mark";
import {
  LayoutDashboard,
  Wand2,
  History,
  Star,
  FileText,
  ListOrdered,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { useLocale } from "@/components/providers/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { Plan } from "@/lib/constants";
import { PLAN_LABELS } from "@/lib/plans";

const navItems = [
  { href: "/dashboard", labelKey: "dashboard" as const, icon: LayoutDashboard },
  { href: "/generate", labelKey: "generate" as const, icon: Wand2 },
  { href: "/history", labelKey: "history" as const, icon: History },
  { href: "/favorites", labelKey: "favorites" as const, icon: Star },
  { href: "/templates", labelKey: "templates" as const, icon: FileText },
  { href: "/workflows", labelKey: "workflows" as const, icon: ListOrdered },
  { href: "/settings", labelKey: "settings" as const, icon: Settings },
  { href: "/settings/billing", labelKey: "billing" as const, icon: CreditCard },
];

interface DashboardSidebarProps {
  plan: Plan;
}

export function DashboardSidebar({ plan }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { messages: m } = useLocale();

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
      <div className="flex h-16 items-center justify-between gap-2 border-b border-border px-6">
        <div className="flex items-center gap-2.5 min-w-0">
          <BrandMark />
          <span className="font-semibold tracking-tight truncate">{APP_NAME}</span>
        </div>
        <LanguageSwitcher />
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ href, labelKey, icon: Icon }) => {
          const label = m.app[labelKey];
          const active =
            pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                active
                  ? "bg-white text-black font-medium"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {m.app[labelKey]}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <Badge variant={plan === "free" ? "free" : "pro"} className="mb-3">
          Plan {PLAN_LABELS[plan]}
        </Badge>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {m.app.logout}
        </button>
      </div>
    </aside>
  );
}
