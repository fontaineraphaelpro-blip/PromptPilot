import { ImageResponse } from "next/og";
import { IconMark } from "@/lib/brand/icon-mark-jsx";

export const runtime = "edge";
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<IconMark size={48} />, { ...size });
}
