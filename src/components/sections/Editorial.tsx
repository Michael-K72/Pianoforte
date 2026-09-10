import Image from "next/image";
import { academy, telHref, whatsappHref, type Locale } from "@/content/academy";
import type { Dictionary } from "@/i18n/types";
import { atelier } from "@/i18n/atelier";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
export { Philosophy } from "./Philosophy";

export function Lessons({ dict, locale = "de" }: { dict: Dictionary; locale?: Locale }) {
  const copy=atelier[locale];
  return <section id="unterricht" className="lessons-section section-space page-width">
    <ScrollReveal className="section-heading"><p className="eyebrow">02 / {copy.lessonsLabel}</p><h2 className="display editorial-title">{dict.lessons.title}</h2><p className="section-lead">{dict.lessons.lead}</p></ScrollReveal>
    <div className="lesson-list">{dict.lessons.items.map((item,i)=><details key={item.title} open={i===0} className="lesson-row"><summary><span className="measure">0{i+1}</span><h3>{item.title}</h3><span className="accordion-sign" aria-hidden="true" /></summary><div className="lesson-answer"><p>{i===3?copy.studio:item.text}</p></div></details>)}</div>
  </section>;
}
export function Elena({ dict, locale="de", portrait }: { dict: Dictionary; locale?: Locale; portrait?: string }) {
  const copy=atelier[locale];
  return <section id="elena" className="elena-section section-space">
    <div className="page-width elena-grid">
      <ScrollReveal><p className="eyebrow">04 / {copy.teacherLabel}</p><h2 className="display elena-name">{academy.teacher.firstName}<br/><span>{academy.teacher.lastName}</span></h2><p className="elena-lead">{dict.elena.lead}</p><p className="section-lead">{dict.elena.body}</p><Button href={whatsappHref(locale)}>{dict.contact.trial}</Button></ScrollReveal>
      <div className="elena-right">{portrait?<div className="portrait-frame"><Image src={portrait} alt={academy.teacher.name} fill sizes="(max-width: 900px) 90vw, 40vw" className="portrait-image" /></div>:<div className="teacher-credential"><span className="credential-serif">MAS</span><span className="eyebrow">Zürcher Hochschule der Künste</span><p>Master of Advanced Studies<br/>ZFH in Musikpraxis</p></div>}
      <ol className="teacher-timeline">{dict.elena.timeline.map((item,i)=><li key={item.title}><span className="measure">{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="timeline-dot" aria-hidden="true">{String(i+1).padStart(2,"0")}</span></li>)}</ol></div>
    </div>
  </section>;
}
export function Journey({ dict, locale="de" }: { dict: Dictionary; locale?: Locale }) {
  return <section className="journey-section section-space page-width"><ScrollReveal><p className="eyebrow">06 / PIANOFORTE</p><h2 className="display editorial-title">{atelier[locale].journey}</h2></ScrollReveal><ol className="journey-list">{dict.journey.stages.map((stage,i)=><li key={stage.n}><ScrollReveal delay={i*65}><span className="journey-number">{stage.n}</span><h3>{stage.title}</h3><p>{stage.text}</p></ScrollReveal></li>)}</ol></section>;
}
export function Pricing({ dict, locale="de" }: { dict: Dictionary; locale?: Locale }) {
  const copy=atelier[locale];
  const items=[academy.pricing.children30,academy.pricing.adults45,academy.pricing.package60];
  return <section id="preise" className="pricing-section section-space">
    <div className="page-width">
      <ScrollReveal className="pricing-heading"><div><p className="eyebrow">01 / {copy.pricing}</p><h2 className="display editorial-title">{copy.pricingTitle}</h2></div><p className="section-lead">{copy.pricingLead}</p></ScrollReveal>
      <div className="price-grid">{items.map((item,i)=><ScrollReveal key={dict.pricing.items[i].id} delay={i*70}><article className="price-item"><div className="price-item-top"><h3>{dict.pricing.items[i].title}</h3><span className="measure">0{i+1}</span></div><p className="price-amount"><span>CHF</span>{item.amount}</p><p className="price-duration">{"lessons" in item?`${item.lessons} × ${item.duration}`:item.duration} {dict.pricing.minutes}</p><a href={whatsappHref(locale)} className="price-contact">{dict.contact.trial}<span aria-hidden="true">↗</span></a></article></ScrollReveal>)}</div>
      <div className="pricing-foot"><span>{academy.teacher.name} · {academy.location.city}</span><a href={telHref()}>{dict.contact.call}: {academy.phone.display}</a></div>
    </div>
  </section>;
}
export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return <footer className="site-footer page-width"><div className="footer-top"><a href={`/${locale}/`} className="footer-wordmark display">Pianoforte</a><p>{dict.footer.tagline}<br/>{academy.location.city}</p><a href={telHref()}>{academy.phone.international}</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {dict.footer.copyright}</span><nav aria-label={dict.nav.impressum}><a href={`/${locale}/impressum/`}>{dict.nav.impressum}</a><a href={`/${locale}/datenschutz/`}>{dict.nav.privacy}</a><a href="#inhalt" aria-label={dict.a11y.skip}>↑</a></nav></div></footer>;
}
