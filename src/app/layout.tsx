import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import "./globals.css";
import { APP_NAME } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: `${APP_NAME} — Prompts IA experts en un clic`,
    template: `%s — ${APP_NAME}`,
  },
  description:
    "Transforme ton idée en prompt parfait pour ChatGPT, Claude, Cursor, Midjourney, Sora et plus. Génération instantanée, variantes expert, historique.",
  keywords: ["prompt IA", "ChatGPT", "Claude", "Cursor", "Midjourney", "prompt engineering"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: APP_NAME,
    title: `${APP_NAME} — Prompts IA experts`,
    description: "Décris ton idée, choisis ton IA, reçois un prompt expert prêt à copier.",
    url: appUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Prompts IA experts`,
    description: "Génère des prompts optimisés pour toutes les IA en quelques secondes.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
        <Toaster position="top-center" theme="dark" richColors />
      </body>
    </html>
  );
}
