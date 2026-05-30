import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-black mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 font-semibold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                <Sparkles className="h-4 w-4" />
              </span>
              {APP_NAME}
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              Transforme tes idées en prompts experts pour ChatGPT, Claude, Cursor, Midjourney et plus.
            </p>
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
                <Link href="/pricing" className="transition-colors hover:text-foreground">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/#how" className="transition-colors hover:text-foreground">
                  Comment ça marche
                </Link>
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
