import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { isLocale } from "@/content/academy";
import { getDictionary } from "@/i18n/get-dictionary";
import { Elena, Journey, Lessons, Philosophy, Pricing, SiteFooter } from "@/components/sections/Editorial";
import { Concert, Contact, Explorer, Location, Reviews } from "@/components/sections/Interactive";
import { Hero } from "@/components/sections/Hero";
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const portrait=existsSync(path.join(process.cwd(),"public/images/elena-portrait.webp"))?"/images/elena-portrait.webp":undefined;
  const concertDir=path.join(process.cwd(),"public/images/concerts");
  const images=existsSync(concertDir)?readdirSync(concertDir).filter(f=>/^concert-\d+\.webp$/.test(f)).sort().map(f=>`/images/concerts/${f}`):[];
  return <main><Hero dict={dict}/><Pricing dict={dict} locale={locale}/><Lessons dict={dict} locale={locale}/><Philosophy dict={dict} locale={locale}/><Elena dict={dict} locale={locale} portrait={portrait}/><Explorer dict={dict} locale={locale}/><Journey dict={dict} locale={locale}/><Concert dict={dict} locale={locale} images={images}/><Reviews dict={dict} locale={locale}/><Location dict={dict} locale={locale}/><Contact dict={dict} locale={locale}/><SiteFooter dict={dict} locale={locale}/></main>;
}
