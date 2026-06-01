import { APP_NAME } from "@/lib/constants";
import { getAppUrl } from "@/lib/env";
import { getSupportEmail } from "@/lib/support";

export function GET() {
  const base = getAppUrl();
  const body = `# ${APP_NAME}

> ${APP_NAME} transforme une idée en prompt expert structuré pour ChatGPT, Claude, Gemini, Cursor, Midjourney, Runway, Sora et autres IA.

## Produit
- Générateur de prompts avec score qualité /100
- Preview avant de coller dans l'IA cible
- 4 variantes : Principal, Court, Détaillé, Expert
- Plans : Free (${2} prompts/jour), Pro (200/jour), Creator (illimité)

## Pages utiles
- Accueil : ${base}/
- Tarifs : ${base}/pricing
- Blog SEO : ${base}/blog
- Prompts par IA : ${base}/prompts-ia
- Améliorer un prompt faible : ${base}/improve
- Galerie partagée : ${base}/galerie
- À propos : ${base}/a-propos
- Contact : ${base}/contact

## Contact
${getSupportEmail()}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
