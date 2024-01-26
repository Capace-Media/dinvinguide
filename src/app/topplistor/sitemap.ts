import { getToplistPaths } from "@/lib/queries/getTopListDrinks";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const data = await getToplistPaths();

  const topplistorURL =
    data?.map((topList: any) => {
      return {
        url: `${baseUrl}/topplistor/${topList.slug}`,
        lastModified: topList.modifiedGmt,
        priority: 1,
      };
    }) ?? [];

  return [...topplistorURL];
}
