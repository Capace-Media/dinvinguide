"use client";

import PostCard, { PostCardSkeleton } from "@/components/post-card";
import { Button } from "@/components/ui/button";
// import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { SearchInput } from "@/components/ui/search-input";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounceValue } from "@/hooks/useDebounce";
import { useState } from "react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2009 + 1 }, (_, i) => currentYear - i);

const authors = [
    { name: "Alla skribenter", value: "" },
    { name: "Fredrik Schelin", value: "fredrikschelin" },      // 1603
    { name: "Sofia Ander", value: "sofiaander" },              // 1505
    { name: "Magnus Reuterdahl", value: "magnus" },            // 932
    { name: "Anders Levander", value: "anders" },              // 444
    { name: "Karoline Nordefors", value: "nordefors" },       // 3112
    { name: "Eva Weckström", value: "eva" },                   // 224
    { name: "Maja Berthas", value: "maja" },                   // 401
    { name: "Anette Rosvall", value: "anetterosvall" },        // 710
    { name: "happyfoodbypetra", value: "happyfoodbypetra" },   // 138
    { name: "Jerry Lindahl", value: "jerry" },                 // 117
    { name: "Tobias Pryssander", value: "tobias-pryssander" }, // 21
    { name: "Anna-Antonia Svedberg", value: "annaantonia" },   // 7
    { name: "Raphael", value: "raphael" },                     // 4
]

function buildUrl(first: number, search: string, year: string, authorName: string, after?: string) {
    const params = new URLSearchParams();
    params.set("first", String(first));
    if (search) params.set("search", search);
    if (year) params.set("year", year);
    if (authorName) params.set("authorName", authorName);
    if (after) params.set("after", after);
    return `/api/posts?${params.toString()}`;
}

type Props = {
    authorName?: string;
    title: string;
}
export default function AllArticles(props: Props) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, isSearchPending] = useDebounceValue(search, 400);
    const [year, setYear] = useState("");
    const [authorName, setAuthorName] = useState(props.authorName || "");
    const {
        data,
        isLoading,
        isFetching,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["articles", debouncedSearch, year, authorName],
        queryFn: ({ pageParam }) =>
            fetch(buildUrl(16, debouncedSearch, year, authorName, pageParam)).then(r => r.json()),
        initialPageParam: "",
        getNextPageParam: (lastPage) =>
            lastPage?.posts?.pageInfo?.hasNextPage
                ? lastPage.posts.pageInfo.endCursor
                : undefined,
    });

    const articles = data?.pages.flatMap(page => page?.posts?.edges ?? []) ?? [];
    const total = data?.pages[0]?.posts?.pageInfo?.total;
    const isSearching = isSearchPending || (isFetching && !isFetchingNextPage && !isLoading);
    const hasActiveFilters = !!(debouncedSearch || year || authorName);

    return (
        <section className="bg-white px-1 md:px-8 lg:px-17 m-auto xl:max-w-444.25">
            <div className="py-2 mx-3">

                <div className="md:flex md:justify-between md:items-center ">
                    <div>
                        <h2>{props.title}</h2>
                    </div>

                    <div className="flex gap-3">
                        {(search || year) && (
                            <Button
                                variant="outline"
                                onClick={() => { setSearch(""); setYear(""); setAuthorName(""); }}
                            >
                                Rensa filter
                            </Button>
                        )}
                        {/*
                        <NativeSelect value={year} onChange={(e) => setYear(e.target.value)}>
                        <NativeSelectOption value="">Alla år</NativeSelectOption>
                        {years.map((y) => (
                            <NativeSelectOption key={y} value={y}>{y}</NativeSelectOption>
                        ))}
                        </NativeSelect>
                        <NativeSelect value={authorName} onChange={(e) => setAuthorName(e.target.value)}>
                            {authors.map((author) => (
                                <NativeSelectOption key={author.value} value={author.value}>{author.name}</NativeSelectOption>
                            ))}
                        </NativeSelect>
                        */}
                        <SearchInput
                            placeholder="Sök artiklar..."
                            value={search}
                            onChange={setSearch}
                            total={total}
                        />

                    </div>
                </div>
                <div className="w-full h-1.25 my-3 bg-brand-beige lg:col-span-5"></div>
            </div>

            {error && <div>Fel: {error.message}</div>}

            {!isLoading && hasActiveFilters && (
                <p aria-live="polite" className="text-sm text-muted-foreground mx-3 mb-2">
                    {isSearching ? (
                        "Söker..."
                    ) : total === 0 ? (
                        <>Inga artiklar hittades{debouncedSearch ? <> för <strong>&quot;{debouncedSearch}&quot;</strong></> : ""}. Prova ett annat sökord.</>
                    ) : (
                        <>Visar {total} {total === 1 ? "artikel" : "artiklar"}{debouncedSearch ? <> för <strong>&quot;{debouncedSearch}&quot;</strong></> : ""}</>
                    )}
                </p>
            )}

            <ul aria-busy={isSearching} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 transition-opacity duration-200 ${isSearching ? "opacity-50" : "opacity-100"}`}>
                {isLoading && Array.from({ length: 16 }).map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
                {articles.map((article: any) => (
                    <PostCard key={article.node.id} post={article.node} />
                ))}
                {isFetchingNextPage && Array.from({ length: 16 }).map((_, i) => (
                    <PostCardSkeleton key={`next-${i}`} />
                ))}
            </ul>

            {hasNextPage && (
                <div className="flex justify-center mt-8">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        variant="outline"
                    >
                        {isFetchingNextPage ? <Spinner /> : ""}
                        Ladda fler artiklar
                    </Button>
                </div>
            )}
        </section>
    );
}
