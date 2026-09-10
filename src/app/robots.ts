export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/academy";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
