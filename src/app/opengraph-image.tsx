export const dynamic = "force-static";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "#050505",
          color: "#f3eee4",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 40%, rgba(200,169,107,0.18), transparent 42%)",
          }}
        />
        <div style={{ fontSize: 22, letterSpacing: 10, color: "#9c8152" }}>AKADEMIE FÜR KLAVIER & MUSIK</div>
        <div style={{ fontSize: 96, letterSpacing: 8, marginTop: 18 }}>PIANOFORTE</div>
        <div style={{ fontSize: 28, marginTop: 16, color: "#c8a96b" }}>Küssnacht am Rigi</div>
      </div>
    ),
    { ...size },
  );
}
