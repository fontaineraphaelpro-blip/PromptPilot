"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { MARKETING_CONTAINER } from "@/lib/layout-width";
import { BrandMark } from "@/components/brand/brand-mark";
import { ScrollLink } from "@/components/navigation/scroll-link";
import { scrollToHomeTop } from "@/lib/scroll-to-section";

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-border/60 bg-black mt-auto">
      <div className={MARKETING_CONTAINER + " py-16"}>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-semibold text-lg"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToHomeTop("smooth");
                }
              }}
            >
              <BrandMark />
              {APP_NAME}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Transforme tes idées en prompts experts pour ChatGPT, Claude, Cursor, Midjourney et plus.
            </p>
          </div>
          <div>
            <p className="font-medium text-sm mb-4 text-foreground">Ressources SEO</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="transition-colors hover:text-foreground">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/prompt-du-jour" className="transition-colors hover:text-foreground">
                  Prompt du jour
                </Link>
              </li>
              <li>
                <Link href="/comparatif/interactif" className="transition-colors hover:text-foreground">
                  Comparatif interactif
                </Link>
              </li>
              <li>
                <Link href="/guides/metier/developpeur" className="transition-colors hover:text-foreground">
                  Guides métier
                </Link>
              </li>
              <li>
                <Link href="/prompts-ia" className="transition-colors hover:text-foreground">
                  Prompts par IA
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-sm mb-4 text-foreground">Produit</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/signup" className="transition-colors hover:text-foreground">
                  Commencer gratuitement
                </Link>
              </li>
              <li>
                <Link href="/improve" className="transition-colors hover:text-foreground">
                  Améliorer mon prompt
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="transition-colors hover:text-foreground">
                  Galerie communauté
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition-colors hover:text-foreground">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="transition-colors hover:text-foreground">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="transition-colors hover:text-foreground">
                  Changelog
                </Link>
              </li>
              <li>
                <ScrollLink section="how" className="transition-colors hover:text-foreground">
                  Comment ça marche
                </ScrollLink>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-sm mb-4 text-foreground">Légal & compte</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/login" className="transition-colors hover:text-foreground">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/signup" className="transition-colors hover:text-foreground">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-foreground">
                  CGU
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-foreground">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Built for the AI era
          </p>
        </div>
      </div>
    </footer>
  );
}
