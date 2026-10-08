import { getToplistPaths } from "@/lib/api/drinks/get-drinks";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const data = await getToplistPaths();

  return data.map((topList) => ({
    url: `${baseUrl}/topplistor/${topList.slug}`,
    lastModified: topList.modifiedGmt ?? undefined,
    priority: 1,
  }));
}
