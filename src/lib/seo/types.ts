export type ContentCategory = "guide" | "comparatif" | "article";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "tip"; title: string; text: string };

export interface SeoArticle {
  slug: string;
  title: string;
  description: string;
  category: ContentCategory;
  publishedAt: string;
  updatedAt: string;
  readingTimeMin: number;
  keywords: string[];
  relatedSlugs: string[];
  blocks: ContentBlock[];
}

export interface PromptIaPage {
  slug: string;
  aiName: string;
  title: string;
  description: string;
  keywords: string[];
  useCases: string[];
  tips: string[];
  exampleBefore: string;
  exampleAfter: string;
  relatedArticleSlugs: string[];
}
