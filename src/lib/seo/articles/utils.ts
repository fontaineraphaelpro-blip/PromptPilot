import type { ContentBlock } from "../types";

export function estimateReadingTime(blocks: ContentBlock[]): number {
  const text = blocks
    .map((b) => {
      if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
      if (b.type === "tip") return `${b.title} ${b.text}`;
      if ("text" in b) return b.text;
      return "";
    })
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(6, Math.ceil(words / 200));
}
