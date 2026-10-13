import "server-only";
import { wpQuery } from "@/lib/wp/client";
import { toSearchRecords, type SearchRecord } from "@/lib/search/search-records";
import {
  DrinkSearchSourceQuery,
  DrinktipSearchSourceQuery,
  GrapeSearchSourceQuery,
  PostSearchSourceQuery,
  RecipeSearchSourceQuery,
} from "./queries";

// WordPress fails (HTTP 500) at 1000 per page and often at 500 for drinks, so
// start lower; a failed page is retried at half the size down to the minimum.
const PAGE_SIZE = 250;
const MIN_PAGE_SIZE = 50;
// Only guards against an endless loop, well above the ~19 000 posts.
const MAX_PAGES = 1000;

interface Connection<TNode> {
  readonly nodes: readonly TNode[];
  readonly pageInfo: {
    readonly hasNextPage: boolean;
    readonly endCursor?: string | null;
  };
}

type PageFetcher<TNode> = (
  first: number,
  after: string | null
) => Promise<Connection<TNode> | null | undefined>;

async function fetchPageWithRetry<TNode>(
  fetchPage: PageFetcher<TNode>,
  after: string | null
): Promise<Connection<TNode>> {
  for (let first = PAGE_SIZE; first >= MIN_PAGE_SIZE; first = Math.floor(first / 2)) {
    const connection = await fetchPage(first, after);
    if (connection) return connection;
  }
  // Fail rather than return a partial list: a partial index would silently
  // hide content until the next rebuild.
  throw new Error("Search records: WordPress query failed");
}

async function fetchAllNodes<TNode>(fetchPage: PageFetcher<TNode>): Promise<TNode[]> {
  const nodes: TNode[] = [];
  let after: string | null = null;

  for (let page = 0; page < MAX_PAGES; page++) {
    const connection: Connection<TNode> = await fetchPageWithRetry(fetchPage, after);

    nodes.push(...connection.nodes);

    if (!connection.pageInfo.hasNextPage || !connection.pageInfo.endCursor) break;
    after = connection.pageInfo.endCursor;
  }

  return nodes;
}

// Every searchable item on the site. Each page is a cached `wpQuery` under the
// default `collections` tag, so the revalidate webhook refreshes it.
export async function getSearchRecords(): Promise<SearchRecord[]> {
  const [posts, recipes, drinktips, drinks, grapes] = await Promise.all([
    fetchAllNodes(async (first, after) =>
      (await wpQuery(PostSearchSourceQuery, { first, after }))?.posts
    ),
    fetchAllNodes(async (first, after) =>
      (await wpQuery(RecipeSearchSourceQuery, { first, after }))?.recipes
    ),
    fetchAllNodes(async (first, after) =>
      (await wpQuery(DrinktipSearchSourceQuery, { first, after }))?.drinktips
    ),
    fetchAllNodes(async (first, after) =>
      (await wpQuery(DrinkSearchSourceQuery, { first, after }))?.drinks
    ),
    fetchAllNodes(async (first, after) =>
      (await wpQuery(GrapeSearchSourceQuery, { first, after }))?.grapes
    ),
  ]);

  return toSearchRecords({ posts, recipes, drinktips, drinks, grapes });
}
