import { getToplists } from "@/lib/queries/getTopListDrinks";
import dynamic from "next/dynamic";
const Newsletter = dynamic(() => import("@/app/_components/Newsletter"), {
  loading: () => <p>Loading...</p>,
});
const Ads = dynamic(() => import("@/app/_components/ads"), {
  loading: () => <p>Loading...</p>,
});

import DLHero from "../HeroHeaders/DLHero";
import TopListItems from "./TopListItems";
import TopListLinks from "../TopListsTemplate/TopListLinks";

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

interface TopListTemplateProps {
  data: any;
}

const isSlugArray = (slug: string): boolean =>
  Array.isArray(slug) || slug.includes("-");

const getSlugArray = (slug: string): string[] =>
  slug.includes("-") ? slug.split("-") : [slug];

const matchesSlug = (toplist: TopList, slug: string): boolean => {
  if (
    slug === "box-pase-tetra" &&
    toplist.toplist.uri.split("/")[2].includes(slug)
  ) {
    return true;
  } else if (toplist.toplist.uri.split("/")[2] === slug) {
    return true;
  } else {
    return false;
  }
};

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

async function getWineData({
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

const TopListTemplate = async ({ params }: { params: { slug: string } }) => {
  const data: any = await getWineData({ params });

  return (
    <>
      <DLHero hero={data?.data?.toplist?.toplist} />
      <Ads pageType="DL" position="TOP" />
      <TopListItems data={data?.data?.toplist} />
      <Ads pageType="DL" position="MID" />
      <TopListLinks />
      <Ads pageType="DL" position="BOTTOM" />
      <Newsletter />
    </>
  );
};

export default TopListTemplate;
