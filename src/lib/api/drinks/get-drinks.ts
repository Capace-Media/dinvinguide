import "server-only";
import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";
import weekday from "dayjs/plugin/weekday";
import { cache } from "react";
import { wpQuery } from "@/lib/wp/client";
import type {
  DrinksQueryVariables,
  ToplistDrinksQuery,
  ToplistsQuery,
} from "@/lib/wp/gql/graphql";
import { isTypename } from "@/lib/utils/is-typename";
import {
  DrinkQuery,
  DrinksQuery,
  PreviewDrinkQuery,
  ToplistDrinksQuery as ToplistDrinksDocument,
  ToplistPathsQuery,
  ToplistsQuery as ToplistsDocument,
} from "./queries";

dayjs.extend(toObject);
dayjs.extend(weekday);

// Cached per request so `generateMetadata` and the page share one fetch.
export const getDrink = cache(async (uri: string) => {
  const data = await wpQuery(DrinkQuery, { id: uri }, { tags: ["wine"] });
  return data?.drink ?? null;
});

// Draft mode: the latest revision if there is one, otherwise the drink itself.
export async function getPreviewDrink(databaseId: number) {
  const data = await wpQuery(
    PreviewDrinkQuery,
    { id: String(databaseId) },
    { draft: true },
  );
  const drink = data?.drink;
  return drink?.preview?.node ?? drink ?? null;
}

export async function getDrinks(variables: DrinksQueryVariables) {
  const data = await wpQuery(DrinksQuery, variables, { tags: ["drink"] });
  return data?.drinks ?? null;
}

export async function getToplistPaths() {
  const data = await wpQuery(ToplistPathsQuery, undefined, { tags: ["wine"] });
  return (
    data?.pageBy?.acf_topplistor?.aktivaTopplistor?.filter(
      isTypename("Toplist"),
    ) ?? []
  );
}

type Toplist = Extract<
  NonNullable<
    NonNullable<
      NonNullable<ToplistsQuery["pageBy"]>["acf_topplistor"]
    >["aktivaTopplistor"]
  >[number],
  { __typename: "Toplist" }
>;
type ToplistDrinkEdge = NonNullable<ToplistDrinksQuery["drinks"]>["edges"][number];

export interface ExtendedToplist {
  toplist: Toplist;
  currentDrinks: ToplistDrinkEdge[];
  previousDrinks: ToplistDrinkEdge[];
  fallbackDrinks: ToplistDrinkEdge[];
}

const BATCH_LIMIT = 20;

// Every drink published in the window, highest rating first.
async function getDrinksPublishedBetween(
  after: dayjs.Dayjs,
  before: dayjs.Dayjs,
): Promise<ToplistDrinkEdge[]> {
  const a = after.toObject();
  const b = before.toObject();
  const edges: ToplistDrinkEdge[] = [];
  let cursor = "";
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await wpQuery(
      ToplistDrinksDocument,
      {
        batch: BATCH_LIMIT,
        cursor,
        afterYear: a.years,
        afterMonth: a.months + 1,
        afterDay: a.date,
        beforeYear: b.years,
        beforeMonth: b.months + 1,
        beforeDay: b.date,
      },
      { tags: ["wine"] },
    );
    const drinks = data?.drinks;
    if (!drinks) break;

    edges.push(...drinks.edges);
    hasNextPage = drinks.pageInfo.hasNextPage && !!drinks.pageInfo.endCursor;
    cursor = drinks.pageInfo.endCursor ?? "";
  }

  const rating = (edge: ToplistDrinkEdge) => edge.node.acf_drinks?.betyg ?? 0;
  return edges.sort((x, y) => rating(y) - rating(x));
}

// Published from the Sunday after two Saturdays ago up to last Saturday.
function getCurrentToplistDrinks() {
  const today = dayjs().locale("sv");
  return getDrinksPublishedBetween(
    today.weekday(-8).add(1, "day"),
    today.weekday(0).add(1, "day"),
  );
}

function getPreviousToplistDrinks() {
  const today = dayjs().locale("sv");
  return getDrinksPublishedBetween(today.weekday(-25), today.weekday(-7));
}

function getFallbackToplistDrinks() {
  const today = dayjs().locale("sv");
  return getDrinksPublishedBetween(
    today.subtract(12, "months"),
    today.weekday(-23),
  );
}

// Drinks whose type and packaging are both in the toplist (and organic, for
// the organic toplist).
function getToplistItems(toplist: Toplist, drinks: ToplistDrinkEdge[]) {
  const acf = toplist.acf_toplists;
  const names = (terms?: readonly ({ name: string | null } | null)[] | null) =>
    terms?.flatMap((term) => (term?.name ? [term.name] : [])) ?? [];
  const types = names(acf?.dryckestyper);
  const packaging = names(acf?.forpackningar);

  return drinks.filter(({ node: drink }) => {
    const drinkAcf = drink.acf_drinks;
    const type = drinkAcf?.dryckestyper?.name;
    const pack = drinkAcf?.forpackningar?.name;
    if (!type || !pack) return false;
    if (acf?.ekologiskt && !drinkAcf?.ekologiskt) return false;
    return types.includes(type) && packaging.includes(pack);
  });
}

// Each toplist with this week's drinks, topped up with the previous weeks'
// when there are fewer than three, and the past year's when there are none.
export async function getToplists(): Promise<ExtendedToplist[]> {
  const data = await wpQuery(ToplistsDocument, undefined, { tags: ["wine"] });
  const toplists =
    data?.pageBy?.acf_topplistor?.aktivaTopplistor?.filter(
      isTypename("Toplist"),
    ) ?? [];

  // Fetch each drink set once and reuse it for every toplist.
  const [current, previous, fallback] = await Promise.all([
    getCurrentToplistDrinks(),
    getPreviousToplistDrinks(),
    getFallbackToplistDrinks(),
  ]);

  return toplists.map((toplist) => {
    const currentDrinks = getToplistItems(toplist, current);
    const previousDrinks =
      currentDrinks.length >= 3 ? [] : getToplistItems(toplist, previous);
    const fallbackDrinks =
      currentDrinks.length === 0 && previousDrinks.length === 0
        ? getToplistItems(toplist, fallback)
        : [];

    return { toplist, currentDrinks, previousDrinks, fallbackDrinks };
  });
}
