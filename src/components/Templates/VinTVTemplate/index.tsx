import Newsletter from "@/app/_components/Newsletter";
import { BannerSkeleton } from "@/app/_components/ads/banner";
import AdTop from "@/app/_components/ads/default/top";
import AdMid from "@/app/_components/ads/default/mid";
import AdBottom from "@/app/_components/ads/default/bottom";
import { Suspense } from "react";
import { getPage } from "@/lib/queries/getPage";

import links from "../GuideTemplate/guideLinks.json";
import PageHero from "../HeroHeaders/PageHero";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

async function getSingleGuidePage({ params }: { params: { slug: string } }) {
  const data = await getPage(`/vin-tv`);
  return data;
}

const VinTVTemplate = async ({ params, searchParams }: Props) => {
  const data = await getSingleGuidePage({ params });
  return (
    <>
      <PageHero data={data} links={links} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      {/* <WineAtlasPagination searchParams={searchParams} params={params} /> */}
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>
    </>
  );
};

export default VinTVTemplate;
