import { getPostSitemap } from "@/lib/api/sitemaps/get-sitemaps";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const articles = await getPostSitemap();

  const articlesURL = articles.map((post) => ({
    url: `${baseUrl}/skribenter/${post.author?.node?.slug}/${post.slug}`,
    lastModified: post.modifiedGmt ?? undefined,
    priority: 0.5,
  }));

  return [
    {
      url: `${baseUrl}/skribenter/fredrikschelin`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/skribenter/anders`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/skribenter/sofiaander`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/skribenter/magnus`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/skribenter/jesper`,
      lastModified: new Date(),
      priority: 1,
    },
    ...articlesURL,
  ];
}
