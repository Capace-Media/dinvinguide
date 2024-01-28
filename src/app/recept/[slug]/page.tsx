import Ads from "@/app/components/ads";
import Loading from "@/app/loading";
import RecipeTemplate from "@/components/Templates/RecipeTemplate";
import {
  getPreviewRecipe,
  getSingleRecipe,
} from "@/lib/queries/getSingleRecipe";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import WP from "@/lib/wp";
import { draftMode } from "next/headers";
import { Suspense } from "react";

interface RecipeProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
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
  if (!data) {
    return (
      <div className="py-20">
        <h2>{params.slug}</h2>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RecipeTemplate promise={data} />
      </Suspense>
    </>
  );
};

export default Recipe;
