/** JSX pour ImageResponse (favicon, apple-icon, OG) — styles inline uniquement */

type IconMarkProps = {
  size: number;
};

export function IconMark({ size }: IconMarkProps) {
  const pad = Math.round(size * 0.1);
  const inner = size - pad * 2;
  const radius = Math.round(inner * 0.24);
  const fontSize = Math.round(inner * 0.38);
  const spark = Math.max(4, Math.round(size * 0.11));
  const sparkOffset = Math.round(pad * 0.65);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
      }}
    >
      <div
        style={{
          width: inner,
          height: inner,
          borderRadius: radius,
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize,
            fontWeight: 800,
            color: "#000000",
            letterSpacing: -fontSize * 0.08,
            lineHeight: 1,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          }}
        >
          PP
        </div>
        <div
          style={{
            position: "absolute",
            top: sparkOffset,
            right: sparkOffset,
            width: spark,
            height: spark,
            borderRadius: spark,
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: Math.round(spark * 0.35),
              height: Math.round(spark * 0.35),
              borderRadius: 2,
              background: "#ffffff",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
