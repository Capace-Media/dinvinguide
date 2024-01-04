import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import { getPage } from "@/lib/queries/getPage";
import PageHero from "../HeroHeaders/PageHero";
import ExploreGuides from "./ExploreGuides";
import links from "./guideLinks.json";

interface GuideTemplateProps {}

async function getDrinksPage() {
  const data = await getPage("/guide");
  return data;
}

const GuideTemplate = async ({}: GuideTemplateProps) => {
  const data = await getDrinksPage();

  return (
    <>
      <PageHero data={data} links={links} />
      <Ads pageType="default" position="TOP" />
      <ExploreGuides />

      <Ads pageType="default" position="MID" />
      <Newsletter />
      <Ads pageType="default" position="BOTTOM" />
    </>
  );
};

export default GuideTemplate;
