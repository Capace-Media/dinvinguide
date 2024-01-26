import { WPnext } from "@/lib/wp";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const data = await WPnext(`
  query getSchools($parent: ID! = "cG9zdDo0Nzc0Mg==") {
    pages(where: {parent: $parent}, first: 40) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
  `);

  const schoolURL =
    data?.data?.pages?.nodes?.map((school: any) => {
      return {
        url: `${baseUrl}/vinskolan/${school.slug}`,
        lastModified: school.modifiedGmt,
        priority: 1,
      };
    }) ?? [];

  return [...schoolURL];
}
