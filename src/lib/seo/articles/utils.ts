import type { ContentBlock } from "../types";

export function estimateReadingTime(blocks: ContentBlock[]): number {
  const words = countWords(blocks);
  return Math.max(6, Math.ceil(words / 200));
}

export function countWords(blocks: ContentBlock[]): number {
  const text = blocks
    .map((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
      if (b.type === "tip") return `${b.title} ${b.text}`;
      if ("text" in b) return b.text;
      return "";
    })
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** Ancre URL-friendly pour titres (sommaire + lien #). */
export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function getTableOfContents(
  blocks: ContentBlock[]
): { id: string; text: string }[] {
  return blocks
    .filter((b): b is Extract<ContentBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: slugifyHeading(b.text), text: b.text }));
}

/**
 * Extrait les FAQ depuis un bloc H2 « FAQ… » suivi de H3 + paragraphe.
 * Alimente le schema FAQPage pour les rich results Google.
 */
export function extractFaqItems(
  blocks: ContentBlock[]
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  let inFaq = false;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "h2") {
      inFaq = /faq|questions?\s+(fr[eé]quentes?|associ)/i.test(b.text);
      continue;
    }
    if (!inFaq) continue;
    if (b.type === "h3") {
      const next = blocks[i + 1];
      if (next && next.type === "p") {
        faqs.push({ question: b.text, answer: next.text });
      }
    }
  }

  return faqs;
}
