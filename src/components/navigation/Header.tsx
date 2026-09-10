"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { academy, localeLabels, localeNames, locales, telHref, type Locale } from "@/content/academy";
import type { Dictionary } from "@/i18n/types";
const priceLabels = { de: "Preise", en: "Pricing", fr: "Tarifs", it: "Tariffe", ru: "Цены" };
export function Wordmark({ href }: { href: string }) {
  return <Link href={href} className="wordmark"><span className="display">{academy.brand}</span><span>AKADEMIE</span></Link>;
}
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const suffix = pathname.replace(/^\/(de|en|fr|it|ru)/, "");
  return <nav aria-label="Language" className="languages">{locales.map(item => <Link key={item} href={`/${item}${suffix}`} hrefLang={item} title={localeNames[item]} aria-current={locale === item ? "page" : undefined}>{localeLabels[item]}</Link>)}</nav>;
}
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: `/${locale}/#unterricht`, label: dict.nav.lessons },
    { href: `/${locale}/#preise`, label: priceLabels[locale] },
    { href: `/${locale}/#elena`, label: dict.nav.elena },
    { href: `/${locale}/#instrument`, label: dict.explorer.title.replace(".", "") },
    { href: `/${locale}/#kontakt`, label: dict.nav.contact },
  ];
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update(); addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const menu = dialog.current;
    if (!menu) return;
    if (open) { menu.showModal(); document.body.style.overflow = "hidden"; }
    else { menu.close(); document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => { const menu=dialog.current; if(menu?.open)menu.close(); }, [pathname]);
  const close = () => { setOpen(false); button.current?.focus(); };
  return <>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}><div className="header-inner page-width">
      <Wordmark href={`/${locale}/`} />
      <nav className="desktop-nav" aria-label={dict.nav.menu}>{links.map(link => <Link key={link.href} href={link.href} className="text-link">{link.label}</Link>)}</nav>
      <div className="header-actions"><div className="desktop-languages"><LanguageSwitch locale={locale} /></div><a href={telHref()} className="header-call">{dict.contact.call}<span>↗</span></a><button ref={button} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}>{dict.nav.menu}<span className="menu-lines" aria-hidden="true" /></button></div>
    </div></header>
    <dialog ref={dialog} data-lenis-prevent id="mobile-navigation" className="mobile-menu" onCancel={close} onClose={() => setOpen(false)} aria-label={dict.nav.menu}>
      <div className="mobile-menu-head"><Wordmark href={`/${locale}/`} /><button onClick={close} className="menu-close">{dict.nav.close} ×</button></div>
      <nav>{links.map((link,i) => <Link key={link.href} href={link.href} onClick={close} style={{ animationDelay: `${i * 60}ms` }}><span>0{i+1}</span>{link.label}</Link>)}</nav>
      <LanguageSwitch locale={locale} /><a className="mobile-phone" href={telHref()}>{academy.phone.international}</a>
    </dialog>
  </>;
}
