import "server-only";
import { cache } from "react";
import { wpQuery } from "@/lib/wp/client";
import type { DrinkTipsQueryVariables } from "@/lib/wp/gql/graphql";
import { DrinkTipQuery, DrinkTipsQuery } from "./queries";

export async function getDrinkTips(variables: DrinkTipsQueryVariables) {
  const data = await wpQuery(DrinkTipsQuery, variables);
  return data?.drinktips ?? null;
}

// Cached per request so `generateMetadata` and the page share one fetch.
export const getDrinkTip = cache(async (uri: string) => {
  const data = await wpQuery(DrinkTipQuery, { id: uri });
  return data?.drinktip ?? null;
});
