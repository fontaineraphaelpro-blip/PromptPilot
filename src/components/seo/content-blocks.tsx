import type { ContentBlock } from "@/lib/seo/types";
import { slugifyHeading } from "@/lib/seo/articles/utils";

/** Préserve les retours à la ligne dans les prompts copiables. */
function FormattedText({ text }: { text: string }) {
  if (!text.includes("\n")) {
    return <>{text}</>;
  }
  return (
    <span className="whitespace-pre-wrap font-mono text-[0.9em] text-foreground/90 block rounded-lg border border-white/10 bg-black/30 p-4 leading-relaxed">
      {text}
    </span>
  );
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6 text-muted-foreground leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-base sm:text-[1.05rem]">
                <FormattedText text={block.text} />
              </p>
            );
          case "h2": {
            const id = slugifyHeading(block.text);
            return (
              <h2
                key={i}
                id={id}
                className="text-2xl font-bold text-foreground pt-6 tracking-tight scroll-mt-24"
              >
                <a href={`#${id}`} className="no-underline hover:underline decoration-white/30">
                  {block.text}
                </a>
              </h2>
            );
          }
          case "h3": {
            const id = slugifyHeading(block.text);
            return (
              <h3
                key={i}
                id={id}
                className="text-xl font-semibold text-foreground pt-3 scroll-mt-24"
              >
                {block.text}
              </h3>
            );
          }
          case "ul":
            return (
              <ul key={i} className="list-disc pl-6 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-6 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "blockquote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-white/30 pl-4 italic text-foreground/90 my-2"
              >
                {block.text}
              </blockquote>
            );
          case "tip":
            return (
              <aside
                key={i}
                className="rounded-xl border border-white/15 bg-white/5 p-5"
                aria-label={block.title}
              >
                <p className="text-sm font-semibold text-foreground">{block.title}</p>
                <p className="mt-2 text-sm">{block.text}</p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
