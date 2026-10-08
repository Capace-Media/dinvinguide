import { getRecipeSitemap } from "@/lib/api/sitemaps/get-sitemaps";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const recipes = await getRecipeSitemap();

  const recipeURL = recipes.map((post) => {
    return {
      url: `${baseUrl}/recept/${post?.slug}`,
      lastModified: post.modifiedGmt ?? undefined,
      priority: 0.8,
    };
  });

  return [
    {
      url: `${baseUrl}/recept/drycker`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/recept/ingrediens`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/recept/maltider`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/recept/receptbanken`,
      lastModified: new Date(),
      priority: 1,
    },
    ...recipeURL,
  ];
}
