"use client";

import PostCard from "@/components/post-card";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState, useDeferredValue } from "react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2009 + 1 }, (_, i) => currentYear - i);

const authors = [
    { name: "Alla skribenter", value: "" },
    { name: "Anders Levander", value: "anders" },
    { name: "Anette Rosvall", value: "anetterosvall" },
    { name: "Anna-Antonia Svedberg", value: "annaantonia" },
    { name: "Eva Weckström", value: "eva" },
    { name: "Fredrik Schelin", value: "fredrikschelin" },
    { name: "happyfoodbypetra", value: "happyfoodbypetra" },
    { name: "Jerry Lindahl", value: "jerry" },
    { name: "Karoline Nordefors", value: "nordefors" },
    { name: "Magnus Reuterdahl", value: "magnus" },
    { name: "Maja Berthas", value: "maja" },
    { name: "Raphael", value: "raphael" },
    { name: "Sofia Ander", value: "sofiaander" },
    { name: "Tobias Pryssander", value: "tobias-pryssander" },
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

export default function AllArticles() {
    const [search, setSearch] = useState("");
    const [year, setYear] = useState("");
    const deferredSearch = useDeferredValue(search);
    const [authorName, setAuthorName] = useState("");
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["articles", deferredSearch, year, authorName],
        queryFn: ({ pageParam }) =>
            fetch(buildUrl(16, deferredSearch, year, authorName, pageParam)).then(r => r.json()),
        initialPageParam: "",
        getNextPageParam: (lastPage) =>
            lastPage?.posts?.pageInfo?.hasNextPage
                ? lastPage.posts.pageInfo.endCursor
                : undefined,
    });

    const articles = data?.pages.flatMap(page => page?.posts?.edges ?? []) ?? [];
    const total = data?.pages[0]?.posts?.pageInfo?.total;

    return (
        <section className="layout bg-white">
            <h1>Artiklar</h1>

            <div className="flex flex-wrap gap-3 my-6">
                <InputGroup className="w-full sm:max-w-xs">
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                    <InputGroupInput
                        placeholder="Sök artiklar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {total !== undefined && (
                        <InputGroupAddon align="inline-end">
                            {total} {total === 1 ? "träff" : "träffar"}
                        </InputGroupAddon>
                    )}
                </InputGroup>
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
                {(search || year || authorName) && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setSearch(""); setYear(""); setAuthorName(""); }}
                    >
                        Rensa filter
                    </Button>
                )}
            </div>

            {isLoading && <div>Laddar...</div>}
            {error && <div>Fel: {error.message}</div>}

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {articles.map((article: any) => (
                    <PostCard key={article.node.id} post={article.node} />
                ))}
            </ul>

            {hasNextPage && (
                <div className="flex justify-center mt-8">
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        variant="outline"
                    >
                        {isFetchingNextPage ? "Laddar..." : "Ladda fler"}
                    </Button>
                </div>
            )}
        </section>
    );
}