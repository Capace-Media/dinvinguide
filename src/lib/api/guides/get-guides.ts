import "server-only";
import { wpQuery } from "@/lib/wp/client";
import type { ChildPagesQueryVariables } from "@/lib/wp/gql/graphql";
import { ChildPagesQuery } from "./queries";

// WordPress global ids of the guide parent pages.
export const WINE_ATLAS_PAGE_ID = "cG9zdDo0NzcyMQ==";
export const WINE_SCHOOL_PAGE_ID = "cG9zdDo0Nzc0Mg==";

type PageListVariables = Omit<ChildPagesQueryVariables, "parent">;

export async function getChildPages(
  parent: string,
  variables: PageListVariables,
) {
  // WordPress drops the `parent` filter when `search` is an empty string, so
  // an empty search must be omitted rather than sent.
  const data = await wpQuery(ChildPagesQuery, {
    ...variables,
    parent,
    search: variables.search || undefined,
  });
  return data?.pages ?? null;
}

export function getWineAtlases(variables: PageListVariables) {
  return getChildPages(WINE_ATLAS_PAGE_ID, variables);
}

export function getWineSchools(variables: PageListVariables) {
  return getChildPages(WINE_SCHOOL_PAGE_ID, variables);
}
