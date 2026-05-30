import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ConversionShell } from "@/components/conversion/conversion-shell";
import { FomoStrip } from "@/components/conversion/fomo-strip";
import { getAuthUser } from "@/lib/auth";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  const showConversion = !user;

  return (
    <>
      <Navbar user={user ? { email: user.email } : null} />
      {showConversion && <FomoStrip />}
      {showConversion && <ConversionShell />}
      <main className="flex-1 pb-20 sm:pb-0">{children}</main>
      <Footer />
    </>
  );
}
