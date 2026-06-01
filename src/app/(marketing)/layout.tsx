import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MarketingAmbient } from "@/components/layout/marketing-ambient";
import { ConversionShell } from "@/components/conversion/conversion-shell";
import { FomoStrip } from "@/components/conversion/fomo-strip";
import { SalesSetupBanner } from "@/components/conversion/sales-setup-banner";
import { getAuthUser } from "@/lib/auth";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  const showConversion = !user;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <MarketingAmbient />
      <Navbar user={user ? { email: user.email } : null} />
      <SalesSetupBanner />
      {showConversion && <FomoStrip />}
      {showConversion && <ConversionShell />}
      <main className="flex-1 w-full pb-24 sm:pb-20">{children}</main>
      <Footer />
    </div>
  );
}
