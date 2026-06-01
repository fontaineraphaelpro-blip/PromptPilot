"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginSchema, signupSchema, type LoginInput, type SignupInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { FREE_DAILY_LIMIT } from "@/lib/constants";
import { toast } from "sonner";
import { getFunnelDraft } from "@/lib/conversion/funnel-storage";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";
  const schema = isLogin ? loginSchema : signupSchema;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInput | SignupInput>({
    resolver: zodResolver(schema),
    defaultValues: isLogin ? undefined : { acceptTerms: false },
  });

  async function onSubmit(data: LoginInput | SignupInput) {
    setLoading(true);

    try {
      const email = data.email.toLowerCase().trim();
      const password = data.password;

      if (!isLogin) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error ?? "Erreur inscription");
        }
        toast.success("Compte créé ! Connexion en cours…");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(
          isLogin ? "Email ou mot de passe incorrect" : "Connexion impossible après inscription"
        );
      }

      toast.success(isLogin ? "Connexion réussie" : "Bienvenue — ton prompt t'attend !");
      const funnelDraft = !isLogin ? getFunnelDraft() : null;
      router.push(funnelDraft ? "/generate" : redirect);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur d'authentification";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto glass-card">
      <CardHeader>
        <CardTitle>{isLogin ? "Connexion" : "Inscription"}</CardTitle>
        <CardDescription>
          {isLogin
            ? "Accédez à votre espace PromptPilot"
            : getFunnelDraft()
              ? "Dernière étape : débloque ton prompt complet en 30 secondes"
              : `Créez votre compte gratuit — ${FREE_DAILY_LIMIT} prompts/jour`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="vous@email.com" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              {isLogin && (
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              )}
            </div>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
            {!isLogin && (
              <p className="text-xs text-muted-foreground">
                8 caractères minimum, avec une lettre et un chiffre
              </p>
            )}
          </div>
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input id="confirmPassword" type="password" {...register("confirmPassword" as keyof SignupInput)} />
                {"confirmPassword" in errors && errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {(errors as { confirmPassword?: { message?: string } }).confirmPassword?.message}
                  </p>
                )}
              </div>
              <div className="flex items-start gap-2">
                <Controller
                  name="acceptTerms"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="acceptTerms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label htmlFor="acceptTerms" className="text-sm text-muted-foreground leading-tight">
                  J&apos;accepte les{" "}
                  <Link href="/terms" className="text-foreground hover:underline" target="_blank">
                    conditions d&apos;utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" className="text-primary hover:underline" target="_blank">
                    politique de confidentialité
                  </Link>
                </label>
              </div>
              {"acceptTerms" in errors && errors.acceptTerms && (
                <p className="text-sm text-destructive">
                  {(errors as { acceptTerms?: { message?: string } }).acceptTerms?.message}
                </p>
              )}
            </>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isLogin ? "Se connecter" : "Créer mon compte"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Pas de compte ?{" "}
              <Link href="/signup" className="text-foreground hover:underline">
                S&apos;inscrire
              </Link>
            </>
          ) : (
            <>
              Déjà inscrit ?{" "}
              <Link href="/login" className="text-foreground hover:underline">
                Se connecter
              </Link>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
