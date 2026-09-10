"use client";

import { Extrude, RoundedBox } from "@react-three/drei";
import { grandShape, usePianoMaterials } from "./materials";

const extrude = {
  steps: 1,
  depth: 0.32,
  bevelEnabled: true,
  bevelThickness: 0.018,
  bevelSize: 0.012,
  bevelSegments: 3,
};

export function PianoBody() {
  const { lacquer, brass, felt } = usePianoMaterials();
  const shape = grandShape();

  return (
    <group>
      <Extrude args={[shape, extrude]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.42, 0]} castShadow receiveShadow>
        <primitive object={lacquer} attach="material" />
      </Extrude>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.445, 0]} receiveShadow>
        <shapeGeometry args={[shape]} />
        <meshPhysicalMaterial color="#141216" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.48, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.05, 1.7]} />
        <primitive object={felt} attach="material" />
      </mesh>
      {[-0.52, 0.52].map((x) => (
        <group key={x} position={[x, 0, -0.85]}>
          <RoundedBox args={[0.09, 0.42, 0.09]} radius={0.012} position={[0, 0.21, 0]} castShadow>
            <primitive object={lacquer} attach="material" />
          </RoundedBox>
        </group>
      ))}
      <RoundedBox args={[0.1, 0.4, 0.1]} radius={0.012} position={[0, 0.2, 0.95]} castShadow>
        <primitive object={lacquer} attach="material" />
      </RoundedBox>
      <mesh position={[0, 0.08, 1.12]}>
        <boxGeometry args={[0.34, 0.04, 0.08]} />
        <primitive object={brass} attach="material" />
      </mesh>
    </group>
  );
}
