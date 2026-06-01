import { ImageResponse } from "next/og";
import { APP_NAME } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${APP_NAME} — Prompts IA experts`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          color: "white",
          padding: 48,
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, marginBottom: 16 }}>{APP_NAME}</div>
        <div style={{ fontSize: 28, opacity: 0.85, textAlign: "center", maxWidth: 900 }}>
          Prompts IA experts · Score /100 · 12+ outils · 30 secondes
        </div>
      </div>
    ),
    { ...size }
  );
}
