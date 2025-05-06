import Newsletter from "@/app/_components/Newsletter";
import Ads from "@/app/_components/ads";
import { getPage } from "@/lib/queries/getPage";

import links from "../GuideTemplate/guideLinks.json";
import PageHero from "../HeroHeaders/PageHero";
import WineAtlasPagination from "./WineAtlasPagination";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

async function getSingleGuidePage({ params }: { params: { slug: string } }) {
  const data = await getPage(`/vinguide/${params.slug}`);
  return data;
}

const WineAtlasTemplate = async ({ params, searchParams }: Props) => {
  const data = await getSingleGuidePage({ params });
  return (
    <>
      <PageHero data={data} links={links} />
      <Ads pageType="default" position="TOP" />
      <WineAtlasPagination searchParams={searchParams} params={params} />
      <Ads pageType="default" position="MID" />
      <Newsletter />
      <Ads pageType="default" position="BOTTOM" />
    </>
  );
};

export default WineAtlasTemplate;
