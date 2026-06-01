import type { Metadata } from "next";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { getSupportEmail } from "@/lib/support";
import { LegalPage } from "@/components/legal/legal-page";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Contact — ${APP_NAME}`,
};

export default function ContactPage() {
  const email = getSupportEmail();
  const crispId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID?.trim();

  return (
    <LegalPage title="Contact & support" updatedAt="30 mai 2026">
      <p>
        Une question sur ton compte, un abonnement ou la qualité des prompts générés ? Notre
        équipe répond sous 24–48 h ouvrées.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 not-prose mt-8">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <Mail className="h-6 w-6 mb-3" />
          <h2 className="text-lg font-semibold text-foreground">Email</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Facturation, RGPD, bug technique ou partenariat.
          </p>
          <Button className="mt-4" asChild>
            <a href={`mailto:${email}`}>{email}</a>
          </Button>
        </div>
        {crispId ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <MessageCircle className="h-6 w-6 mb-3" />
            <h2 className="text-lg font-semibold text-foreground">Chat en direct</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Disponible en bas à droite sur le site (plan Creator : priorité).
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Cliquez sur la bulle de chat pour nous écrire.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <MessageCircle className="h-6 w-6 mb-3" />
            <h2 className="text-lg font-semibold text-foreground">FAQ</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Réponses aux questions fréquentes sur les plans et la génération.
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/pricing">Voir la FAQ tarifs</Link>
            </Button>
          </div>
        )}
      </div>
    </LegalPage>
  );
}
