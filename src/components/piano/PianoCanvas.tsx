"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/types";

const Scene = dynamic(() => import("./PianoScene").then((mod) => mod.PianoScene), {
  ssr: false,
  loading: () => <Fallback />,
});

export function PianoCanvas({
  copy,
  showHotspots,
  className,
}: {
  copy: Dictionary["explorer"];
  showHotspots?: boolean;
  className?: string;
}) {
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
    try {
      const canvas = document.createElement("canvas");
      const ok = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
      setWebgl(ok);
    } catch {
      setWebgl(false);
    }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      {webgl ? <Scene copy={copy} showHotspots={showHotspots} /> : <Fallback />}
    </div>
  );
}

function Fallback() {
  return (
    <div className="absolute inset-0 bg-[#050505]">
      <div
        className="absolute left-1/2 top-[46%] h-[38%] w-[78%] max-w-[720px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(200,169,107,0.16), transparent 42%), linear-gradient(160deg, #1a1a1d 0%, #050505 55%, #111 100%)",
          clipPath:
            "polygon(8% 72%, 18% 38%, 48% 18%, 78% 28%, 92% 62%, 86% 86%, 14% 90%)",
          filter: "blur(0.2px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
        }}
      />
      <div className="absolute inset-x-[12%] bottom-[18%] h-px bg-gradient-to-r from-transparent via-[#c8a96b]/40 to-transparent" />
    </div>
  );
}
