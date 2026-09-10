export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/content/academy";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/impressum", "/datenschutz"];
  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(locales.map((item) => [item, `${siteUrl}/${item}${page}`])),
      },
    })),
  );
}
