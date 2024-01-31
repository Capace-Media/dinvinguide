import { WPnext } from "@/lib/wp";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const posts = await WPnext(`
  query MyQuery2 {
    drinks(first: 1000) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
  `);

  const drink = posts?.data?.drinks?.nodes;

  const drinkURL =
    drink?.map((post: any) => {
      return {
        url: `${baseUrl}/drycker/${post?.slug}`,
        lastModified: post.modifiedGmt,
        priority: 0.5,
      };
    }) ?? [];

  return [...drinkURL];
}
