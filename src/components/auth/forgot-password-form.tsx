"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Email invalide"),
});

type FormValues = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error ?? "Erreur");
        return;
      }
      setSent(true);
      toast.success("Vérifiez votre boîte mail");
    } catch {
      toast.error("Erreur réseau");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mot de passe oublié</CardTitle>
        <CardDescription>
          {sent
            ? "Si un compte existe, un email avec le lien de réinitialisation a été envoyé."
            : "Entrez votre email pour recevoir un lien (valide 1 heure)."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sent ? (
          <Button asChild className="w-full">
            <Link href="/login">Retour à la connexion</Link>
          </Button>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Envoyer le lien
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/login" className="text-foreground hover:underline">
                Retour connexion
              </Link>
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
