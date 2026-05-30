"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
      <p className="mt-2 text-muted-foreground max-w-md">
        Désolé, quelque chose s&apos;est mal passé. Réessayez ou retournez à l&apos;accueil.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Réessayer</Button>
        <Button variant="outline" asChild>
          <Link href="/">Accueil</Link>
        </Button>
      </div>
    </div>
  );
}
