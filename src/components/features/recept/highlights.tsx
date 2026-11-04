import Recipe from "@/components/Pagination/Recipes/Recipe";
import { getFeaturedRecipes } from "@/lib/api/recipes/get-recipes";

const Highlights = async () => {
  const featured = await getFeaturedRecipes();

  return (
    <div>
      <div className="layout contain bg-white">
        <h2 className="py-5">{featured?.heading}</h2>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featured?.recipes.map((recipe) => {
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
