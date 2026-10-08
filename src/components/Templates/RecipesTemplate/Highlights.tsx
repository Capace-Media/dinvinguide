import Recipe from "@/components/Pagination/Recipes/Recipe";
import { getFeaturedRecipes } from "@/lib/api/recipes/get-recipes";

const Highlights = async () => {
  const data = await getFeaturedRecipes();

  return (
    <div className="">
      <div className="layout bg-white contain">
        <h2 className="py-5">{data?.heading}</h2>
        <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {data?.recipes.map((recipe) => {
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

export default Highlights;
