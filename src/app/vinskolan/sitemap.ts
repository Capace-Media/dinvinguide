import { getWineSchoolSitemap } from "@/lib/api/sitemaps/get-sitemaps";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const schools = await getWineSchoolSitemap();

  return schools.map((school) => ({
    url: `${baseUrl}/vinskolan/${school.slug}`,
    lastModified: school.modifiedGmt ?? undefined,
    priority: 1,
  }));
}
