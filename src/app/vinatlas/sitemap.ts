import { getWineAtlasSitemap } from "@/lib/api/sitemaps/get-sitemaps";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const regions = await getWineAtlasSitemap();

  return regions.flatMap((region) => [
    {
      url: `${baseUrl}/vinatlas/${region.slug}`,
      lastModified: region.modifiedGmt ?? undefined,
      priority: 0.8,
    },
    ...(region.children?.nodes ?? []).map((child) => ({
      url: `${baseUrl}/vinatlas/${region.slug}/${child.slug}`,
      lastModified: child.modifiedGmt ?? undefined,
      priority: 0.5,
    })),
  ]);
}
