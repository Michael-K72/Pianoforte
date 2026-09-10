"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/context/experience";
import { usePerformanceTier } from "@/hooks/useMedia";

export function PianoParticles() {
  const tier = usePerformanceTier();
  const count = tier === "low" ? 40 : tier === "medium" ? 80 : 140;
  const { camera, playing, amplitude } = useExperience();
  const mesh = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const random = (n: number) => { const value = Math.sin(n * 127.1 + 311.7) * 43758.5453; return value - Math.floor(value); };
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (random(i * 3) - 0.5) * 3.2;
      arr[i * 3 + 1] = random(i * 3 + 1) * 2.2;
      arr[i * 3 + 2] = (random(i * 3 + 2) - 0.5) * 3.2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.015;
    const mat = mesh.current.material as THREE.PointsMaterial;
    const concert = camera === "concert" ? 0.55 : 0.22;
    mat.opacity = concert + amplitude * 0.4 + (playing ? 0.08 : 0);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#e8d7ae"
        size={0.012}
        transparent
        opacity={0.28}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
