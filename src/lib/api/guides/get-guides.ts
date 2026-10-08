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
  const data = await wpQuery(ChildPagesQuery, { ...variables, parent });
  return data?.pages ?? null;
}

export function getWineAtlases(variables: PageListVariables) {
  return getChildPages(WINE_ATLAS_PAGE_ID, variables);
}

export function getWineSchools(variables: PageListVariables) {
  return getChildPages(WINE_SCHOOL_PAGE_ID, variables);
}
