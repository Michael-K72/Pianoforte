"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { academy, telHref, whatsappHref } from "@/content/academy";
import { useExperience } from "@/context/experience";
import type { Dictionary } from "@/i18n/types";
import { Button } from "@/components/ui/Button";

export function Hero({ dict }: { dict: Dictionary }) {
  const { locale } = useExperience();
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = root.current;
      if (!node) return;
      const progress = media.matches ? 0 : Math.min(1, Math.max(0, -node.getBoundingClientRect().top / node.offsetHeight));
      node.style.setProperty("--hero-progress", String(progress));
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener("scroll", scroll, { passive: true });
    media.addEventListener("change", scroll);
    update();
    return () => { removeEventListener("scroll", scroll); media.removeEventListener("change", scroll); cancelAnimationFrame(frame); };
  }, []);
  return (
    <section ref={root} className="hero-stage">
      <div className="hero-photograph"><Image src="/images/piano-hero.webp" alt="" fill priority sizes="100vw" className="hero-image" /></div>
      <div className="hero-shade" />
      <div className="hero-headline page-width">
        <p className="eyebrow">{dict.hero.kicker}<span>{dict.hero.place}</span></p>
        <h1 className="display">{dict.hero.title}</h1>
      </div>
      <div className="hero-body page-width">
        <div className="hero-copy">
          <span className="short-rule" />
          <p className="hero-line">{dict.hero.line}</p>
          <p className="hero-teacher">Elena Vinogradova · {dict.nav.lessons}</p>
          <div className="hero-actions"><Button href={whatsappHref(locale)} variant="primary">{dict.contact.trial}</Button><a className="text-link" href={telHref()}>{academy.phone.display}</a></div>
        </div>
      </div>
      <div className="hero-bottom page-width"><a href="#preise" className="scroll-link"><span className="scroll-circle">↓</span>{dict.hero.secondary}</a><a href="#preise" className="hero-price"><span>{dict.pricing.items[0].title} · 30 {dict.pricing.minutes}</span><span>CHF <strong>46</strong></span></a></div>
    </section>
  );
}
