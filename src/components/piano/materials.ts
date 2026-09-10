"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function usePianoMaterials() {
  return useMemo(() => {
    const lacquer = new THREE.MeshPhysicalMaterial({
      color: "#0a0a0c",
      metalness: 0.18,
      roughness: 0.12,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      reflectivity: 0.7,
      envMapIntensity: 1.15,
    });
    const ivory = new THREE.MeshPhysicalMaterial({
      color: "#f4efe6",
      roughness: 0.38,
      metalness: 0.02,
    });
    const ebony = new THREE.MeshPhysicalMaterial({
      color: "#16151a",
      roughness: 0.28,
      metalness: 0.08,
    });
    const brass = new THREE.MeshPhysicalMaterial({
      color: "#b08a4a",
      metalness: 0.82,
      roughness: 0.28,
    });
    const stringMat = new THREE.MeshStandardMaterial({
      color: "#cfc6b0",
      metalness: 0.85,
      roughness: 0.25,
    });
    const felt = new THREE.MeshStandardMaterial({
      color: "#4a1d24",
      roughness: 0.9,
    });
    return { lacquer, ivory, ebony, brass, stringMat, felt };
  }, []);
}

export function grandShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.74, -1.18);
  shape.lineTo(0.74, -1.18);
  shape.lineTo(0.74, -0.28);
  shape.bezierCurveTo(0.74, 0.42, 0.52, 1.02, 0.12, 1.32);
  shape.lineTo(-0.08, 1.34);
  shape.bezierCurveTo(-0.58, 1.12, -0.74, 0.22, -0.74, -0.28);
  shape.closePath();
  return shape;
}
