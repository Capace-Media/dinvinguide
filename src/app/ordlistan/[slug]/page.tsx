import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import ExploreGuides from "@/components/Templates/GuideTemplate/ExploreGuides";
import WordTemplate from "@/components/Templates/WordTemplate";
import { ParamsProps } from "../../../../types/Global";

interface WordProps {}

const Word = ({ searchParams, params }: ParamsProps) => {
  return (
    <>
      <WordTemplate params={params} />

      <ExploreGuides />
      <Ads pageType="default" position="MID" />
      <Newsletter />
    </>
  );
};

export default Word;
