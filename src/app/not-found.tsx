import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page introuvable</h1>
      <p className="mt-2 text-muted-foreground">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">Retour à l&apos;accueil</Link>
      </Button>
    </div>
  );
}
