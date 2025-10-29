import type { WithContext, Recipe } from "schema-dts";
import { RecipeResponse } from "../../../../../types/recipe";

export default function buildRecipeSchema(
  recipe: RecipeResponse
): WithContext<Recipe> {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe?.recipe?.seo?.title,
    description:
      recipe?.recipe?.seo?.metaDesc || recipe?.recipe?.acf_recipe?.desc,
    image:
      recipe?.recipe?.seo?.opengraphImage?.mediaItemUrl ||
      recipe?.recipe?.featuredImage?.node?.mediaItemUrl,
    author: {
      "@type": "Person",
      name: recipe?.recipe?.acf_recipe?.skrivetAv?.[0]?.name,
    },
    datePublished: recipe?.recipe?.modifiedGmt,
    dateModified: recipe?.recipe?.modifiedGmt,
    prepTime: recipe?.recipe?.acf_recipe?.time?.prepTime,
    cookTime: recipe?.recipe?.acf_recipe?.time?.cookingTime,
    totalTime:
      recipe?.recipe?.acf_recipe?.time?.prepTime &&
      recipe?.recipe?.acf_recipe?.time?.cookingTime
        ? `PT${
            parseInt(recipe.recipe.acf_recipe.time.prepTime) +
            parseInt(recipe.recipe.acf_recipe.time.cookingTime)
          }M`
        : undefined,
    recipeYield: recipe?.recipe?.acf_recipe?.antalPortioner?.toString(),
    recipeIngredient: [
      ...(recipe?.recipe?.acf_recipe?.receptdelar?.flatMap((part) =>
        part.ingredienser.map((ing) =>
          `${ing.antal} ${ing.enhet.name} ${ing.namn}`.trim()
        )
      ) || []),
      ...(recipe?.recipe?.acf_recipe?.ingredienserOvrigt
        ? [recipe.recipe.acf_recipe.ingredienserOvrigt]
        : []),
    ],
    recipeInstructions: recipe?.recipe?.acf_recipe?.beskrivningStegForSteg?.map(
      (step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        text: step.instruktion,
      })
    ),
  };
}
