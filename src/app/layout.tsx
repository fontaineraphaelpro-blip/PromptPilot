import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import "./globals.css";
import { APP_NAME } from "@/lib/constants";
import { getAppUrl } from "@/lib/env";
import { GoogleAnalyticsHead } from "@/components/analytics/google-analytics-head";
import { GoogleAnalyticsPageView } from "@/components/analytics/google-analytics-page-view";
import { SiteAnalytics } from "@/components/analytics/site-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getAppUrl()),
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
    url: getAppUrl(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} — Prompts IA experts`,
    description: "Génère des prompts optimisés pour toutes les IA en quelques secondes.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <GoogleAnalyticsHead />
      </head>
      <body className="min-h-full w-full overflow-x-hidden flex flex-col font-sans">
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
        <Toaster position="top-center" theme="dark" richColors />
        <SiteAnalytics />
      </body>
    </html>
  );
}
