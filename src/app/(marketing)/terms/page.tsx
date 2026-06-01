import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { APP_NAME } from "@/lib/constants";
import { getSupportEmail } from "@/lib/support";
import { PRO_DAILY_FAIR_USE_LIMIT } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Conditions d'utilisation — ${APP_NAME}`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Conditions d'utilisation" updatedAt="30 mai 2026">
      <p>
        En utilisant {APP_NAME}, vous acceptez les présentes conditions. Le service permet de
        générer des prompts optimisés pour différents outils d&apos;intelligence artificielle.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Compte utilisateur</h2>
      <p>
        Vous êtes responsable de la confidentialité de vos identifiants. Toute activité sur votre
        compte vous est imputable.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Plans et paiements</h2>
      <p>
        Le plan Free inclut une limite quotidienne de générations. Le plan Pro inclut un usage
        généreux de {PRO_DAILY_FAIR_USE_LIMIT} générations par jour. Le plan Creator est illimité
        sous réserve d&apos;un usage raisonnable. Les abonnements sont facturés via Stripe
        (mensuel ou annuel si proposé). Annulation à tout moment depuis le portail de facturation.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Usage acceptable</h2>
      <p>
        Interdiction d&apos;utiliser le service pour du contenu illégal, haineux, ou violant les
        droits de tiers. Nous nous réservons le droit de suspendre un compte en cas d&apos;abus.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Propriété intellectuelle</h2>
      <p>
        Les prompts générés vous appartiennent. {APP_NAME} conserve les droits sur la plateforme,
        le design et le code source.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Limitation de responsabilité</h2>
      <p>
        Le service est fourni « en l&apos;état ». Nous ne garantissons pas l&apos;exactitude des
        sorties IA. {APP_NAME} ne pourra être tenu responsable des dommages indirects liés à
        l&apos;usage des prompts générés.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Contact</h2>
      <p>
        Pour toute question :{" "}
        <a href={`mailto:${getSupportEmail()}`} className="text-primary hover:underline">
          {getSupportEmail()}
        </a>{" "}
        ou la page <a href="/contact" className="text-primary hover:underline">Contact</a>.
      </p>
    </LegalPage>
  );
}
