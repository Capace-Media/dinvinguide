import Ads from "@/app/components/ads";

import DLHero from "../HeroHeaders/DLHero";
import TopListCategories from "./TopListCategories";

interface TopListTemplateProps {
  hero: any;
}

const TopListTemplate = ({ hero }: TopListTemplateProps) => {
  return (
    <>
      <DLHero hero={hero} />
      <Ads pageType="default" position="TOP" />
      <TopListCategories />
      <Ads pageType="default" position="MID" />
    </>
  );
};

export default TopListTemplate;
