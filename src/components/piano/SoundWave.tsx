"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/context/experience";
import { readAmplitude } from "@/lib/audio";

export function SoundWave() {
  const { playing, setAmplitude } = useExperience();
  const mesh = useRef<THREE.Mesh>(null);


  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const geometry = mesh.current.geometry;
    const amp = playing ? readAmplitude() : 0.012;
    setAmplitude(amp);
    const pos = geometry.attributes.position;
    const t = clock.elapsedTime;
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave =
        Math.sin(x * 3.2 + t * 1.4) * 0.045 +
        Math.sin(x * 7.5 - t * 2.1) * amp * 0.9 +
        y * amp * 0.15;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
    if (mesh.current) {
      const mat = mesh.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.18 + amp * 0.7;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0.95, 0.2]} rotation={[-0.42, 0.2, 0]}>
      <planeGeometry args={[3.4, 0.7, 96, 12]} />
      <meshBasicMaterial
        color="#c8a96b"
        transparent
        opacity={0.22}
        side={THREE.DoubleSide}
        depthWrite={false}
        wireframe
      />
    </mesh>
  );
}
