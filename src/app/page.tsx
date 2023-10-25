import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import { getFrontPage } from "@/lib/queries/getFrontPage";
import ExplorePages from "./components/ExplorePages";
import ExploreRecipes from "./components/ExploreRecipes";
import LatestArticles from "./components/LatestArticles";
import Ads from "./components/ads";

async function getData() {
  const res = await getFrontPage();

  return res;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <FrontHero data={data?.page} />
      <Ads pageType="default" position="TOP" />
      <ExplorePages />
      <LatestArticles />
      <Ads pageType="default" position="MID" />
      <ExploreRecipes />
    </>
  );
}
