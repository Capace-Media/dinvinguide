import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import { getFrontPage } from "@/lib/queries/getFrontPage";
import dynamic from "next/dynamic";

import { notFound } from "next/navigation";
import { Suspense } from "react";
import ExclusiveDrinks from "./_components/ExclusiveDrinks";
import Newsletter from "./_components/Newsletter";
import Ads from "./_components/ads";

const ExplorePages = dynamic(() => import("./_components/ExplorePages"));
const ExploreRecipes = dynamic(() => import("./_components/ExploreRecipes"));
const LatestArticles = dynamic(() => import("./_components/LatestArticles"));

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
