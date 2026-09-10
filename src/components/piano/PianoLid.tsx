"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useExperience } from "@/context/experience";
import { grandShape, usePianoMaterials } from "./materials";
import { Extrude } from "@react-three/drei";

export function PianoLid() {
  const { lidOpen } = useExperience();
  const ref = useRef<Group>(null);
  const angle = useRef(0);
  const { lacquer } = usePianoMaterials();
  const shape = grandShape();

  useFrame((_, delta) => {
    if (!ref.current) return;
    const goal = lidOpen ? -1.05 : 0;
    const k = 1 - Math.exp(-delta * 3.1);
    angle.current += (goal - angle.current) * k;
    ref.current.rotation.x = angle.current;
  });

  return (
    <group position={[0, 0.74, -0.08]}>
      <group ref={ref} position={[0, 0, -1.05]}>
        <group position={[0, 0, 1.05]}>
          <Extrude
            args={[shape, { depth: 0.028, bevelEnabled: false }]}
            rotation={[-Math.PI / 2, 0, 0]}
            castShadow
          >
            <primitive object={lacquer} attach="material" />
          </Extrude>
        </group>
      </group>
      {lidOpen ? (
        <mesh position={[-0.42, 0.38, 0.15]} rotation={[0.55, 0, 0.12]} castShadow>
          <boxGeometry args={[0.03, 0.55, 0.03]} />
          <primitive object={lacquer} attach="material" />
        </mesh>
      ) : null}
    </group>
  );
}
