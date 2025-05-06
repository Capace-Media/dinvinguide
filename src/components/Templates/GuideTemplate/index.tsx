import Newsletter from "@/app/_components/Newsletter";
import Ads from "@/app/_components/ads";
import { getPage } from "@/lib/queries/getPage";
import { notFound } from "next/navigation";
import PageHero from "../HeroHeaders/PageHero";
import ExploreGuides from "./ExploreGuides";
import links from "./guideLinks.json";

interface GuideTemplateProps {}

async function getGuidePage() {
  const data = await getPage("/guide");
  return data;
}

const GuideTemplate = async ({}: GuideTemplateProps) => {
  const data = await getGuidePage();

  if (!data) return notFound();
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
