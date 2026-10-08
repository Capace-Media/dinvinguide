import Recipe from "@/components/Pagination/Recipes/Recipe";
import { getDrinkRecipes } from "@/lib/api/recipes/get-recipes";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const Drinks = async () => {
  const recipes = await getDrinkRecipes();

  return (
    <div>
      <div className="layout bg-white contain">
        <div className="py-5 flex justify-between items-center">
          <h2>Drycker</h2>
          <Link
            href="/recept/drycker"
            className="flex items-center gap-4 lg:hover:underline"
          >
            <span>Utforska alla våra recept under Drycker</span>{" "}
            <MoveRight className="size-6" strokeWidth={1} aria-hidden />
          </Link>
        </div>
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {recipes.map((recipe) => {
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

export default Drinks;
