import Ads from "@/app/components/ads";
import { getDrink } from "@/lib/queries/getDrink";
import DLHero from "../HeroHeaders/DLHero";
import TopListLinks from "../TopListsTemplate/TopListLinks";
import Drink from "./Drink";
import RelatedRecipes from "./RelatedRecipes";

async function getDrinkData({ params }: { params: { slug: string } }) {
  const data = await getDrink(`/drycker/${params?.slug}`);
  return data;
}

const DrinkTemplate = async ({ params }: { params: { slug: string } }) => {
  const data = await getDrinkData({ params });

  return (
    <>
      <DLHero hero={data} drinkType={data?.acf_drinks?.dryckestyper?.slug} />
      <Ads pageType="DL" position="TOP" />
      <Drink data={data} />
      <Ads pageType="DL" position="MID" />
      <RelatedRecipes />
      <Ads pageType="DL" position="BOTTOM" />
      <TopListLinks />
    </>
  );
};

export default DrinkTemplate;
