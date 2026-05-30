import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getAuthUser } from "@/lib/auth";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  return (
    <>
      <Navbar user={user ? { email: user.email } : null} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
