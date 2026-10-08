import RecipeTemplate from "@/components/features/recept/recipe/recipe-template";
import {
  getPreviewRecipe,
  getRecipe,
  getRecipeSlugs,
} from "@/lib/api/recipes/get-recipes";
import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import buildRecipeSchema from "@/lib/utils/seo/schema/build-recipe-schema";
import JsonLd from "@/components/json-ld";

interface RecipeProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined }>;
}

export async function generateMetadata(
  props: RecipeProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const page = await getRecipe(`/recept/${params.slug}`);

  const seo = page?.seo;

  const uri = `/recept/${page?.slug}`;

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

export async function generateStaticParams() {
  const slugs = await getRecipeSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getRecipeData(params: { slug: string }) {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    return getPreviewRecipe(parseInt(params.slug));
  }
  return getRecipe(`/recept/${params.slug}`);
}

const Recipe = async (props: RecipeProps) => {
  const params = await props.params;

  const data = await getRecipeData(params);

  if (!data) {
    notFound();
  }

  const jsonLd = buildRecipeSchema({ recipe: data });

  return (
    <>
      <JsonLd json={jsonLd} id="recipe-schema" />
      <RecipeTemplate recipe={data} />
    </>
  );
};

export default Recipe;
