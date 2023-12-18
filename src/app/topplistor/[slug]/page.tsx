import TopListTemplate from "@/components/Templates/TopListTemplate";
import { getToplistPaths, getToplists } from "@/lib/queries/getTopListDrinks";

interface Params {
  slug: string;
}

interface TopList {
  toplist: {
    uri: string;
    acf_toplists: {
      ekologiskt: boolean;
      dryckestyper: string[];
      forpackningar: string[];
    };
  };
}
export const dynamicParams = false;

export async function generateStaticParams() {
  const data = await getToplistPaths();

  const paths: any[] = [];

  data &&
    data.map((topList: any) => {
      paths.push({ slug: topList.slug });
    });

  return paths;
}

const isSlugArray = (slug: string): boolean =>
  Array.isArray(slug) || slug.includes("-");

const getSlugArray = (slug: string): string[] =>
  slug.includes("-") ? slug.split("-") : [slug];

const matchesSlug = (toplist: TopList, slug: string): boolean =>
  toplist.toplist.uri.split("/")[2] === slug;

const matchesEco = (toplist: TopList, isEco: boolean): boolean =>
  isEco && toplist.toplist.acf_toplists.ekologiskt;

const matchesTypeAndPackaging = (
  toplist: TopList,
  slugArray: string[]
): boolean => {
  const [packaging, type] = slugArray.map((s) => s.split(" ")[0]);
  return (
    toplist.toplist.acf_toplists.dryckestyper.includes(type) &&
    toplist.toplist.acf_toplists.forpackningar.includes(packaging)
  );
};

async function getData({
  params,
}: {
  params: Params;
}): Promise<{ data?: { toplist: TopList }; notFound?: boolean }> {
  try {
    const slugArray = getSlugArray(params.slug);
    const topListsResponse = await getToplists();
    if (!topListsResponse) {
      return { notFound: true };
    }

    const topLists: any[] = topListsResponse;

    const filteredTopList = topLists.filter((toplist) => {
      if (matchesSlug(toplist, params.slug)) return true;

      if (isSlugArray(params.slug)) {
        return matchesTypeAndPackaging(toplist, slugArray);
      }

      return matchesEco(toplist, slugArray[0] === "ekologiskt");
    });

    return filteredTopList.length
      ? { data: { toplist: filteredTopList[0] } }
      : { notFound: true };
  } catch (error) {
    console.error("Error fetching top list data:", error);
    return { notFound: true };
  }
}
const SingelTopList = async ({ params }: { params: { slug: string } }) => {
  const data = await getData({ params });

  return (
    <div className="">
      <TopListTemplate data={data?.data} />
    </div>
  );
};

export default SingelTopList;
