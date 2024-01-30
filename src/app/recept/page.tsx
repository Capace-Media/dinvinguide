import RecipeHero from "@/components/Blocks/Hero-Header/RecipeHero";
import RecipesTemplate from "@/components/Templates/RecipesTemplate";

import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { getPage } from "@/lib/queries/getPage";
import { getRecipePage } from "@/lib/queries/getRecipePage";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import { MetaInfo } from "../../../types/MetaInfoTypes";
import Loading from "../loading";

interface RecipesProps {}

const getRecipeData = async () => {
  const data = await getPage("recept");
  const recipes = getRecipePage();

  return { data, recipes };
};

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEOByPage("/recept");

  const seo: any = page?.seo;

  const uri = `/${page?.slug}`;

  const img = {
    url: seo?.opengraphImage?.mediaItemUrl
      ? seo.opengraphImage.mediaItemUrl
      : "",
    alt: seo?.opengraphImage?.altText ? seo.opengraphImage.altText : "",
  };

  const previousMeta: MetaInfo = (await parent) as unknown as MetaInfo;

  const data = await dynamicSeo({ seo, previousMeta, uri, img });

  return data;
}

const Recipes = async ({}: RecipesProps) => {
  const { data, recipes } = await getRecipeData();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RecipeHero promise={recipes} />
        <RecipesTemplate />
      </Suspense>
    </>
  );
};

export default Recipes;
