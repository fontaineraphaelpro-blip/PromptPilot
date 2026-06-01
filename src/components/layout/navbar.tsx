"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { MARKETING_CONTAINER } from "@/lib/layout-width";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand/brand-mark";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollLink } from "@/components/navigation/scroll-link";
import type { HomeSectionId } from "@/lib/scroll-to-section";
import { scrollToHomeTop } from "@/lib/scroll-to-section";
import { useLocale } from "@/components/providers/locale-provider";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";

const NAV_SECTIONS: { key: "beforeAfter" | "demo" | "how"; section: HomeSectionId }[] = [
  { key: "beforeAfter", section: "examples" },
  { key: "demo", section: "demo" },
  { key: "how", section: "how" },
];

interface NavbarProps {
  user?: { email: string } | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { messages: m } = useLocale();

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
          onClick={(e) => {
            setMobileOpen(false);
            if (pathname === "/") {
              e.preventDefault();
              scrollToHomeTop("smooth");
            }
          }}
        >
          <BrandMark priority />
          <span className="font-semibold tracking-tight text-sm sm:text-base">{APP_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-4 lg:gap-6 text-sm text-muted-foreground md:flex">
          {NAV_SECTIONS.map(({ key, section }) => (
            <ScrollLink
              key={section}
              section={section}
              className="transition-colors hover:text-foreground whitespace-nowrap"
            >
              {m.nav[key]}
            </ScrollLink>
          ))}
          <Link href="/pricing" className="transition-colors hover:text-foreground whitespace-nowrap">
            {m.nav.pricing}
          </Link>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link href="/dashboard">{m.nav.dashboard}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/generate">{m.nav.newPrompt}</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link href="/login">{m.nav.login}</Link>
              </Button>
              <Button size="sm" className="text-xs sm:text-sm px-3 sm:px-4" asChild>
                <Link href="/signup">{m.nav.signup}</Link>
              </Button>
            </>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            aria-label={mobileOpen ? m.nav.closeMenu : m.nav.openMenu}
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
            <nav className={cn(MARKETING_CONTAINER, "flex flex-col gap-1 py-4 max-h-[70vh] overflow-y-auto")}>
              <div className="px-3 pb-2 sm:hidden">
                <LanguageSwitcher />
              </div>
              {NAV_SECTIONS.map(({ key, section }) => (
                <ScrollLink
                  key={section}
                  section={section}
                  className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {m.nav[key]}
                </ScrollLink>
              ))}
              <Link
                href="/pricing"
                className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {m.nav.pricing}
              </Link>
              {!user && (
                <>
                  <ScrollLink
                    section="funnel"
                    className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {m.nav.tryNow}
                  </ScrollLink>
                  <Link
                    href="/login"
                    className="rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    {m.nav.login}
                  </Link>
                </>
              )}
              {user && (
                <Link
                  href="/dashboard"
                  className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {m.nav.dashboard}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
