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

    // Add null/undefined checks before accessing nested properties
    if (!res?.data?.recipes?.nodes) {
      console.error("Failed to fetch recipes:", res);
      return [];
    }

    const data = res.data.recipes.nodes;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function generateStaticParams() {
  const data = await getPaths();
  const paths: PropsPaths[] = [];

  // Add check to ensure data is an array before mapping
  if (!Array.isArray(data)) {
    console.error("getPaths did not return an array");
    return [];
  }

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
  const { isEnabled } = await draftMode();
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

const Recipe = async (props: RecipeProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const uri = `/recept/${params.slug}`;

  const data = await getRecipeData(params, searchParams);

  const jsonLd = buildRecipeSchema({ recipe: data });

  return (
    <>
      <JsonLd json={jsonLd} id="recipe-schema" />
      <RecipeTemplate promise={data} />
    </>
  );
};

export default Recipe;
