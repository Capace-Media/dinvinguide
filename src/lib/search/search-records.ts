import type { SearchType } from "./search-params";

// Pure mapping from the WordPress search queries to flat search records. Kept
// apart from the fetch so it can be unit tested without a CMS or `server-only`.

export interface SearchRecord {
  readonly id: string;
  readonly type: SearchType;
  readonly title: string;
  readonly excerpt: string;
  readonly url: string;
  readonly image?: { readonly url: string; readonly alt: string };
  readonly date: string;
  readonly modified: string;
}

// Structural shapes of the nodes selected in `src/lib/api/search/queries.ts`.
// Every field is optional and nullable, as in the generated GraphQL types.
interface ContentSource {
  readonly title?: string | null;
  readonly slug?: string | null;
  readonly date?: string | null;
  readonly modifiedGmt?: string | null;
  readonly featuredImage?: {
    readonly node?: {
      readonly mediaItemUrl?: string | null;
      readonly altText?: string | null;
    } | null;
  } | null;
}

interface PostSource extends ContentSource {
  readonly excerpt?: string | null;
  readonly author?: { readonly node?: { readonly slug?: string | null } | null } | null;
}
interface RecipeSource extends ContentSource {
  readonly acf_recipe?: { readonly desc?: string | null } | null;
}
interface DrinktipSource extends ContentSource {
  readonly acf_dryckestips?: { readonly beskrivning?: string | null } | null;
}
interface DrinkSource extends ContentSource {
  readonly acf_drinks?: { readonly beskrivning?: string | null } | null;
}
interface GrapeSource extends ContentSource {
  readonly acf_grape?: { readonly kortBeskrivning?: string | null } | null;
}

export interface SearchSources {
  readonly posts: readonly PostSource[];
  readonly recipes: readonly RecipeSource[];
  readonly drinktips: readonly DrinktipSource[];
  readonly drinks: readonly DrinkSource[];
  readonly grapes: readonly GrapeSource[];
}

const MAX_EXCERPT_LENGTH = 200;

const NAMED_ENTITIES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code: string) => {
    if (code[0] === "#") {
      const isHex = code[1] === "x" || code[1] === "X";
      const point = Number.parseInt(code.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isNaN(point) ? entity : String.fromCodePoint(point);
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? entity;
  });
}

// WordPress fields hold HTML; search and the result list only need text.
function toPlainText(html: string | null | undefined) {
  if (!html) return "";
  const text = decodeEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= MAX_EXCERPT_LENGTH) return text;

  const cut = text.slice(0, MAX_EXCERPT_LENGTH - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function toRecord(
  type: SearchType,
  node: ContentSource,
  url: (slug: string) => string | null,
  excerpt: string | null | undefined
): SearchRecord | null {
  const title = node.title?.trim();
  const slug = node.slug;
  if (!title || !slug) return null;

  const href = url(slug);
  if (!href) return null;

  const imageUrl = node.featuredImage?.node?.mediaItemUrl;
  return {
    id: `${type}:${slug}`,
    type,
    title,
    excerpt: toPlainText(excerpt),
    url: href,
    image: imageUrl
      ? { url: imageUrl, alt: node.featuredImage?.node?.altText || title }
      : undefined,
    date: node.date ?? "",
    modified: node.modifiedGmt ?? "",
  };
}

const isRecord = (record: SearchRecord | null): record is SearchRecord =>
  record !== null;

export function toSearchRecords(sources: SearchSources): SearchRecord[] {
  return [
    ...sources.posts.map((post) =>
      toRecord(
        "post",
        post,
        (slug) => {
          const author = post.author?.node?.slug;
          return author ? `/skribenter/${author}/${slug}` : null;
        },
        post.excerpt
      )
    ),
    ...sources.recipes.map((recipe) =>
      toRecord("recipe", recipe, (slug) => `/recept/${slug}`, recipe.acf_recipe?.desc)
    ),
    ...sources.drinktips.map((tip) =>
      toRecord(
        "drinktip",
        tip,
        (slug) => `/dryckestips/${slug}`,
        tip.acf_dryckestips?.beskrivning
      )
    ),
    ...sources.drinks.map((drink) =>
      toRecord("drink", drink, (slug) => `/drycker/${slug}`, drink.acf_drinks?.beskrivning)
    ),
    ...sources.grapes.map((grape) =>
      toRecord("grape", grape, (slug) => `/druvor/${slug}`, grape.acf_grape?.kortBeskrivning)
    ),
  ].filter(isRecord);
}
