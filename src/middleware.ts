import { auth } from "@/auth";
import { normalizeAppUrl } from "@/lib/env";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/generate",
  "/history",
  "/favorites",
  "/templates",
  "/workflows",
  "/settings",
];

/** Redirige Railway / apex → domaine canonique (NEXT_PUBLIC_APP_URL). */
function canonicalHostRedirect(req: NextRequest): NextResponse | null {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (!raw) return null;

  let canonicalHost: string;
  try {
    canonicalHost = new URL(normalizeAppUrl(raw)).host;
  } catch {
    return null;
  }

  const host =
    req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    req.headers.get("host") ??
    "";

  if (!host || host === canonicalHost || host.includes("localhost")) {
    return null;
  }

  const url = req.nextUrl.clone();
  url.protocol = "https:";
  url.host = canonicalHost;
  return NextResponse.redirect(url, 301);
}

export default auth((req) => {
  const canon = canonicalHostRedirect(req);
  if (canon) return canon;

  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Exclure SEO statique (sitemap/robots ne doivent pas passer par auth → évite 500)
     * + assets
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|api/auth|api/health|api/stripe/webhook|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|html)$).*)",
  ],
};
