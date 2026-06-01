"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  priority?: boolean;
};

export function BrandMark({ className, priority }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white transition-transform group-hover:scale-105",
        className
      )}
    >
      <Image
        src="/icon.svg"
        alt=""
        width={36}
        height={36}
        className="h-[72%] w-[72%] object-contain"
        priority={priority}
        aria-hidden
      />
    </span>
  );
}
