"use client";

import { useRef } from "react";
import { useExperience } from "@/context/experience";

export function Button({
  href,
  children,
  variant = "ghost",
  onClick,
  type = "button",
  cursor,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit";
  cursor?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node || event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = node.getBoundingClientRect();
    const x = Math.max(-3.5, Math.min(3.5, (event.clientX - box.left - box.width / 2) * 0.06));
    const y = Math.max(-3.5, Math.min(3.5, (event.clientY - box.top - box.height / 2) * 0.06));
    node.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const className = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"}`;
  const props = {
    className,
    onPointerMove: onMove,
    onPointerLeave: reset,
    "data-cursor": cursor,
  };

  if (href) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export function SoundToggle({ label, on, off }: { label: string; on: string; off: string }) {
  const { audioEnabled, toggleAudio } = useExperience();
  return (
    <button
      type="button"
      onClick={() => void toggleAudio()}
      className="fixed right-4 bottom-4 z-40 min-h-11 px-3 text-[10px] tracking-[0.28em] text-[#c8a96b] md:right-8 md:bottom-8"
      aria-pressed={audioEnabled}
    >
      ♪ {label} {audioEnabled ? on : off}
    </button>
  );
}
