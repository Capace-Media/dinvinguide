import RecipeTemplate from "@/components/Templates/RecipeTemplate";
import { getSingleRecipe } from "@/lib/queries/getSingleRecipe";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import WP from "@/lib/wp";
import RecipeHero from "./Hero";

interface RecipeProps {
  params: { slug: string };
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

interface RecipeProps {}

const Recipe = async ({ params }: RecipeProps) => {
  const uri = `/recept/${params.slug}`;
  const data = await getSingleRecipe(uri);

  return (
    <>
      <RecipeTemplate promise={data} />
    </>
  );
};

export default Recipe;
