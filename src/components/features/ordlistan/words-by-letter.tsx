import PaginationController from "@/components/Pagination/Controller";
import { getWordsByLetter } from "@/lib/api/words/get-words";
import {
  parsePaginationSearchParams,
  type RouteSearchParams,
} from "@/lib/utils/pagination-search-params";
import { MoveRight } from "lucide-react";
import Link from "next/link";

const WORDS_PER_PAGE = 9;

// WordPress slugs for the Swedish letters.
const letterLabels: Readonly<Record<string, string>> = {
  "o-2": "ö",
  "a-2": "å",
  "a-3": "ä",
};

interface WordsByLetterProps {
  searchParams: RouteSearchParams;
}

const WordsByLetter = async ({ searchParams }: WordsByLetterProps) => {
  const { after, before, first, last, filter } = parsePaginationSearchParams(
    searchParams,
    WORDS_PER_PAGE
  );
  const letter = filter || "a";

  const words = await getWordsByLetter({
    after,
    before,
    id: letter,
    first,
    last,
  });

  return (
    <div>
      <h2 className="leading-[6.9rem] text-[6.9rem] uppercase py-4">
        {letterLabels[letter] ?? letter}
      </h2>
      <ul className="grid lg:grid-cols-3 lg:gap-14 min-h-46.25 py-8 border-b-2 border-brand-dark pb-12">
        {words?.edges &&
          words.edges.map((word) => {
            return (
              <li key={word.node.id}>
                <Link
                  className="flex justify-between items-center pr-20"
                  href={`/ordlistan/${word.node.slug}`}
                >
                  {word.node.title}
                  <MoveRight className="size-6" strokeWidth={1} aria-hidden />
                </Link>
              </li>
            );
          })}
      </ul>
      {words?.pageInfo?.hasNextPage === true ||
      words?.pageInfo?.hasPreviousPage === true ? (
        <PaginationController
          pageInfo={words.pageInfo}
          uri="/ordlistan"
          id="wineAtlas"
          filter={letter}
        />
      ) : null}
    </div>
  );
};

export default WordsByLetter;
