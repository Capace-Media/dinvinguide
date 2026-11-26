import "server-only";
import { getWineAtlases, getWineSchools } from "./get-guides";
import { GUIDES_PER_PAGE, type GuideListParams } from "./guide-list-params";

export type GuideListPage = NonNullable<
  Awaited<ReturnType<typeof getWineAtlases>>
>;

// A guide has a few dozen children, so a search reads them all.
const SEARCH_PAGE_SIZE = 100;
const SEARCH_MAX_PAGES = 5;

// Drops accents ("Österrike" matches "osterr"): after NFD normalization they
// are separate combining characters (U+0300 to U+036F).
function normalize(text: string) {
  return Array.from(text.normalize("NFD"))
    .filter((char) => char < "\u0300" || char > "\u036f")
    .join("")
    .toLowerCase();
}

// One page of a guide list: the wine atlas regions or the wine schools.
//
// WordPress ignores the `parent` filter when it also gets a search term and
// returns matching pages from the whole site. A search therefore reads the
// children of the guide and filters them by title here.
export async function getGuideList({
  guide,
  after,
  search,
}: GuideListParams): Promise<GuideListPage | null> {
  const fetchChildren = guide === "atlas" ? getWineAtlases : getWineSchools;

  if (!search) return fetchChildren({ first: GUIDES_PER_PAGE, after });

  const term = normalize(search);
  const edges: GuideListPage["edges"] = [];
  let cursor: string | undefined;

  for (let page = 0; page < SEARCH_MAX_PAGES; page++) {
    const children = await fetchChildren({
      first: SEARCH_PAGE_SIZE,
      after: cursor,
    });
    if (!children) return null;

    edges.push(
      ...children.edges.filter((edge) =>
        normalize(edge.node.title ?? "").includes(term),
      ),
    );

    if (!children.pageInfo.hasNextPage || !children.pageInfo.endCursor) break;
    cursor = children.pageInfo.endCursor;
  }

  return {
    edges,
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: null,
      endCursor: null,
      total: edges.length,
    },
  };
}
