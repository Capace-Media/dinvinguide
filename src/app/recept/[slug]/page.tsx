import Ads from "@/app/components/ads";
import Loading from "@/app/loading";
import RecipeTemplate from "@/components/Templates/RecipeTemplate";
import { getRecipeSEO } from "@/lib/queries/SEO/getRecipeSEO";
import {
  getPreviewRecipe,
  getSingleRecipe,
} from "@/lib/queries/getSingleRecipe";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import generateRecipeSchema from "@/lib/utils/json-LD-Schemas/generateRecipeSchema";
import WP from "@/lib/wp";
import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";

import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { Suspense } from "react";
import { MetaInfo } from "../../../../types/MetaInfoTypes";

interface RecipeProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
}

export async function generateMetadata(
  { params, searchParams }: RecipeProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getRecipeSEO(`/recept/${params.slug}`);

  const seo: any = page?.seo;

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

type PropsPaths = {
  slug: string;
};

const getPaths = async () => {
  try {
    const res = await WP(
      `query getRecipes {
            recipes {
                nodes {
                  slug
                }
              }
        }`
    );

    const data = res.data.recipes.nodes;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};

export async function generateStaticParams() {
  const data = await getPaths();
  const paths: PropsPaths[] = [];

  data.map((recipe: any) => {
    paths.push({ slug: recipe.slug });
  });

  return paths;
}

async function getRecipeData(
  params: { slug: string },
  searchParams?: { [key: string]: string | string[] | any | undefined }
) {
  const uri = `/recept/${params.slug}`;
  const { isEnabled } = draftMode();
  if (!isEnabled) {
    const data = await getSingleRecipe(uri);

    return data;
  }

  if (isEnabled) {
    const pid = parseInt(params?.slug);
    const data = await getPreviewRecipe(pid);

    return data;
  }
}

const Recipe = async ({ params, searchParams }: RecipeProps) => {
  const uri = `/recept/${params.slug}`;

  const data = await getRecipeData(params, searchParams);

  const total =
    data?.acf_recipe?.time?.prepTime && data?.acf_recipe?.time?.cookingTime
      ? parseInt(data?.acf_recipe?.time?.prepTime) +
        parseInt(data?.acf_recipe?.time?.cookingTime)
      : "";

  const jsonLd = generateRecipeSchema({
    name: data?.title,
    description: data?.acf_recipe?.desc,
    image: data?.featuredImage?.node?.mediaItemUrl,
    authorName: data?.acf_recipe?.skrivetAv
      ? data?.acf_recipe?.skrivetAv[0]?.name
      : "",
    datePublished: data?.modifiedGmt,
    prepTime: data?.acf_recipe?.time?.prepTime
      ? data?.acf_recipe?.time?.prepTime
      : "",
    cookTime: data?.acf_recipe?.time?.cookingTime
      ? data?.acf_recipe?.time?.cookingTime
      : "",
    totalTime: `${total}`,
    recipeYield: data?.acf_recipe?.antalPortioner,
    recipeCategory: data?.acf_recipe?.recepieCategories || [],
    recipeCuisine: "",
    ingredients: data?.acf_recipe?.receptdelar
      ? data?.acf_recipe?.receptdelar
      : [],
    recipeInstructions: data?.acf_recipe?.beskrivningStegForSteg
      ? data?.acf_recipe?.beskrivningStegForSteg
      : [],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<Loading />}>
        <RecipeTemplate promise={data} />
      </Suspense>
    </>
  );
};

export default Recipe;
