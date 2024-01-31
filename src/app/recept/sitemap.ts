import { WPnext } from "@/lib/wp";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const posts = await WPnext(`
  query MyQuery2 {
    recipes(first: 1000) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
  `);

  const recipe = posts?.data?.recipes?.nodes;

  const recipeURL =
    recipe?.map((post: any) => {
      return {
        url: `${baseUrl}/recept/${post?.slug}`,
        lastModified: post.modifiedGmt,
        priority: 0.8,
      };
    }) ?? [];

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
