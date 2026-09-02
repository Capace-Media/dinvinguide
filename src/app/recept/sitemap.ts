import WP from "@/lib/wp";

type RecipeNode = {
  slug: string;
  modifiedGmt: string;
};

// Hämtar alla recept via cursor-paginering så att sitemapen inte trunkeras
// när antalet recept växer. maxPages är enbart ett skydd mot oändlig loop.
const getAllRecipes = async (): Promise<RecipeNode[]> => {
  const pageSize = 1000;
  const maxPages = 20;

  const nodes: RecipeNode[] = [];
  let after: string | null = null;

  for (let page = 0; page < maxPages; page++) {
    const res = await WP(
      `query getRecipeSitemap($first: Int!, $after: String) {
        recipes(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            slug
            modifiedGmt
          }
        }
      }`,
      null,
      { first: pageSize, after }
    );

    const recipes = res?.data?.recipes;

    if (!recipes?.nodes) {
      break;
    }

    nodes.push(...recipes.nodes);

    if (!recipes.pageInfo?.hasNextPage || !recipes.pageInfo?.endCursor) {
      break;
    }

    after = recipes.pageInfo.endCursor;
  }

  return nodes;
};

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const recipes = await getAllRecipes();

  const recipeURL = recipes.map((post) => {
    return {
      url: `${baseUrl}/recept/${post?.slug}`,
      lastModified: post.modifiedGmt,
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
