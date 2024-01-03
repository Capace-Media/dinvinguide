import Ads from "@/app/components/ads";
import { getPage } from "@/lib/queries/getPage";
import PageHero from "../HeroHeaders/PageHero";

interface GuideTemplateProps {}

async function getDrinksPage() {
  const data = await getPage("/guide");
  return data;
}

const GuideTemplate = async ({}: GuideTemplateProps) => {
  const data = await getDrinksPage();

  console.log("data =====>", data);

  return (
    <>
      <PageHero data={data} />
      <Ads pageType="default" position="TOP" />

      <Ads pageType="default" position="MID" />

      <Ads pageType="default" position="BOTTOM" />
    </>
  );
};

export default GuideTemplate;
