"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics/ga";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;
    window.gtag("config", GA_MEASUREMENT_ID, { page_path });
  }, [pathname, searchParams]);

  return null;
}
