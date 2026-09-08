import Newsletter from "@/app/_components/Newsletter";
import { BannerSkeleton } from "@/app/_components/ads/banner";
import AdTop from "@/app/_components/ads/default/top";
import AdMid from "@/app/_components/ads/default/mid";
import AdBottom from "@/app/_components/ads/default/bottom";
import { Suspense } from "react";
import { getPage } from "@/lib/queries/getPage";
import links from "../GuideTemplate/guideLinks.json";
import PageHero from "../HeroHeaders/PageHero";
import WineSchoolPagination from "./WineSchoolPagination";
interface WineSchoolTemplateProps {}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const WineSchoolTemplate = async ({ params, searchParams }: Props) => {
  const data = await getPage("/skolor");

  return (
    <>
      <PageHero data={data} links={links} guide={"Alla Guider"} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <WineSchoolPagination searchParams={searchParams} params={params} />
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

export default WineSchoolTemplate;
