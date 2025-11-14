import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import { getFrontPage } from "@/lib/queries/getFrontPage";

import { notFound } from "next/navigation";

import ExclusiveDrinks from "./_components/ExclusiveDrinks";
import Newsletter from "./_components/Newsletter";
import Ads from "./_components/ads";

import ExplorePages from "./_components/ExplorePages";
import ExploreRecipes from "./_components/ExploreRecipes";
import LatestArticles from "./_components/LatestArticles";

async function getData() {
  const res = await getFrontPage();

  return res;
}

export default async function Home() {
  const data = await getData();
  if (!data) {
    return notFound();
  }

  return (
    <>
      <FrontHero data={data?.page} />
      <Ads pageType="default" position="TOP" />

      <LatestArticles />

      <ExclusiveDrinks />

      <ExplorePages />

      <Ads pageType="default" position="MID" />

      <ExploreRecipes />

      <Ads pageType="default" position="BOTTOM" />

      <Newsletter />
    </>
  );
}
