import "server-only";
import { cache } from "react";
import { wpQuery } from "@/lib/wp/client";
import type {
  FrontPageDrinktipFieldsFragment,
  FrontPageRecipeFieldsFragment,
  PostCardFieldsFragment,
} from "@/lib/wp/gql/graphql";
import { isTypename } from "@/lib/utils/is-typename";
import {
  FrontPageQuery,
  PageQuery,
  RecipePageQuery,
  TopListsQuery,
  WineAtlasPageQuery,
} from "./queries";

export type FrontPagePost = PostCardFieldsFragment;
export type FrontPageDrinktip = FrontPageDrinktipFieldsFragment;
export type FrontPageRecipe = FrontPageRecipeFieldsFragment;

// Cached per request so `generateMetadata` and the page share one fetch.
// `uri` must be identical in both callers for `cache()` to dedupe.
export const getPage = cache(async (uri: string) => {
  const data = await wpQuery(PageQuery, { id: uri }, { tags: ["page"] });
  return data?.page ?? null;
});

export type Page = NonNullable<Awaited<ReturnType<typeof getPage>>>;

export const getFrontPage = cache(async () => {
  const data = await wpQuery(FrontPageQuery);
  const page = data?.page;
  if (!data || !page) return null;

  const highlights = page.GQL_frontPageFields;
  const isPost = isTypename("Post");
  const isDrinktip = isTypename("Drinktip");
  const isRecipe = isTypename("Recipe");

  return {
    page,
    recipeIntro: data.recipePage?.page_content?.intro ?? null,
    latestPosts: data.posts?.nodes.filter(isPost) ?? [],
    highlightedPosts: highlights?.highlightedArticles?.filter(isPost) ?? [],
    latestDrinktips: data.drinktips?.nodes.filter(isDrinktip) ?? [],
    highlightedDrinktips:
      highlights?.highlightedDryckestips?.filter(isDrinktip) ?? [],
    latestRecipes: data.recipes?.nodes.filter(isRecipe) ?? [],
    highlightedRecipes: highlights?.highlightedRecept?.filter(isRecipe) ?? [],
  };
});

export async function getRecipePage() {
  return wpQuery(RecipePageQuery);
}

export type RecipePage = NonNullable<Awaited<ReturnType<typeof getRecipePage>>>;

export async function getTopLists() {
  const data = await wpQuery(TopListsQuery, undefined, { tags: ["page"] });
  return (
    data?.page?.acf_topplistor?.aktivaTopplistor?.filter(
      isTypename("Toplist"),
    ) ?? []
  );
}

export type ActiveTopList = Awaited<ReturnType<typeof getTopLists>>[number];

export async function getWineAtlasPage(uri: string) {
  const data = await wpQuery(WineAtlasPageQuery, { id: uri });
  return data?.page ?? null;
}

export type WineAtlasPage = NonNullable<
  Awaited<ReturnType<typeof getWineAtlasPage>>
>;
