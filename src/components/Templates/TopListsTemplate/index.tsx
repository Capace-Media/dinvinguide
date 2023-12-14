import Ads from "@/app/components/ads";

import Newsletter from "@/app/components/Newsletter";
import DLHero from "../HeroHeaders/DLHero";
import TopListCategories from "./TopListCategories";
import TopListLinks from "./TopListLinks";

interface TopListsTemplateProps {
  hero: any;
}

const TopListsTemplate = ({ hero }: TopListsTemplateProps) => {
  return (
    <>
      <DLHero hero={hero} />
      <Ads pageType="default" position="TOP" />
      <TopListCategories />
      <Ads pageType="default" position="MID" />
      <TopListLinks />
      <Ads pageType="default" position="BOTTOM" />
      <Newsletter />
    </>
  );
};

export default TopListsTemplate;
