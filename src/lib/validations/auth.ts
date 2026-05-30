import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
});

export const signupSchema = z
  .object({
    email: z.string().email("Email invalide"),
    password: z
      .string()
      .min(8, "Minimum 8 caractères")
      .regex(/[A-Za-z]/, "Au moins une lettre")
      .regex(/[0-9]/, "Au moins un chiffre"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
