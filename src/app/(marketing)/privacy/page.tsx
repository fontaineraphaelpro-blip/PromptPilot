import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${APP_NAME}`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" updatedAt="30 mai 2026">
      <p>
        {APP_NAME} respecte votre vie privée. Cette politique décrit les données collectées et leur
        utilisation conformément au RGPD.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Données collectées</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Email et mot de passe (hashé) pour l&apos;authentification</li>
        <li>Prompts générés et paramètres associés (IA cible, type, etc.)</li>
        <li>Données de facturation via Stripe (nous ne stockons pas vos cartes bancaires)</li>
        <li>Logs techniques (IP, navigateur) pour la sécurité</li>
      </ul>
      <h2 className="text-lg font-semibold text-foreground pt-4">Finalités</h2>
      <p>
        Fourniture du service, gestion des abonnements, amélioration du produit, support client et
        sécurité.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Sous-traitants</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Railway — hébergement et base de données</li>
        <li>OpenAI — génération des prompts</li>
        <li>Stripe — paiements</li>
      </ul>
      <h2 className="text-lg font-semibold text-foreground pt-4">Vos droits</h2>
      <p>
        Accès, rectification, suppression et portabilité : contactez-nous à l&apos;adresse support.
        Vous pouvez supprimer votre compte depuis les paramètres (fonction à venir) ou par email.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Conservation</h2>
      <p>
        Les données sont conservées tant que votre compte est actif, puis supprimées dans un délai
        raisonnable après clôture du compte.
      </p>
      <h2 className="text-lg font-semibold text-foreground pt-4">Cookies</h2>
      <p>
        Nous utilisons des cookies de session strictement nécessaires à l&apos;authentification. Pas
        de cookies publicitaires tiers.
      </p>
    </LegalPage>
  );
}
