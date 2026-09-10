"use client";

import { Html } from "@react-three/drei";
import { useExperience } from "@/context/experience";
import type { Dictionary } from "@/i18n/types";

export function PianoHotspots({ copy }: { copy: Dictionary["explorer"] }) {
  const { toggleLid, toggleFallboard, lidOpen, fallboardOpen, setCamera } = useExperience();

  return (
    <group>
      <Hotspot position={[0.55, 1.05, -0.2]} label={copy.lid.title} onClick={() => { toggleLid(); setCamera("lid"); }} active={lidOpen} />
      <Hotspot position={[0.72, 0.82, 1.05]} label={copy.fallboard.title} onClick={toggleFallboard} active={fallboardOpen} />
      <Hotspot position={[-0.72, 0.72, 1.12]} label={copy.keys.title} onClick={() => setCamera("explorer")} />
      <Hotspot position={[0.2, 0.22, 1.22]} label={copy.pedals.title} onClick={() => setCamera("explorer")} />
    </group>
  );
}

function Hotspot({
  position,
  label,
  onClick,
  active,
}: {
  position: [number, number, number];
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <group position={position}>
      <Html center distanceFactor={7} zIndexRange={[20, 0]}>
        <button
          type="button"
          onClick={onClick}
          className="group flex min-h-11 min-w-11 items-center gap-3 bg-transparent text-left"
          data-cursor="discover"
        >
          <span
            className="relative grid h-3 w-3 place-items-center"
            style={{
              border: "1px solid #c8a96b",
              borderRadius: "999px",
              boxShadow: active ? "0 0 0 4px rgba(200,169,107,0.18)" : undefined,
            }}
          >
            <span className="absolute inset-[-6px] animate-ping rounded-full border border-[#c8a96b] opacity-20" />
          </span>
          <span className="max-w-0 overflow-hidden text-[10px] tracking-[0.22em] text-[#f3eee4] uppercase opacity-0 transition-all duration-500 group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100">
            {label}
          </span>
        </button>
      </Html>
    </group>
  );
}
