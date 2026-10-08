import "server-only";
import { wpQuery } from "@/lib/wp/client";
import type { RecipeSitemapQuery as RecipeSitemapData } from "@/lib/wp/gql/graphql";
import {
  WINE_ATLAS_PAGE_ID,
  WINE_SCHOOL_PAGE_ID,
} from "@/lib/api/guides/get-guides";
import {
  DrinkSitemapQuery,
  DrinkTipSitemapQuery,
  GrapeSitemapQuery,
  PlaylistSitemapQuery,
  PostSitemapQuery,
  RecipeSitemapQuery,
  WineAtlasSitemapQuery,
  WineSchoolSitemapQuery,
  WordSitemapQuery,
} from "./queries";

export async function getGrapeSitemap() {
  const data = await wpQuery(GrapeSitemapQuery);
  return data?.grapes?.nodes ?? [];
}

export async function getDrinkSitemap() {
  const data = await wpQuery(DrinkSitemapQuery);
  return data?.drinks?.nodes ?? [];
}

export async function getDrinkTipSitemap() {
  const data = await wpQuery(DrinkTipSitemapQuery);
  return data?.drinktips?.nodes ?? [];
}

export async function getWordSitemap() {
  const data = await wpQuery(WordSitemapQuery);
  return data?.glossaries?.nodes ?? [];
}

export async function getPostSitemap() {
  const data = await wpQuery(PostSitemapQuery);
  return data?.posts?.nodes ?? [];
}

export async function getPlaylistSitemap() {
  const data = await wpQuery(PlaylistSitemapQuery);
  return data?.playlists?.nodes ?? [];
}

export async function getWineAtlasSitemap() {
  const data = await wpQuery(WineAtlasSitemapQuery, {
    parent: WINE_ATLAS_PAGE_ID,
  });
  return data?.pages?.nodes ?? [];
}

export async function getWineSchoolSitemap() {
  const data = await wpQuery(WineSchoolSitemapQuery, {
    parent: WINE_SCHOOL_PAGE_ID,
  });
  return data?.pages?.nodes ?? [];
}

type RecipeSitemapNode = { slug: string | null; modifiedGmt: string | null };

// Pages through every recipe so the sitemap isn't truncated as the number of
// recipes grows. `MAX_PAGES` only guards against an endless loop.
export async function getRecipeSitemap(): Promise<RecipeSitemapNode[]> {
  const PAGE_SIZE = 1000;
  const MAX_PAGES = 20;
  const nodes: RecipeSitemapNode[] = [];
  let after: string | null = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    const data: RecipeSitemapData | null = await wpQuery(RecipeSitemapQuery, {
      first: PAGE_SIZE,
      after,
    });
    const recipes: RecipeSitemapData["recipes"] = data?.recipes ?? null;
    if (!recipes) break;

    nodes.push(...recipes.nodes);

    if (!recipes.pageInfo.hasNextPage || !recipes.pageInfo.endCursor) break;
    after = recipes.pageInfo.endCursor;
  }

  return nodes;
}
