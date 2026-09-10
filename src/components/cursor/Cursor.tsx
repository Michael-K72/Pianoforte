"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/i18n/types";
import { useIsTouch } from "@/hooks/useMedia";

export function Cursor({ copy }: { copy: Dictionary["cursor"] }) {
  const touch = useIsTouch();
  const [pos, setPos] = useState({ x: -80, y: -80 });
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (touch) return;
    document.body.setAttribute("data-cursor", "fine");
    const move = (event: PointerEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      const attr = target?.closest("[data-cursor]")?.getAttribute("data-cursor");
      setLabel(attr === "discover" ? copy.discover : attr === "play" ? copy.play : "");
      setActive(Boolean(target?.closest("a, button, [data-cursor]")));
    };
    window.addEventListener("pointermove", move);
    return () => {
      document.body.removeAttribute("data-cursor");
      window.removeEventListener("pointermove", move);
    };
  }, [copy.discover, copy.play, touch]);

  if (touch) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[90] mix-blend-difference"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="grid place-items-center rounded-full border border-[#c8a96b]/70"
        style={{
          width: active ? 44 : 28,
          height: active ? 44 : 28,
          transition: "width .35s cubic-bezier(.22,1,.36,1), height .35s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <span className="h-1 w-1 rounded-full bg-[#f3eee4]" />
      </div>
      {label ? (
        <span className="absolute left-8 top-1 text-[9px] tracking-[0.28em] text-[#c8a96b]">
          {label}
        </span>
      ) : null}
    </div>
  );
}
