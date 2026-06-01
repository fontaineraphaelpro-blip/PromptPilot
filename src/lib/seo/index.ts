import { SEO_ARTICLES } from "./articles/index";
import { PROMPT_IA_PAGES } from "./prompt-pages";
import { PROFESSION_GUIDES } from "./profession-guides";
import type { ContentCategory, SeoArticle } from "./types";

export * from "./types";
export { SEO_ARTICLES, PROMPT_IA_PAGES };

export function getArticleBySlug(slug: string): SeoArticle | undefined {
  return SEO_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ContentCategory): SeoArticle[] {
  return SEO_ARTICLES.filter((a) => a.category === category);
}

export function getPromptPageBySlug(slug: string) {
  return PROMPT_IA_PAGES.find((p) => p.slug === slug);
}

export function getAllPublicPaths(): string[] {
  const blog = SEO_ARTICLES.map((a) => `/blog/${a.slug}`);
  const promptsIa = PROMPT_IA_PAGES.map((p) => `/prompts-ia/${p.slug}`);
  const metiers = PROFESSION_GUIDES.map((g) => `/guides/metier/${g.slug}`);
  return [
    "",
    "/pricing",
    "/login",
    "/signup",
    "/terms",
    "/privacy",
    "/contact",
    "/forgot-password",
    "/blog",
    "/guides",
    "/comparatif",
    "/comparatif/interactif",
    "/prompts-ia",
    "/prompt-du-jour",
    "/changelog",
    ...blog,
    ...promptsIa,
    ...metiers,
  ];
}
