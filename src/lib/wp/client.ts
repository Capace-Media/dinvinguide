import "server-only";
import type { TypedDocumentString } from "./gql/graphql";

interface WpQueryOptions {
  // Cache tags for `revalidateTag`. Untagged queries share `collections`.
  readonly tags?: readonly string[];
  // Seconds before a cached response is refreshed. `false` caches until
  // a tag is revalidated.
  readonly revalidate?: number | false;
  // Draft previews must always hit WordPress, so they skip the data cache.
  readonly draft?: boolean;
}

const DEFAULT_REVALIDATE_SECONDS = 60 * 60 * 24; // 1 day

type WpQueryArgs<TVariables> = TVariables extends Record<string, never>
  ? [variables?: undefined, options?: WpQueryOptions]
  : [variables: TVariables, options?: WpQueryOptions];

interface GraphQLResponse<TResult> {
  data?: TResult | null;
  errors?: readonly { message: string }[];
}

function authHeader() {
  const user = process.env.CMS_GRAPHQL_AUTH_USER;
  const password = process.env.APPLICATION_NEW_PASSWORD;
  return `Basic ${btoa(`${user}:${password}`)}`;
}

export async function wpQuery<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables, options]: WpQueryArgs<TVariables>
): Promise<TResult | null> {
  const uri = process.env.CMS_GRAPHQL_URI;
  if (!uri) {
    console.error("WP query failed: CMS_GRAPHQL_URI is not set");
    return null;
  }

  const cacheOptions: RequestInit = options?.draft
    ? { cache: "no-store" }
    : {
        cache: "force-cache",
        next: {
          revalidate: options?.revalidate ?? DEFAULT_REVALIDATE_SECONDS,
          tags: [...(options?.tags ?? ["collections"])],
        },
      };

  try {
    const res = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
      body: JSON.stringify({ query: query.toString(), variables }),
      ...cacheOptions,
    });

    if (!res.ok) {
      console.error(`WP query failed: HTTP ${res.status}`);
      return null;
    }

    const json = (await res.json()) as GraphQLResponse<TResult>;
    if (json.errors?.length) {
      console.error("WP query errors:", json.errors.map((e) => e.message));
    }

    return json.data ?? null;
  } catch (error) {
    console.error("WP query failed:", error);
    return null;
  }
}
