import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/navigation/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { ExperienceProvider } from "@/context/experience";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { isLocale, locales, siteUrl, type Locale } from "@/content/academy";
import { getDictionary } from "@/i18n/get-dictionary";
import { LocaleShell } from "./locale-shell";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  const path = `/${raw}`;
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        de: `${siteUrl}/de`,
        ru: `${siteUrl}/ru`,
        en: `${siteUrl}/en`,
        fr: `${siteUrl}/fr`,
        it: `${siteUrl}/it`,
        "x-default": `${siteUrl}/de`,
      },
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `${siteUrl}${path}`,
      locale: raw,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <ExperienceProvider locale={locale}>
      <SmoothScroll>
        <JsonLd />
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50">
          {dict.a11y.skip}
        </a>
        <Header locale={locale} dict={dict} />
        <div id="inhalt">{children}</div>
        <LocaleShell locale={locale} dict={dict} />
      </SmoothScroll>
    </ExperienceProvider>
  );
}
