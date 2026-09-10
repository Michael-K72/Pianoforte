"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useExperience } from "@/context/experience";
import { usePianoMaterials } from "./materials";

export function PianoFallboard() {
  const { fallboardOpen } = useExperience();
  const ref = useRef<Group>(null);
  const angle = useRef(0);
  const { lacquer } = usePianoMaterials();

  useFrame((_, delta) => {
    if (!ref.current) return;
    const goal = fallboardOpen ? -1.35 : 0;
    const k = 1 - Math.exp(-delta * 3.4);
    angle.current += (goal - angle.current) * k;
    ref.current.rotation.x = angle.current;
  });

  return (
    <group position={[0, 0.73, 1.02]}>
      <group ref={ref}>
        <mesh position={[0, 0.01, -0.09]} castShadow>
          <boxGeometry args={[1.46, 0.035, 0.2]} />
          <primitive object={lacquer} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
