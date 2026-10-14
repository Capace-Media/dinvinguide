"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SearchResponse } from "@/app/api/search/route";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Spinner } from "@/components/ui/spinner";
import { SearchX } from "lucide-react";
import { useDebounceValue } from "@/hooks/useDebounce";
import { normalizeQuery, type SearchType } from "@/lib/search/search-types";
import {
  SearchResultItem,
  SearchResultItemSkeleton,
} from "./search-result-item";
import { SEARCH_PAGE_SIZE, searchQueryKey } from "./search-query";
import { SearchTypeFilter } from "./search-type-filter";

const formatCount = (count: number) => count.toLocaleString("sv-SE");

async function fetchSearchPage(
  q: string,
  type: SearchType | undefined,
  page: number,
  signal: AbortSignal
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q,
    page: String(page),
    limit: String(SEARCH_PAGE_SIZE),
  });
  if (type) params.set("type", type);

  const response = await fetch(`/api/search?${params}`, { signal });
  if (!response.ok) throw new Error("Sökningen är inte tillgänglig just nu.");
  return response.json() as Promise<SearchResponse>;
}

interface SiteSearchProps {
  readonly initialSearch: string;
  readonly initialType?: SearchType;
}

export function SiteSearch({ initialSearch, initialType }: SiteSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialSearch);
  const [type, setType] = useState(initialType);
  const [debouncedSearch, isTyping] = useDebounceValue(search, 300);

  // Same normalization as the API, so equivalent input shares one cache entry.
  const q = normalizeQuery(debouncedSearch);

  // Keep the URL shareable and the back button meaningful.
  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("search", q);
    if (q && type) params.set("type", type);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [q, type, pathname, router]);

  const {
    data,
    error,
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: searchQueryKey(q, type),
    queryFn: ({ pageParam, signal }) =>
      fetchSearchPage(q ?? "", type, pageParam, signal),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pageCount ? lastPage.page + 1 : undefined,
    enabled: q !== null,
    // Counts for a different query must not appear under the new search term.
    // Reuse them when only the type changes, since facets ignore the active type.
    placeholderData: (previousData, previousQuery) =>
      previousQuery?.queryKey[1] === q ? previousData : undefined,
  });

  const firstPage = data?.pages[0];
  const hits = data?.pages.flatMap((page) => page.hits) ?? [];
  const isSearching = isTyping || (isFetching && !isFetchingNextPage);
  const showSkeleton = q !== null && isPending;
  const allCount = firstPage
    ? Object.values(firstPage.countsByType).reduce((sum, count) => sum + count, 0)
    : 0;

  return (
    <section>
      <div className="max-w-3xl">
        <label htmlFor="site-search-input" className="block text-sm font-medium text-brand-dark">
          Sök på DinVinguide
        </label>
        <SearchInput
          id="site-search-input"
          type="search"
          clearable
          placeholder="T.ex. Rioja eller pasta"
          value={search}
          onChange={(value) => {
            setSearch(value);
            if (!value.trim()) setType(undefined);
          }}
          className="mt-2 h-11 sm:max-w-none"
        />

        {q && firstPage && allCount > 0 && (
          <div className="mt-4">
            <SearchTypeFilter
              counts={firstPage.countsByType}
              total={allCount}
              value={type}
              onChange={setType}
            />
          </div>
        )}
      </div>

      <p role="status" aria-atomic="true" className="mt-6 mb-2 min-h-5 text-sm text-brand-gray">
        {!q ? (
          "Skriv minst två tecken för att söka."
        ) : isSearching ? (
          "Söker..."
        ) : error ? (
          error.message
        ) : firstPage && firstPage.total > 0 ? (
          <>
            {formatCount(firstPage.total)} {firstPage.total === 1 ? "träff" : "träffar"} för{" "}
            <strong className="text-brand-dark">&quot;{q}&quot;</strong>
          </>
        ) : firstPage?.total === 0 ? (
          `Inga träffar för "${q}".`
        ) : null}
      </p>

      {q && firstPage?.total === 0 && !isSearching && (
        <div className="flex max-w-3xl flex-col items-center gap-3 rounded-lg bg-brand-beige px-6 py-12 text-center">
          <SearchX className="size-10 text-brand-secondary" aria-hidden />
          <p className="text-lg text-brand-dark">
            Inga träffar för <strong>&quot;{q}&quot;</strong>
          </p>
          <p className="text-sm text-brand-gray">
            Kontrollera stavningen eller prova ett bredare sökord, till exempel en druva eller ett land.
          </p>
        </div>
      )}

      <ul
        aria-busy={isSearching}
        // Negative margin lines the rows' content up with the input; the padding
        // is only there for the hover background.
        className={`-mx-3 grid gap-x-8 lg:grid-cols-2 transition-opacity duration-200 ${isSearching ? "opacity-50" : "opacity-100"}`}
      >
        {showSkeleton &&
          Array.from({ length: 6 }, (_, i) => <SearchResultItemSkeleton key={i} />)}
        {hits.map((hit) => (
          <SearchResultItem key={hit.id} hit={hit} />
        ))}
        {isFetchingNextPage &&
          Array.from({ length: 3 }, (_, i) => (
            <SearchResultItemSkeleton key={`next-${i}`} />
          ))}
      </ul>

      {hasNextPage && firstPage && (
        <div className="flex flex-col items-center gap-2 pt-8">
          <p className="text-sm text-brand-gray">
            Visar {formatCount(hits.length)} av {formatCount(firstPage.total)}
          </p>
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage && <Spinner />}
            Visa fler
          </Button>
        </div>
      )}
    </section>
  );
}
