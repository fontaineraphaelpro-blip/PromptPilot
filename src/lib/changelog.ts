export interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  items: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-05-30",
    version: "1.4.0",
    title: "Score, preview & bibliothèque intelligente",
    items: [
      "Prompt Score /100 avec critères détaillés",
      "Mode « Tester avant de coller » avec interprétation IA",
      "Tags, duplication et export Markdown/Notion",
      "Workflows Creator et pages SEO (prompt du jour, comparatif)",
      "Garantie regénération si score < 70",
      "Liens de partage publics en lecture seule",
    ],
  },
  {
    date: "2026-05-28",
    version: "1.3.0",
    title: "Plans Pro/Creator & templates premium",
    items: [
      "Différenciation Pro (9€) vs Creator (19€)",
      "Variante Expert réservée Creator",
      "Templates premium floutés pour Free",
      "Favoris et options avancées Pro+",
    ],
  },
  {
    date: "2026-05-25",
    version: "1.2.0",
    title: "SEO & contenu",
    items: [
      "16 articles blog long format",
      "Pages prompts par IA (ChatGPT, Cursor, Midjourney…)",
      "Hub guides et comparatifs",
    ],
  },
  {
    date: "2026-05-20",
    version: "1.0.0",
    title: "Lancement PromptExpert",
    items: [
      "Générateur multi-IA (12 outils)",
      "Variantes Principal, Court, Détaillé, Expert",
      "Historique, templates, Stripe",
    ],
  },
];
