"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/content/academy";
import { atelier } from "@/i18n/atelier";
export function Philosophy({ dict, locale="de" }: { dict: Dictionary; locale?: Locale }) {
  const root=useRef<HTMLElement>(null);
  const [active,setActive]=useState(0);
  const [manual,setManual]=useState<{index:number;atActive:number}|null>(null);
  useEffect(()=>{
    const node=root.current;if(!node)return;
    const media=matchMedia("(prefers-reduced-motion: reduce), (max-width: 800px)");
    let frame=0;
    const update=()=>{frame=0;if(media.matches)return;const rect=node.getBoundingClientRect();const p=Math.max(0,Math.min(1,-rect.top/(node.offsetHeight-innerHeight)));node.style.setProperty("--philosophy",String(p));setActive(Math.min(dict.philosophy.items.length-1,Math.floor(p*dict.philosophy.items.length)));};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    addEventListener("scroll",scroll,{passive:true});media.addEventListener("change",scroll);update();
    return()=>{removeEventListener("scroll",scroll);media.removeEventListener("change",scroll);cancelAnimationFrame(frame);};
  },[dict.philosophy.items.length]);
  const selected=manual?.atActive===active?manual.index:active;
  return <section ref={root} id="akademie" className="philosophy-scroll"><div className="philosophy-sticky page-width">
    <div className="philosophy-image"><Image src="/images/piano-detail.webp" alt="" fill sizes="(max-width:800px) 100vw, 55vw"/><div className="philosophy-image-shade" /></div>
    <div className="philosophy-copy"><p className="eyebrow">03 / {atelier[locale].philosophyLabel}</p><h2 className="display editorial-title">{atelier[locale].philosophy}</h2><p className="section-lead">{dict.philosophy.lead}</p>
      <div className="principles">{dict.philosophy.items.map((item,i)=><div key={item.title} className={`principle ${selected===i?"active":""}`}><button onClick={()=>setManual({index:i,atActive:active})} aria-expanded={selected===i} aria-controls={`principle-${i}`}><span className="measure">0{i+1}</span><span className="display">{item.title}</span><span className="principle-indicator" aria-hidden="true">↗</span></button><p id={`principle-${i}`} hidden={selected!==i}>{item.text}</p></div>)}</div>
    </div><div className="philosophy-progress" aria-hidden="true"><span /></div>
  </div></section>;
}
