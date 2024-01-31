import FrontHero from "@/components/Blocks/Hero-Header/FrontHero";
import { getFrontPage } from "@/lib/queries/getFrontPage";
import dynamic from "next/dynamic";

import StarRating from "@/components/graphic/StarRating";
import { Suspense } from "react";
import Newsletter from "./components/Newsletter";
import Ads from "./components/ads";

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

      <Suspense fallback={<p>Loading..</p>}>
        <ExplorePages />
      </Suspense>
      <Suspense fallback={<p>Loading..</p>}>
        <LatestArticles />
      </Suspense>
      <Ads pageType="default" position="MID" />
      <Suspense fallback={<p>Loading..</p>}>
        <ExploreRecipes />
      </Suspense>
      <Ads pageType="default" position="BOTTOM" />

      <Newsletter />
    </>
  );
}
