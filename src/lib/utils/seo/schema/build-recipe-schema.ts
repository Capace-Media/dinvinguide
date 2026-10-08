import type { WithContext, Recipe } from "schema-dts";
import type { SeoMeta } from "@/components/SEO/dynamicSEO";
import type { RecipeFieldsFragment } from "@/lib/wp/gql/graphql";

// Published recipes carry SEO and a modified date; draft previews don't.
type SchemaRecipe = RecipeFieldsFragment & {
  seo?: SeoMeta | null;
  modifiedGmt?: string | null;
};

function cleanHtml(htmlString: string | null | undefined): string {
  if (!htmlString) return "";
  return htmlString.replace(/<[^>]*>/g, "").trim();
}

export default function buildRecipeSchema({
  recipe,
}: {
  recipe: SchemaRecipe | null;
}): WithContext<Recipe> {
  const authorName = recipe?.acf_recipe?.skrivetAv?.[0]?.name;
  // Minutes in WordPress; schema.org wants ISO 8601 durations.
  const prepMinutes = recipe?.acf_recipe?.time?.prepTime;
  const cookMinutes = recipe?.acf_recipe?.time?.cookingTime;
  const prepTime = prepMinutes ? `PT${prepMinutes}M` : undefined;
  const cookTime = cookMinutes ? `PT${cookMinutes}M` : undefined;
  const totalTime =
    prepMinutes && cookMinutes
      ? `PT${prepMinutes + cookMinutes}M`
      : undefined;
  const recipeYield = recipe?.acf_recipe?.antalPortioner?.toString();
  const stepByStepInstructions =
    recipe?.acf_recipe?.beskrivningStegForSteg;
  const processHtml = recipe?.acf_recipe?.processen;

  const recipeInstructions = stepByStepInstructions?.length
    ? stepByStepInstructions.map((step, index) => ({
        "@type": "HowToStep" as const,
        position: index + 1,
        text: step?.instruktion ?? undefined,
      }))
    : processHtml
    ? cleanHtml(processHtml)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe?.seo?.title ?? undefined,
    description:
      recipe?.seo?.metaDesc || recipe?.acf_recipe?.desc || undefined,
    image:
      recipe?.seo?.opengraphImage?.mediaItemUrl ||
      recipe?.featuredImage?.node?.mediaItemUrl ||
      undefined,
    ...(authorName && {
      author: {
        "@type": "Person",
        name: authorName,
      },
    }),
    ...(recipe?.modifiedGmt && {
      datePublished: recipe.modifiedGmt,
      dateModified: recipe.modifiedGmt,
    }),
    ...(prepTime && { prepTime }),
    ...(cookTime && { cookTime }),
    ...(totalTime && { totalTime }),
    ...(recipeYield && { recipeYield }),
    recipeIngredient: [
      ...(recipe?.acf_recipe?.receptdelar?.flatMap((part) =>
        (part?.ingredienser ?? []).map((ing) =>
          `${ing?.antal ?? ""} ${ing?.enhet?.name ?? ""} ${ing?.namn ?? ""}`.trim()
        )
      ) || []),
      ...(recipe?.acf_recipe?.ingredienserOvrigt
        ? [recipe.acf_recipe.ingredienserOvrigt]
        : []),
    ],
    ...(recipeInstructions &&
      recipeInstructions.length > 0 && {
        recipeInstructions,
      }),
  };
}
