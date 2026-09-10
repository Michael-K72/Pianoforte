export const dynamic = "force-static";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050505",
          color: "#c8a96b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          letterSpacing: -1,
        }}
      >
        PF
      </div>
    ),
    { ...size },
  );
}
