import { getGrapeSitemap } from "@/lib/api/sitemaps/get-sitemaps";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const nodes = await getGrapeSitemap();

  return nodes.map((node) => ({
    url: `${baseUrl}/druvor/${node.slug}`,
    lastModified: node.modifiedGmt ?? undefined,
    priority: 0.5,
  }));
}
