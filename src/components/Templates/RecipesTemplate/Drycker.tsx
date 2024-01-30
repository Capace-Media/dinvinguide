import Recipe from "@/components/Pagination/Recipes/Recipe";
import { WordArrow } from "@/components/icons";
import { getDrinkRecipe } from "@/lib/queries/getRecipesBank";
import Link from "next/link";

interface DryckerProps {}

const Drycker = async ({}: DryckerProps) => {
  const data = await getDrinkRecipe();

  return (
    <div className="">
      <div className="layout bg-white contain">
        <div className="py-5 flex justify-between items-center">
          <h2>Drycker</h2>
          <Link
            href="/recept/drycker"
            className="flex items-center gap-4 lg:hover:underline"
          >
            <span>Utforska alla våra recept under Drycker</span> <WordArrow />
          </Link>
        </div>
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
