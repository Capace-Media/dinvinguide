"use client";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { SearchResponse } from "@/app/api/search/route";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Spinner } from "@/components/ui/spinner";
import { useDebounceValue } from "@/hooks/useDebounce";
import {
  normalizeQuery,
  SEARCH_TYPES,
  type SearchType,
} from "@/lib/search/search-types";
import {
  SearchResultItem,
  SearchResultItemSkeleton,
} from "./search-result-item";
import {
  SEARCH_PAGE_SIZE,
  SEARCH_TYPE_LABELS,
  searchQueryKey,
} from "./search-query";

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
    isPlaceholderData,
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
    placeholderData: keepPreviousData,
  });

  const firstPage = data?.pages[0];
  const hits = data?.pages.flatMap((page) => page.hits) ?? [];
  const isSearching = isTyping || (isFetching && !isFetchingNextPage);
  const showSkeleton = q !== null && isPending;

  return (
    <section className="space-y-6">
      <SearchInput
        placeholder="Sök recept, dryckestips, artiklar, drycker och druvor"
        value={search}
        onChange={setSearch}
        total={q && firstPage && !isPlaceholderData ? firstPage.total : undefined}
        className="sm:max-w-xl"
      />

      {q && firstPage && (
        <div className="flex flex-wrap gap-2" aria-label="Filtrera på innehållstyp">
          <Button
            size="sm"
            variant={type ? "outline" : "default"}
            aria-pressed={!type}
            onClick={() => setType(undefined)}
          >
            Alla
          </Button>
          {SEARCH_TYPES.map((searchType) => (
            <Button
              key={searchType}
              size="sm"
              variant={type === searchType ? "default" : "outline"}
              aria-pressed={type === searchType}
              disabled={firstPage.countsByType[searchType] === 0}
              onClick={() => setType(searchType)}
            >
              {SEARCH_TYPE_LABELS[searchType]} ({firstPage.countsByType[searchType]})
            </Button>
          ))}
        </div>
      )}

      <p aria-live="polite" className="text-sm text-muted-foreground">
        {!q ? null : isSearching ? (
          "Söker..."
        ) : error ? (
          error.message
        ) : firstPage?.total === 0 ? (
          <>
            Inga träffar för <strong>&quot;{q}&quot;</strong>. Prova ett annat sökord.
          </>
        ) : firstPage ? (
          <>
            {firstPage.total} {firstPage.total === 1 ? "träff" : "träffar"} för{" "}
            <strong>&quot;{q}&quot;</strong>
          </>
        ) : null}
      </p>

      <ul
        aria-busy={isSearching}
        className={`grid gap-2 md:grid-cols-2 transition-opacity duration-200 ${isSearching ? "opacity-50" : "opacity-100"}`}
      >
        {showSkeleton &&
          Array.from({ length: 6 }, (_, i) => <SearchResultItemSkeleton key={i} />)}
        {hits.map((hit) => (
          <SearchResultItem key={hit.id} hit={hit} />
        ))}
        {isFetchingNextPage &&
          Array.from({ length: 4 }, (_, i) => (
            <SearchResultItemSkeleton key={`next-${i}`} />
          ))}
      </ul>

      {hasNextPage && (
        <div className="flex justify-center">
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
