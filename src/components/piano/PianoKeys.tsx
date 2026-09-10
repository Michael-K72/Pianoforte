"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useExperience } from "@/context/experience";
import { usePianoMaterials } from "./materials";

const WHITE = [0, 2, 4, 5, 7, 9, 11, 12];
const BLACK_POS: Record<number, number> = { 1: 0.5, 3: 1.5, 6: 3.5, 8: 4.5, 10: 5.5 };

export function PianoKeys() {
  const { pressedKey, pressKey } = useExperience();
  const { ivory, ebony } = usePianoMaterials();
  const refs = useRef<Record<number, Group | null>>({});
  const whites = useMemo(() => WHITE.map((i, index) => ({ midi: 60 + i, x: index * 0.165 - 0.58 })), []);
  const blacks = useMemo(
    () =>
      Object.entries(BLACK_POS).map(([semi, pos]) => ({
        midi: 60 + Number(semi),
        x: pos * 0.165 - 0.58,
      })),
    [],
  );

  useFrame((_, delta) => {
    const k = 1 - Math.exp(-delta * 18);
    for (const { midi } of [...whites, ...blacks]) {
      const group = refs.current[midi];
      if (!group) continue;
      const goal = pressedKey === midi ? 0.045 : 0;
      group.rotation.x += (goal - group.rotation.x) * k;
    }
  });

  return (
    <group position={[0, 0.64, 1.12]}>
      {whites.map((key) => (
        <group
          key={key.midi}
          ref={(node) => {
            refs.current[key.midi] = node;
          }}
          position={[key.x, 0, 0]}
          onClick={(event) => {
            event.stopPropagation();
            void pressKey(key.midi);
          }}
          onPointerOver={() => {
            document.body.style.cursor = "none";
          }}
        >
          <mesh castShadow>
            <boxGeometry args={[0.15, 0.028, 0.42]} />
            <primitive object={ivory} attach="material" />
          </mesh>
        </group>
      ))}
      {blacks.map((key) => (
        <group
          key={key.midi}
          ref={(node) => {
            refs.current[key.midi] = node;
          }}
          position={[key.x, 0.02, -0.07]}
          onClick={(event) => {
            event.stopPropagation();
            void pressKey(key.midi);
          }}
        >
          <mesh castShadow>
            <boxGeometry args={[0.09, 0.04, 0.26]} />
            <primitive object={ebony} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
