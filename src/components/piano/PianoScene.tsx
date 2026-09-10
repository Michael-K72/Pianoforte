"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { Dictionary } from "@/i18n/types";
import { usePerformanceTier } from "@/hooks/useMedia";
import { PianoBody } from "./PianoBody";
import { PianoCameraRig } from "./PianoCameraRig";
import { PianoFallboard } from "./PianoFallboard";
import { PianoHotspots } from "./PianoHotspots";
import { PianoPedals, PianoStrings } from "./PianoInterior";
import { PianoKeys } from "./PianoKeys";
import { PianoLid } from "./PianoLid";
import { PianoLights } from "./PianoLights";
import { PianoParticles } from "./PianoParticles";
import { SoundWave } from "./SoundWave";

export function PianoModel({ showHotspots, copy }: { showHotspots?: boolean; copy: Dictionary["explorer"] }) {
  return (
    <group>
      <PianoBody />
      <PianoLid />
      <PianoFallboard />
      <PianoKeys />
      <PianoStrings />
      <PianoPedals />
      {showHotspots ? <PianoHotspots copy={copy} /> : null}
    </group>
  );
}

export function PianoScene({
  copy,
  showHotspots = false,
}: {
  copy: Dictionary["explorer"];
  showHotspots?: boolean;
}) {
  const tier = usePerformanceTier();
  const dpr: [number, number] = tier === "high" ? [1, 1.6] : tier === "medium" ? [1, 1.25] : [1, 1];

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: tier !== "low", alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [1.55, 1.15, 2.35], fov: 32, near: 0.1, far: 30 }}
      shadows={tier !== "low"}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 6, 14]} />
      <Suspense fallback={null}>
        <PianoLights />
        <Environment preset="warehouse" environmentIntensity={0.22} />
        <PianoModel copy={copy} showHotspots={showHotspots} />
        <SoundWave />
        <PianoParticles />
        <PianoCameraRig />
        <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={8} blur={2.4} far={2.5} color="#000" />
      </Suspense>
    </Canvas>
  );
}
