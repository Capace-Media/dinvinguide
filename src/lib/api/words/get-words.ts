import "server-only";
import { cache } from "react";
import { wpQuery } from "@/lib/wp/client";
import type { WordsByLetterQueryVariables } from "@/lib/wp/gql/graphql";
import { WordQuery, WordsByLetterQuery } from "./queries";

// Shared by the glossary word page and its generateMetadata, so one request
// per render.
export const getWord = cache(async (slug: string) => {
  const data = await wpQuery(WordQuery, { id: `/glossary/${slug}` });
  return data?.glossary ?? null;
});

// `id` is the letter's slug, e.g. `a` or `a-2` for "å".
export async function getWordsByLetter(variables: WordsByLetterQueryVariables) {
  const data = await wpQuery(WordsByLetterQuery, variables);
  return data?.letter?.glossaries ?? null;
}
