"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/context/experience";
import { usePianoMaterials } from "./materials";

export function PianoStrings() {
  const { lidOpen, amplitude } = useExperience();
  const { stringMat, brass } = usePianoMaterials();
  const group = useRef<THREE.Group>(null);
  const strings = useMemo(
    () => Array.from({ length: 28 }, (_, i) => -0.46 + i * 0.034),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.scale.y = 1 + Math.sin(clock.elapsedTime * 8 + i) * amplitude * 0.35;
    });
  });

  if (!lidOpen) return null;

  return (
    <group ref={group} position={[0, 0.5, 0.05]}>
      {strings.map((x) => (
        <mesh key={x} position={[x, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 1.55, 6]} />
          <primitive object={stringMat} attach="material" />
        </mesh>
      ))}
      <mesh position={[0, 0.02, 0.55]}>
        <boxGeometry args={[1.02, 0.02, 0.04]} />
        <primitive object={brass} attach="material" />
      </mesh>
    </group>
  );
}

export function PianoPedals() {
  const { brass } = usePianoMaterials();
  return (
    <group position={[0, 0.05, 1.16]}>
      {[-0.1, 0, 0.1].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0.35, 0, 0]}>
          <boxGeometry args={[0.05, 0.012, 0.11]} />
          <primitive object={brass} attach="material" />
        </mesh>
      ))}
    </group>
  );
}
