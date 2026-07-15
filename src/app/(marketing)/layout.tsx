import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MarketingAmbient } from "@/components/layout/marketing-ambient";
import { ConversionShell } from "@/components/conversion/conversion-shell";
import { SalesSetupBanner } from "@/components/conversion/sales-setup-banner";
import { getAuthUser } from "@/lib/auth";
import { getOrCreateProfile } from "@/lib/profile";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();
  const profile = user
    ? await getOrCreateProfile(user.id, user.email ?? "")
    : null;

  const conversionMode: "guest" | "free" | null = !user
    ? "guest"
    : profile?.plan === "free"
      ? "free"
      : null;

  return (
    <div
      className={
        conversionMode
          ? "relative flex min-h-dvh w-full flex-col overflow-x-hidden pb-[calc(5.5rem+env(safe-area-inset-bottom))]"
          : "relative flex min-h-dvh w-full flex-col overflow-x-hidden"
      }
    >
      <MarketingAmbient />
      <Navbar user={user ? { email: user.email } : null} />
      <SalesSetupBanner />
      {conversionMode && <ConversionShell mode={conversionMode} />}
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
