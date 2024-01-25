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

  console.log("promise =====>", promise);
  return (
    <div className="">
      <h2 className=" leading-[6.9rem] text-[6.9rem] uppercase py-4">
        {searchParams?.filter || "a"}
      </h2>
      <ul className=" grid lg:grid-cols-3 lg:gap-[3.5rem] min-h-[185px] py-8 border-b-2 border-[#333]">
        {promise.edges &&
          promise.edges.map((word: any) => {
            return (
              <li key={word.node.id}>
                <Link
                  className="flex justify-between items-center pr-20"
                  href={`/${word.node.slug}`}
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
          uri={`/guide/ordlistan`}
          id="wineAtlas"
          filter={searchParams?.filter || "a"}
        />
      ) : null}
    </div>
  );
};

export default WordsByLetter;
