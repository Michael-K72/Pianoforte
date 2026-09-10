"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { SpotLight } from "three";
import { useExperience } from "@/context/experience";

export function PianoLights() {
  const sweep = useRef<SpotLight>(null);
  const { playing, camera, amplitude } = useExperience();

  useFrame(({ clock }) => {
    if (!sweep.current) return;
    const t = clock.elapsedTime;
    sweep.current.position.x = Math.sin(t * 0.35) * 1.6;
    sweep.current.intensity = playing ? 8 + amplitude * 18 : camera === "concert" ? 14 : 5.5;
  });

  return (
    <>
      <ambientLight intensity={0.08} color="#1a1714" />
      <spotLight
        position={[2.4, 3.2, 1.4]}
        angle={0.42}
        penumbra={0.85}
        intensity={18}
        color="#f0e2c4"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        ref={sweep}
        position={[0.2, 2.6, 1.8]}
        angle={0.28}
        penumbra={1}
        intensity={6}
        color="#d7c08a"
      />
      <directionalLight position={[-2.8, 1.6, -1.2]} intensity={2.4} color="#8aa0b8" />
      <pointLight position={[0, 0.4, 1.3]} intensity={2.1} color="#ffe9c4" distance={4} />
    </>
  );
}
