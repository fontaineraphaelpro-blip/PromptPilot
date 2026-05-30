import type { ContentBlock } from "@/lib/seo/types";

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-base">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2 key={i} className="text-2xl font-bold text-foreground pt-4 tracking-tight">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="text-xl font-semibold text-foreground pt-2">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc pl-6 space-y-2">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-6 space-y-2">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "blockquote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-white/30 pl-4 italic text-foreground/90"
              >
                {block.text}
              </blockquote>
            );
          case "tip":
            return (
              <div
                key={i}
                className="rounded-xl border border-white/15 bg-white/5 p-5"
              >
                <p className="text-sm font-semibold text-foreground">{block.title}</p>
                <p className="mt-2 text-sm">{block.text}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
