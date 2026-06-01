import Link from "next/link";
import { CHANGELOG } from "@/lib/changelog";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Changelog — Nouveautés PromptExpert",
  description: "Historique des mises à jour PromptExpert : nouvelles fonctionnalités, améliorations et correctifs.",
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Changelog</h1>
      <p className="text-muted-foreground mb-10">
        PromptExpert évolue en continu — voici les dernières mises à jour.
      </p>
      <div className="space-y-10">
        {CHANGELOG.map((entry) => (
          <article key={entry.version} className="border-l-2 border-white/20 pl-6">
            <p className="text-xs text-muted-foreground">
              {entry.date} · v{entry.version}
            </p>
            <h2 className="text-lg font-semibold mt-1">{entry.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-4">
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        <Link href="/signup" className="text-primary hover:underline">
          Essayer PromptExpert gratuitement
        </Link>
      </p>
    </div>
  );
}
