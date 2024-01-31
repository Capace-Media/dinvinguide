import { WPnext } from "@/lib/wp";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const posts = await WPnext(`
  query getGrapes {
    grapes(first: 1000) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
  `);

  const grape = posts?.data?.grapes?.nodes;

  const grapeURL =
    grape?.map((post: any) => {
      return {
        url: `${baseUrl}/druvor/${post?.slug}`,
        lastModified: post.modifiedGmt,
        priority: 0.5,
      };
    }) ?? [];

  return [...grapeURL];
}
