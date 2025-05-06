import Ads from "@/app/_components/ads";

import DlBottom from "@/app/_components/ads/dl/bottom";
import DlMid from "@/app/_components/ads/dl/mid";
import DlTop from "@/app/_components/ads/dl/top";
import Newsletter from "@/app/_components/Newsletter";
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
      <DlTop />

      <TopListCategories />
      <DlMid />

      <TopListLinks />
      <DlBottom />

      <Newsletter />
    </>
  );
};

export default TopListsTemplate;
