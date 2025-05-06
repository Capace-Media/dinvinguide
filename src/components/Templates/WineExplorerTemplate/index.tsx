import Ads from "@/app/_components/ads";
import DLHero from "../HeroHeaders/DLHero";
import TopListLinks from "../TopListsTemplate/TopListLinks";

import { getPage } from "@/lib/queries/getPage";
import PageIntro from "../Module/PageIntro";
import WineExplorer from "./WineExplorer";

async function getDrinksPage() {
  const data = await getPage("/dryckesutforskaren");
  return data;
}

const WineExplorerTemplate = async ({
  searchParams,
}: {
  [key: string]: string | string[] | any | undefined;
}) => {
  const data = await getDrinksPage();

  return (
    <>
      <DLHero hero={data} id="dryckesutforskaren" />
      <PageIntro data={data?.page_content?.intro} />
      <Ads pageType="DL" position="TOP" />
      <WineExplorer searchParams={searchParams} />
      <Ads pageType="DL" position="MID" />
      <TopListLinks />
      <Ads pageType="DL" position="BOTTOM" />
    </>
  );
};

export default WineExplorerTemplate;
