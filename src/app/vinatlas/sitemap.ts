import { WPnext } from "@/lib/wp";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const posts = await WPnext(`
  query MyQuery2($parent: ID! = "cG9zdDo0NzcyMQ==") {
    pages(where: {parent: $parent}, first: 50) {
      nodes {
        slug
        modifiedGmt
        children(first: 50) {
          nodes {
            slug
            modifiedGmt
          }
        }
      }
    }
  }
  `);

  const wineAtlas = posts?.data?.pages?.nodes;

  async function createSitemap(wineAtlas: any) {
    let array: any[] = [];

    wineAtlas &&
      wineAtlas.map((post: any) => {
        array.push({
          url: `${baseUrl}/vinatlas/${post?.slug}`,
          lastModified: post.modifiedGmt,
          priority: 0.8,
        });

        post?.children.nodes &&
          post?.children.nodes?.map((child: any) => {
            array.push({
              url: `${baseUrl}/vinatlas/${post?.slug}/${child.slug}`,
              lastModified: child.modifiedGmt,
              priority: 0.5,
            });
          });
      });

    return array;
  }

  const myArray = await createSitemap(wineAtlas);

  return myArray;
}
