"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  GuideCard,
  GuideCardSkeleton,
} from "@/components/shared/pagination/guide-pagination";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { Spinner } from "@/components/ui/spinner";
import { useDebounceValue } from "@/hooks/use-debounce";
import {
  GUIDES_PER_PAGE,
  type GuideKey,
} from "@/lib/api/guides/guide-list-params";
import type { GuideListResponse } from "@/app/api/guides/route";
import { type GuideListFetcher, guideListQuery } from "./guide-list-query";

const fetchGuideListPage: GuideListFetcher = async ({
  guide,
  after,
  search,
}) => {
  const params = new URLSearchParams({ guide });
  if (after) params.set("after", after);
  if (search) params.set("search", search);

  const res = await fetch(`/api/guides?${params.toString()}`);
  if (!res.ok) throw new Error("Kunde inte hämta guiderna");
  return ((await res.json()) as GuideListResponse).guides;
};

export interface GuideListProps {
  guide: GuideKey;
  title: string;
  // Base path the cards link to, without a trailing slash.
  uri: string;
  // DOM id of the list.
  idString: string;
}

export default function GuideList({
  guide,
  title,
  uri,
  idString,
}: GuideListProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, isSearchPending] = useDebounceValue(search, 400);
  const term = debouncedSearch.trim();

  const {
    data,
    error,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(guideListQuery(guide, term, fetchGuideListPage));

  const edges = data?.pages.flatMap((page) => page.edges) ?? [];
  // Only the first page, which has no cursor, carries the overall count.
  const total = data?.pages[0]?.pageInfo.total ?? undefined;
  const isSearching =
    isSearchPending || (isFetching && !isFetchingNextPage && !isLoading);

  return (
    <section className="layout bg-white">
      <div className="flex items-center justify-between pb-10">
        <h2>{title}</h2>
        <SearchInput
          placeholder="Sök..."
          value={search}
          onChange={setSearch}
          total={term ? total : undefined}
        />
      </div>

      {error && <p role="alert">Något gick fel. Försök igen om en stund.</p>}

      {!isLoading && !error && edges.length === 0 && (
        <p aria-live="polite" className="text-muted-foreground">
          Inga träffar{term ? ` för "${term}"` : ""}.
        </p>
      )}

      <ul
        id={idString}
        aria-busy={isSearching}
        className={`grid gap-4 transition-opacity duration-200 md:grid-cols-2 lg:grid-cols-4 ${isSearching ? "opacity-50" : "opacity-100"}`}
      >
        {isLoading &&
          Array.from({ length: GUIDES_PER_PAGE }).map((_, i) => (
            <GuideCardSkeleton
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders have no identity
              key={i}
            />
          ))}
        {edges.map((edge) => (
          <GuideCard key={edge.node.id} item={edge} uri={uri} />
        ))}
        {isFetchingNextPage &&
          Array.from({ length: GUIDES_PER_PAGE }).map((_, i) => (
            <GuideCardSkeleton
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton placeholders have no identity
              key={`next-${i}`}
            />
          ))}
      </ul>

      {hasNextPage && (
        <div className="flex justify-center py-10">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
          >
            {isFetchingNextPage ? <Spinner /> : ""}
            Ladda fler
          </Button>
        </div>
      )}
    </section>
  );
}
