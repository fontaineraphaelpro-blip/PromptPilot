"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginSchema, signupSchema, type LoginInput, type SignupInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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
    formState: { errors },
  } = useForm<LoginInput | SignupInput>({
    resolver: zodResolver(schema),
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

      toast.success(isLogin ? "Connexion réussie" : "Bienvenue sur PromptPilot !");
      router.push(redirect);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur d'authentification";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? "Connexion" : "Inscription"}</CardTitle>
        <CardDescription>
          {isLogin
            ? "Accédez à votre espace PromptPilot"
            : "Créez votre compte gratuit — 3 prompts/jour"}
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
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input id="confirmPassword" type="password" {...register("confirmPassword" as keyof SignupInput)} />
              {"confirmPassword" in errors && errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {(errors as { confirmPassword?: { message?: string } }).confirmPassword?.message}
                </p>
              )}
            </div>
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
              <Link href="/signup" className="text-primary hover:underline">
                S&apos;inscrire
              </Link>
            </>
          ) : (
            <>
              Déjà inscrit ?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
}
