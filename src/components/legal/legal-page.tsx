import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LegalPageProps {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export function LegalPage({ title, updatedAt, children }: LegalPageProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Accueil
        </Link>
      </Button>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Dernière mise à jour : {updatedAt}
      </p>
      <div className="prose prose-invert mt-8 max-w-none text-muted-foreground space-y-4 text-sm leading-relaxed">
        {children}
      </div>
    </article>
  );
}
