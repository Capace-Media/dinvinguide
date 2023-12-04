import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import WP from "@/lib/wp";

interface RecipeProps {}

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

const Recipe = ({}: RecipeProps) => {
  return (
    <div className="layout ">
      <h2 className="">Hello Recipe</h2>
    </div>
  );
};

export default Recipe;
