import PaginationController from "@/components/Pagination/Controller";
import { WordArrow } from "@/components/icons";
import { getWordByLetter } from "@/lib/queries/getWordByLetter";
import Link from "next/link";

interface WordsByLetterProps {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
}

const WordsByLetter = async ({ searchParams }: WordsByLetterProps) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 9 : 9;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);

  const promise = await getWordByLetter({
    after: searchParams?.after,
    before: searchParams?.before,
    id: searchParams?.filter || "a",
    first: startFirst,
    last: endLast,
  });
  let word: string | undefined = searchParams?.filter;
  return (
    <div className="">
      <h2 className=" leading-[6.9rem] text-[6.9rem] uppercase py-4">
        {word === "o-2"
          ? "ö"
          : word === "a-2"
          ? "å"
          : word === "a-3"
          ? "ä"
          : !word
          ? "a"
          : word}
      </h2>
      <ul className=" grid lg:grid-cols-3 lg:gap-14 min-h-[185px] py-8 border-b-2 border-[#333] pb-12">
        {promise.edges &&
          promise.edges.map((word: any) => {
            return (
              <li key={word.node.id}>
                <Link
                  className="flex justify-between items-center pr-20"
                  href={`/ordlistan/${word.node.slug}`}
                >
                  {word.node.title}
                  <WordArrow />
                </Link>
              </li>
            );
          })}
      </ul>
      {promise?.pageInfo?.hasNextPage === true ||
      promise?.pageInfo?.hasPreviousPage === true ? (
        <PaginationController
          pageInfo={promise?.pageInfo}
          uri={`/ordlistan`}
          id="wineAtlas"
          filter={searchParams?.filter || "a"}
        />
      ) : null}
    </div>
  );
};

export default WordsByLetter;
