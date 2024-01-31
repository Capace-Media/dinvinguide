import { WPnext } from "@/lib/wp";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const posts = await WPnext(`
  query MyQuery2 {
    glossaries(first: 100) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
  `);

  const glossarie = posts?.data?.glossaries?.nodes;

  const glossarieURL =
    glossarie?.map((post: any) => {
      return {
        url: `${baseUrl}/ordlistan/${post?.slug}`,
        lastModified: post.modifiedGmt,
        priority: 0.5,
      };
    }) ?? [];

  return [...glossarieURL];
}
