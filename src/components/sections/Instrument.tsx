"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/content/academy";
import { atelier } from "@/i18n/atelier";
const Scene=dynamic(()=>import("@/components/piano/GrandPianoScene").then(m=>m.GrandPianoScene),{ssr:false});
class SceneBoundary extends Component<{children:ReactNode;onError:()=>void},{failed:boolean}>{
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  componentDidCatch(){this.props.onError();}
  render(){return this.state.failed?null:this.props.children;}
}
export function Explorer({dict,locale="de"}:{dict:Dictionary;locale?:Locale}){
  const copy=atelier[locale];
  const root=useRef<HTMLElement>(null);
  const [progress,setProgress]=useState(0);
  const [manual,setManual]=useState<number|null>(null);
  const [near,setNear]=useState(false);
  const [active,setActive]=useState(false);
  const [reduced,setReduced]=useState(false);
  const [ready,setReady]=useState(false);
  const [failed,setFailed]=useState(false);
  const onReady=useCallback(()=>setReady(true),[]);
  const onError=useCallback(()=>setFailed(true),[]);
  useEffect(()=>{
    const node=root.current;if(!node)return;
    const motion=matchMedia("(prefers-reduced-motion: reduce)");
    const check=()=>setReduced(motion.matches);check();motion.addEventListener("change",check);
    let visible=false,frame=0,checked=false;
    const shortScreen=matchMedia("(max-height: 780px)");
    const visibility=()=>setActive(visible&&!document.hidden);
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){if(!checked){checked=true;try{const canvas=document.createElement("canvas");const gl=canvas.getContext("webgl2");if(!gl)setFailed(true);else gl.getExtension("WEBGL_lose_context")?.loseContext();}catch{setFailed(true);}}setNear(true);}visibility();},{rootMargin:"250px"});
    observer.observe(node);
    const update=()=>{frame=0;if(motion.matches||shortScreen.matches)return;const rect=node.getBoundingClientRect();const p=Math.max(0,Math.min(1,-rect.top/(node.offsetHeight-innerHeight)));setProgress(previous=>Math.abs(previous-p)>.001?p:previous);};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    addEventListener("scroll",scroll,{passive:true});document.addEventListener("visibilitychange",visibility);
    update();
    return()=>{observer.disconnect();removeEventListener("scroll",scroll);document.removeEventListener("visibilitychange",visibility);motion.removeEventListener("change",check);cancelAnimationFrame(frame);};
  },[]);
  const previousProgress=useRef(progress);
  useEffect(()=>{if(Math.abs(previousProgress.current-progress)>.025){setManual(null);previousProgress.current=progress;}},[progress]);
  const shown=manual===null?progress:manual/3;
  const index=Math.min(3,Math.round(shown*3));
  const chapters=[{title:copy.overview,text:copy.instrumentIntro},{title:copy.keyboard,text:copy.keyboardText},{title:copy.strings,text:copy.stringsText},{title:copy.pedals,text:copy.pedalText}];
  return <section ref={root} id="instrument" className={`instrument-scroll ${reduced?"motion-reduced":""}`}>
    <div className="instrument-sticky">
      <div className="instrument-top page-width"><p className="eyebrow">05 / {copy.detail}</p><span className="instrument-instruction">{copy.explore}</span></div>
      <div className="instrument-canvas">
        <div className={`instrument-fallback ${ready&&!failed?"is-loaded":""}`}><Image src="/images/piano-hero.webp" alt="" fill sizes="(max-width:800px) 100vw, 72vw" /></div>
        {near&&!failed?<SceneBoundary onError={onError}><Scene progress={shown} active={active} reduced={reduced} onReady={onReady}/></SceneBoundary>:null}
      </div>
      <div className="instrument-copy page-width"><h2 className="display">{copy.instrument}</h2><div className="instrument-caption" key={index}><p className="eyebrow">0{index+1} / {chapters[index].title}</p><p>{chapters[index].text}</p></div></div>
      <div className="instrument-bottom page-width"><div className="instrument-chapters" role="group" aria-label={dict.explorer.title}>{chapters.map((chapter,i)=><button key={chapter.title} onClick={()=>setManual(i)} aria-pressed={i===index}><span className="chapter-track"><span style={{transform:`scaleX(${Math.max(0,Math.min(1,shown*4-i))})`}} /></span><span className="chapter-name"><span>0{i+1}</span>{chapter.title}</span></button>)}</div><span className="sr-only" role="status">{failed?copy.modelFallback:!ready?copy.loading:""}</span></div>
    </div>
  </section>;
}
