//import ExplorePages from "./components/ExplorePages";
import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import { getFrontPage } from "@/lib/queries/getFrontPage";
import dynamic from "next/dynamic";
//import ExploreRecipes from "./components/ExploreRecipes";
//import LatestArticles from "./components/LatestArticles";
import Ads from "./components/ads";
//import Newsletter from "./components/Newsletter";
const ExplorePages = dynamic(() => import("./components/ExplorePages"));
const ExploreRecipes = dynamic(() => import("./components/ExploreRecipes"));
const LatestArticles = dynamic(() => import("./components/LatestArticles"));
const Newsletter = dynamic(() => import("./components/Newsletter"), {
  ssr: false,
});

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
      <Ads pageType="default" position="BOTTOM" />

      <Newsletter />
    </>
  );
}
