import "server-only";
import { cache } from "react";
import { wpQuery } from "@/lib/wp/client";
import type { RecipesQueryVariables } from "@/lib/wp/gql/graphql";
import { isTypename } from "@/lib/utils/is-typename";
import {
  ChefRecipesQuery,
  DrinkRecipesQuery,
  FeaturedRecipesQuery,
  PreviewRecipeQuery,
  RecipeCategoryChildrenQuery,
  RecipeCategoryQuery,
  RecipeQuery,
  RecipeSlugsQuery,
  RecipesByCategoryQuery,
  RecipesQuery,
} from "./queries";

// Cached per request so `generateMetadata` and the page share one fetch.
export const getRecipe = cache(async (uri: string) => {
  const data = await wpQuery(RecipeQuery, { id: uri });
  return data?.recipe ?? null;
});

// Draft mode: the latest revision if there is one, otherwise the recipe itself.
export async function getPreviewRecipe(databaseId: number) {
  const data = await wpQuery(
    PreviewRecipeQuery,
    { id: String(databaseId) },
    { draft: true },
  );
  const recipe = data?.recipe;
  return recipe?.preview?.node ?? recipe ?? null;
}

export async function getRecipeSlugs() {
  const data = await wpQuery(RecipeSlugsQuery);
  return data?.recipes?.nodes.map((recipe) => recipe.slug) ?? [];
}

export async function getRecipes(variables: RecipesQueryVariables) {
  const data = await wpQuery(RecipesQuery, variables);
  return data?.recipes ?? null;
}

// `uri` is the category's WordPress URI, e.g. `/receptkategorier/maltider/frukost`.
export async function getRecipesByCategory(
  uri: string,
  variables: RecipesQueryVariables,
) {
  const data = await wpQuery(RecipesByCategoryQuery, { ...variables, id: uri });
  return data?.recipeCategory?.recipes ?? null;
}

export async function getChefRecipes(
  uri: string,
  variables: RecipesQueryVariables,
) {
  const data = await wpQuery(ChefRecipesQuery, { ...variables, id: uri });
  return data?.guestWriter ?? null;
}

export async function getDrinkRecipes() {
  const data = await wpQuery(DrinkRecipesQuery);
  return data?.recipeCategory?.recipes?.nodes ?? [];
}

// Shared by the category page and its generateMetadata, so one request per render.
export const getRecipeCategory = cache(async (uri: string) => {
  const data = await wpQuery(RecipeCategoryQuery, { id: uri });
  return data?.recipeCategory ?? null;
});

export async function getRecipeCategoryChildSlugs(slug: string, first: number) {
  const data = await wpQuery(RecipeCategoryChildrenQuery, { id: slug, first });
  return data?.recipeCategory?.children?.nodes.map((node) => node.slug) ?? [];
}

export async function getFeaturedRecipes() {
  const data = await wpQuery(FeaturedRecipesQuery);
  const featured = data?.page?.featured_recipes;
  if (!featured) return null;

  return {
    heading: featured.rubrik,
    recipes: featured.utvaldaRecept?.filter(isTypename("Recipe")) ?? [],
  };
}
