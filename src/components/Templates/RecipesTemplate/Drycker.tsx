import Recipe from "@/components/Pagination/Recipes/Recipe";
import { getDrinkRecipe } from "@/lib/queries/getRecipesBank";

interface DryckerProps {}

const Drycker = async ({}: DryckerProps) => {
  const data = await getDrinkRecipe();

  return (
    <div className="">
      <div className="layout bg-white contain">
        <h2 className="py-5">Drycker</h2>
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {data &&
            data?.nodes?.map((recipe: any, index: number) => {
              return (
                <li key={recipe?.id} className="relative">
                  <Recipe recipe={recipe} />
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Drycker;
