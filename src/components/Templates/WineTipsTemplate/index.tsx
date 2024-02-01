import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import Line from "@/components/graphic/Line";
import ExploreWineTips from "./ExploreWineTips";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

const WineTipsTemplate = ({ params, searchParams }: Props) => {
  return (
    <>
      <div className="layout bg-white pt-20">
        <Line />
      </div>
      <Ads pageType="DL" position="TOP" />
      <ExploreWineTips searchParams={searchParams} />
      <Ads pageType="DL" position="MID" />
      <Newsletter />
    </>
  );
};

export default WineTipsTemplate;
