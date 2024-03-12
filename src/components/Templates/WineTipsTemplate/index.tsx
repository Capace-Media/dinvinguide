import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import Line from "@/components/graphic/Line";
import { getPage } from "@/lib/queries/getPage";
import DrinkTipsHero from "./DrinkTipsHero";
import ExploreWineTips from "./ExploreWineTips";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const WineTipsTemplate = async ({ params, searchParams }: Props) => {
  const data = await getPage("/dryckestips");

  return (
    <>
      <DrinkTipsHero data={data} />
      <Ads pageType="DL" position="TOP" />
      <ExploreWineTips searchParams={searchParams} />
      <Ads pageType="DL" position="MID" />
      <Newsletter />
    </>
  );
};

export default WineTipsTemplate;
