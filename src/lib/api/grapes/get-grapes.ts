import "server-only";
import { cache } from "react";
import { wpQuery } from "@/lib/wp/client";
import type { GrapesQueryVariables } from "@/lib/wp/gql/graphql";
import {
  GrapeQuery,
  GrapeSlugsQuery,
  GrapesByTypeQuery,
  GrapesQuery,
} from "./queries";

// Shared by the grape page and its generateMetadata, so one request per render.
export const getGrape = cache(async (slug: string) => {
  const data = await wpQuery(
    GrapeQuery,
    { id: `/druvor/${slug}` },
    { tags: ["grape"] },
  );
  return data?.grape ?? null;
});

export async function getGrapeSlugs() {
  const data = await wpQuery(GrapeSlugsQuery);
  return data?.grapes?.nodes.map((grape) => grape.slug) ?? [];
}

// All grapes, or only those of one grape type (by its slug).
export async function getGrapes(
  grapeType: string | null | undefined,
  variables: GrapesQueryVariables,
) {
  if (grapeType) {
    const data = await wpQuery(GrapesByTypeQuery, {
      ...variables,
      id: grapeType,
    });
    return data?.grapeType?.grapes ?? null;
  }

  const data = await wpQuery(GrapesQuery, variables);
  return data?.grapes ?? null;
}
