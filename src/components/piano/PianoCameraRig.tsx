"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useExperience } from "@/context/experience";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

export function PianoCameraRig() {
  const { camera, lidOpen } = useExperience();
  const reduced = usePrefersReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const mobile = state.size.width < 768;
    let pos: [number, number, number];
    let look: [number, number, number];
    if (camera === "song") {
      pos = mobile ? [0.2, 0.95, 1.55] : [0.35, 0.72, 1.85];
      look = [0, 0.18, 0.1];
    } else if (camera === "explorer" || camera === "lid") {
      pos = lidOpen || camera === "lid" ? [0.15, 1.55, 1.1] : mobile ? [0.05, 1.05, 1.45] : [0.85, 0.95, 1.55];
      look = [0, 0.28, 0.05];
    } else if (camera === "concert") {
      pos = [0, 1.4, 3.2];
      look = [0, 0.4, 0];
    } else {
      pos = mobile ? [0.15, 1.15, 1.85] : [1.55, 1.15, 2.35];
      look = mobile ? [0, 0.28, 0.05] : [0, 0.22, -0.15];
    }

    const px = reduced ? 0 : pointer.current.x * 0.12;
    const py = reduced ? 0 : pointer.current.y * 0.06;
    const speed = 1 - Math.exp(-delta * 2.4);
    state.camera.position.x += (pos[0] + px - state.camera.position.x) * speed;
    state.camera.position.y += (pos[1] - py - state.camera.position.y) * speed;
    state.camera.position.z += (pos[2] - state.camera.position.z) * speed;
    state.camera.lookAt(look[0], look[1], look[2]);
  });

  return null;
}
