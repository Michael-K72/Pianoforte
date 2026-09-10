"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { academy, telHref, whatsappHref, type Locale } from "@/content/academy";
import type { Dictionary } from "@/i18n/types";
import { atelier } from "@/i18n/atelier";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
export { Explorer } from "./Instrument";
export function Concert({dict,locale="de",images=[]}:{dict:Dictionary;locale?:Locale;images?:string[]}){
  const dialog=useRef<HTMLDialogElement>(null);
  const [selected,setSelected]=useState("");
  return <section id="konzerte" className="concert-section">
    <div className="concert-backdrop"><Image src="/images/piano-hero.webp" alt="" fill sizes="100vw"/></div>
    <div className="concert-content page-width"><ScrollReveal><p className="eyebrow">07 / {dict.nav.concerts}</p><h2 className="display">{atelier[locale].concert}</h2><div className="concert-bottom-copy"><span className="concert-numeral">02<span> / {dict.nav.concerts}</span></span><div><p className="concert-line">{dict.concert.line}</p><p>{dict.concert.body}</p></div></div></ScrollReveal>
    {images.length>0?<div className="concert-gallery">{images.map((src,i)=><button key={src} aria-label={`${dict.nav.concerts} ${i+1}`} onClick={()=>{setSelected(src);dialog.current?.showModal();}}><Image src={src} alt={`${dict.nav.concerts} · Pianoforte Akademie`} width={900} height={600}/></button>)}</div>:null}</div>
    <dialog ref={dialog} className="gallery-dialog" aria-label={dict.nav.concerts}><button onClick={()=>dialog.current?.close()}>{dict.nav.close} ×</button>{selected?<Image src={selected} alt={dict.nav.concerts} width={1600} height={1100}/>:null}</dialog>
  </section>;
}
export function Reviews({dict,locale="de"}:{dict:Dictionary;locale?:Locale}){
  const [index,setIndex]=useState(0);const item=dict.reviews.items[index];
  const touch=useRef<number|null>(null);
  return <section className="reviews-section section-space page-width"><p className="eyebrow">08 / {atelier[locale].reviewsLabel}</p><h2 className="sr-only">{dict.reviews.title}</h2><div className="review-layout"><span className="quote-mark" aria-hidden="true">“</span><div><div className="review-copy" aria-live="polite" onTouchStart={e=>{touch.current=e.touches[0].clientX;}} onTouchEnd={e=>{if(touch.current===null)return;const dx=e.changedTouches[0].clientX-touch.current;if(Math.abs(dx)>50)setIndex(i=>(i+(dx<0?1:dict.reviews.items.length-1))%dict.reviews.items.length);touch.current=null;}}><p className="review-quote display" key={index}>{item.text}</p><p className="review-author">{item.name}<span>{item.role}</span></p></div><div className="review-controls"><p>{dict.reviews.paraphrase}</p><div>{dict.reviews.items.map((entry,i)=><button key={entry.name} aria-label={`${atelier[locale].slide} ${i+1}: ${entry.name}`} aria-pressed={index===i} onClick={()=>setIndex(i)}><span /></button>)}</div></div></div></div></section>;
}
export function Location({dict,locale="de"}:{dict:Dictionary;locale?:Locale}){
  const [open,setOpen]=useState(false);
  return <section className="location-section section-space page-width"><ScrollReveal className="location-copy"><p className="eyebrow">09 / {atelier[locale].locationLabel}</p><h2 className="display editorial-title">{dict.location.title}</h2><address>{academy.brandFull}<br/>{academy.location.street}<br/>{academy.location.zip} {academy.location.city}</address><Button href={academy.location.mapsUrl}>{dict.location.route}</Button></ScrollReveal><div className="map-frame">{open?<iframe title={dict.location.title} loading="lazy" referrerPolicy="no-referrer" src={`https://maps.google.com/maps?q=${encodeURIComponent(academy.location.mapsQuery)}&z=15&output=embed`}/>:<div className="map-cover"><span className="map-postcode display">6403</span><p>{academy.location.city}</p><button type="button" className="btn btn-ghost" onClick={()=>setOpen(true)}>{dict.location.loadMap}</button><p className="map-note">{dict.location.privacyNote}</p></div>}</div></section>;
}
export function Contact({dict,locale}:{dict:Dictionary;locale:Locale}){
  return <section id="kontakt" className="contact-section section-space page-width"><ScrollReveal><p className="eyebrow">10 / {atelier[locale].contactLabel}</p><h2 className="display">{dict.contact.title}</h2><div className="contact-grid"><p>{atelier[locale].contactLead}</p><div><a className="contact-phone display" href={telHref()}>{academy.phone.international}</a><div className="contact-actions"><Button href={telHref()} variant="primary">{dict.contact.call}</Button><Button href={whatsappHref(locale)}>{dict.contact.whatsapp}</Button></div></div></div></ScrollReveal></section>;
}
