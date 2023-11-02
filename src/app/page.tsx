import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import { getFrontPage } from "@/lib/queries/getFrontPage";
import dynamic from "next/dynamic";

import Ads from "./components/ads";
import Newsletter from "./components/Newsletter";

const ExplorePages = dynamic(() => import("./components/ExplorePages"));
const ExploreRecipes = dynamic(() => import("./components/ExploreRecipes"));
const LatestArticles = dynamic(() => import("./components/LatestArticles"));

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
