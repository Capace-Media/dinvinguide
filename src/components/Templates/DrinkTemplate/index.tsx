import Ads from "@/app/components/ads";
import { getDrink, getPreviewDrink } from "@/lib/queries/getDrink";
import PrettyDate from "@/lib/utils/prettyDate";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import DLHero from "../HeroHeaders/DLHero";
import TopListLinks from "../TopListsTemplate/TopListLinks";
import Drink from "./Drink";
import RelatedRecipes from "./RelatedRecipes";

async function getDrinkData({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { isEnabled } = await draftMode();

  if (!isEnabled) {
    const data = await getDrink(`/drycker/${params?.slug}`);
    return data;
  }

  if (isEnabled) {
    const pid = parseInt(slug);
    const preview = await getPreviewDrink(pid);

    return preview;
  }
}

const DrinkTemplate = async ({ params }: { params: { slug: string } }) => {
  const data = await getDrinkData({ params });

  if (!data) {
    return notFound();
  }

  const { acf_drinks, ...rest } = data;
  const { passarTillRecept, ...acfData } = acf_drinks;

  return (
    <>
      <DLHero hero={data} drinkType={data?.acf_drinks?.dryckestyper?.slug} />
      <Ads pageType="DL" position="TOP" />

      <Drink data={data} />
      <Ads pageType="DL" position="MID" />
      {passarTillRecept && (
        <>
          <RelatedRecipes data={passarTillRecept[0]} />
          <Ads pageType="DL" position="BOTTOM" />
        </>
      )}

      <TopListLinks />
    </>
  );
};

export default DrinkTemplate;
