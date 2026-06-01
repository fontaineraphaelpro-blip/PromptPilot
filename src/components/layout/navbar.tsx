"use client";

import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { MARKETING_CONTAINER } from "@/lib/layout-width";
import { Button } from "@/components/ui/button";
import { Menu, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { isSalesMode } from "@/lib/sales-mode";
import { PLAN_PRICES } from "@/lib/plans";

const NAV_LINKS = [
  { label: "Comment ça marche", href: "/#how" },
  { label: "Améliorer", href: "/improve" },
  { label: "Galerie", href: "/galerie" },
  { label: "Blog", href: "/blog" },
  { label: "Tarifs", href: "/pricing" },
] as const;

interface NavbarProps {
  user?: { email: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sales = isSalesMode();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-nav sticky top-0 z-50 w-full"
    >
      <div className={cn(MARKETING_CONTAINER, "flex h-14 sm:h-16 items-center justify-between gap-3")}>
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-white text-black transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-semibold tracking-tight text-sm sm:text-base">{APP_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:gap-8 text-sm text-muted-foreground md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-foreground whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/generate">Nouveau prompt</Link>
              </Button>
            </>
          ) : sales ? (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link href="/#funnel">Essai gratuit</Link>
              </Button>
              <Button size="sm" className="text-xs sm:text-sm px-3 sm:px-4" asChild>
                <Link href="/pricing?plan=pro">Pro — {PLAN_PRICES.pro.amount}€</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
              <Button size="sm" className="text-xs sm:text-sm px-3 sm:px-4" asChild>
                <Link href="/#funnel">Commencer</Link>
              </Button>
            </>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
          >
            <nav className={cn(MARKETING_CONTAINER, "flex flex-col gap-1 py-4")}>
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-white/5 sm:hidden"
                  onClick={() => setMobileOpen(false)}
                >
                  Connexion
                </Link>
              )}
              {user && (
                <Link
                  href="/dashboard"
                  className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
