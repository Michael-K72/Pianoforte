"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouch(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return touch;
}

export function usePerformanceTier() {
  const [tier, setTier] = useState<"high" | "medium" | "low">("medium");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    if (mobile || cores <= 4 || memory <= 4) setTier("low");
    else if (cores >= 8 && memory >= 8) setTier("high");
    else setTier("medium");
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return tier;
}
