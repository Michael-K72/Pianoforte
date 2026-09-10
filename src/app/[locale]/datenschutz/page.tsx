import { notFound } from "next/navigation";
import { isLocale } from "@/content/academy";
import { getDictionary } from "@/i18n/get-dictionary";
import { SiteFooter } from "@/components/sections/Editorial";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  return (
    <main className="px-4 pt-32 pb-12 md:px-8">
      <article className="mx-auto max-w-2xl">
        <h1 className="display text-5xl">{dict.legal.privacyTitle}</h1>
        <div className="mt-10 space-y-5 leading-relaxed text-[#f3eee4]/85">
          {dict.legal.privacyBody.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </article>
      <SiteFooter locale={locale} dict={dict} />
    </main>
  );
}
