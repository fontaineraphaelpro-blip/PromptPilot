import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-semibold text-lg">{APP_NAME}</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Transforme tes idées en prompts experts pour ChatGPT, Claude, Cursor, Midjourney et plus.
            </p>
          </div>
          <div>
            <p className="font-medium text-sm mb-3">Produit</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/signup" className="hover:text-foreground">Commencer gratuitement</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Tarifs</Link></li>
              <li><Link href="/#how" className="hover:text-foreground">Comment ça marche</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-sm mb-3">Légal & compte</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/login" className="hover:text-foreground">Connexion</Link></li>
              <li><Link href="/signup" className="hover:text-foreground">Inscription</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">CGU</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {APP_NAME}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
