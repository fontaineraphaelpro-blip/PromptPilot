import { ImageResponse } from "next/og";
import { APP_NAME } from "@/lib/constants";
import { IconMark } from "@/lib/brand/icon-mark-jsx";

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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background: "linear-gradient(145deg, #050505 0%, #121218 45%, #0a0a0a 100%)",
          color: "white",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", flexShrink: 0 }}>
          <IconMark size={200} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 720,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              marginBottom: 20,
              letterSpacing: -2,
            }}
          >
            {APP_NAME}
          </div>
          <div style={{ fontSize: 30, opacity: 0.88, lineHeight: 1.35 }}>
            Prompts IA experts · Score /100 · 12+ outils · 30 secondes
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
