import type { WithContext, Recipe } from "schema-dts";
import { RecipeResponse } from "../../../../../types/recipe";

function cleanHtml(htmlString: string | null | undefined): string {
  if (!htmlString) return "";
  return htmlString.replace(/<[^>]*>/g, "").trim();
}

export default function buildRecipeSchema(
  recipe: RecipeResponse
): WithContext<Recipe> {
  const authorName = recipe?.recipe?.acf_recipe?.skrivetAv?.[0]?.name;
  const prepTime = recipe?.recipe?.acf_recipe?.time?.prepTime;
  const cookTime = recipe?.recipe?.acf_recipe?.time?.cookingTime;
  const totalTime =
    prepTime && cookTime
      ? `PT${parseInt(prepTime) + parseInt(cookTime)}M`
      : undefined;
  const recipeYield = recipe?.recipe?.acf_recipe?.antalPortioner?.toString();
  const stepByStepInstructions =
    recipe?.recipe?.acf_recipe?.beskrivningStegForSteg;
  const processHtml = recipe?.recipe?.acf_recipe?.processen;

  const recipeInstructions = stepByStepInstructions?.length
    ? stepByStepInstructions.map((step, index) => ({
        "@type": "HowToStep" as const,
        position: index + 1,
        text: step.instruktion,
      }))
    : processHtml
    ? cleanHtml(processHtml)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe?.recipe?.seo?.title,
    description:
      recipe?.recipe?.seo?.metaDesc || recipe?.recipe?.acf_recipe?.desc,
    image:
      recipe?.recipe?.seo?.opengraphImage?.mediaItemUrl ||
      recipe?.recipe?.featuredImage?.node?.mediaItemUrl,
    ...(authorName && {
      author: {
        "@type": "Person",
        name: authorName,
      },
    }),
    ...(recipe?.recipe?.modifiedGmt && {
      datePublished: recipe.recipe.modifiedGmt,
      dateModified: recipe.recipe.modifiedGmt,
    }),
    ...(prepTime && { prepTime }),
    ...(cookTime && { cookTime }),
    ...(totalTime && { totalTime }),
    ...(recipeYield && { recipeYield }),
    recipeIngredient: [
      ...(recipe?.recipe?.acf_recipe?.receptdelar?.flatMap((part) =>
        part.ingredienser.map((ing) =>
          `${ing.antal ?? ""} ${ing.enhet?.name ?? ""} ${ing.namn ?? ""}`.trim()
        )
      ) || []),
      ...(recipe?.recipe?.acf_recipe?.ingredienserOvrigt
        ? [recipe.recipe.acf_recipe.ingredienserOvrigt]
        : []),
    ],
    ...(recipeInstructions &&
      recipeInstructions.length > 0 && {
        recipeInstructions,
      }),
  };
}
