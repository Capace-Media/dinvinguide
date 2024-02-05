import { WPnext } from "@/lib/wp";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const posts = await WPnext(`
  query getdrinktips {
    drinktips(first: 1000) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
  `);

  const drinkTips = posts?.data?.drinktips?.nodes;

  const drinkTipsURL =
    drinkTips?.map((post: any) => {
      return {
        url: `${baseUrl}/dryckestips/${post?.slug}`,
        lastModified: post.modifiedGmt,
        priority: 0.8,
      };
    }) ?? [];

  return [...drinkTipsURL];
}
