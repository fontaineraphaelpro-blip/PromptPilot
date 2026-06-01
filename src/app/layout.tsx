import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";
import "./globals.css";
import { APP_NAME } from "@/lib/constants";
import { getAppUrl } from "@/lib/env";
import { getMessages } from "@/lib/i18n/get-messages";
import { getServerLocale } from "@/lib/i18n/server";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const m = getMessages(locale);
  const ogLocale = locale === "en" ? "en_US" : "fr_FR";

  return {
    metadataBase: new URL(getAppUrl()),
    title: {
      default: `${APP_NAME} — ${m.meta.title}`,
      template: `%s — ${APP_NAME}`,
    },
    description: m.meta.description,
    keywords: [
      locale === "en" ? "AI prompt" : "prompt IA",
      "ChatGPT",
      "Claude",
      "Cursor",
      "Midjourney",
      locale === "en" ? "prompt engineering" : "prompt engineering",
    ],
    openGraph: {
      type: "website",
      locale: ogLocale,
      siteName: APP_NAME,
      title: `${APP_NAME} — ${m.meta.title}`,
      description: m.meta.description,
      url: getAppUrl(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${APP_NAME} — ${m.meta.title}`,
      description: m.meta.description,
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <GoogleAnalyticsHead />
      </head>
      <body className="min-h-full w-full overflow-x-hidden flex flex-col font-sans">
        <Suspense fallback={null}>
          <GoogleAnalyticsPageView />
        </Suspense>
        <LocaleProvider initialLocale={locale}>
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
        </LocaleProvider>
        <Toaster position="top-center" theme="dark" richColors />
        <SiteAnalytics />
      </body>
    </html>
  );
}
