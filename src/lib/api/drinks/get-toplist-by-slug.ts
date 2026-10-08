import "server-only";
import { getToplists, type ExtendedToplist } from "./get-drinks";

const BOX_SLUG = "box-pase-tetra";

// `/topplistor/<segment>/` — the segment the route slug is matched against.
const uriSegment = ({ toplist }: ExtendedToplist) =>
  toplist.uri?.split("/")[2] ?? "";

const matchesSlug = (toplist: ExtendedToplist, slug: string) => {
  const segment = uriSegment(toplist);
  return slug === BOX_SLUG ? segment.includes(slug) : segment === slug;
};

const isEcoToplist = (toplist: ExtendedToplist) =>
  Boolean(toplist.toplist.acf_toplists?.ekologiskt);

// The toplist for `/topplistor/<slug>`, or the organic toplist for
// `/topplistor/ekologiskt`.
export async function getToplistBySlug(
  slug: string
): Promise<ExtendedToplist | null> {
  try {
    const toplists = await getToplists();
    const isEcoSlug = slug === "ekologiskt";

    return (
      toplists.find(
        (toplist) =>
          matchesSlug(toplist, slug) || (isEcoSlug && isEcoToplist(toplist))
      ) ?? null
    );
  } catch (error) {
    console.error("Error fetching top list data:", error);
    return null;
  }
}
