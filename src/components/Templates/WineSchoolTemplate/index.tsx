import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
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
      <Ads pageType="default" position="TOP" />
      <WineSchoolPagination searchParams={searchParams} params={params} />
      <Ads pageType="default" position="MID" />
      <Newsletter />
      <Ads pageType="default" position="BOTTOM" />
    </>
  );
};

export default WineSchoolTemplate;
