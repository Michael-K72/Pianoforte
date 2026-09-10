"use client";
import { useEffect, useRef, type ReactNode } from "react";
export function ScrollReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const bounds=node.getBoundingClientRect();
    if(bounds.top<innerHeight && bounds.bottom>0)return;
    node.classList.add("reveal-pending");
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { node.classList.remove("reveal-pending"); observer.disconnect(); }
    }, { threshold: .08 });
    observer.observe(node);
    return () => { observer.disconnect(); node.classList.remove("reveal-pending"); };
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
