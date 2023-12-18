import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import DLHero from "../HeroHeaders/DLHero";
import TopListLinks from "../TopListsTemplate/TopListLinks";
import TopListItems from "./TopListItems";

interface TopListTemplateProps {
  data: any;
}

const TopListTemplate = ({ data }: TopListTemplateProps) => {
  return (
    <>
      <DLHero hero={data?.toplist?.toplist} />
      <Ads pageType="DL" position="TOP" />
      <TopListItems data={data?.toplist} />
      <Ads pageType="DL" position="MID" />
      <TopListLinks />
      <Ads pageType="DL" position="BOTTOM" />
      <Newsletter />
    </>
  );
};

export default TopListTemplate;
