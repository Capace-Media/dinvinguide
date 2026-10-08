"use client";
import {
  ArrowNextActive,
  ArrowNextDis,
  ArrowPrevActive,
  ArrowPrevDis,
} from "@/components/icons";
import type { DrinksQuery } from "@/lib/wp/gql/graphql";
import { useRouter, useSearchParams } from "next/navigation";

const DRINKS_PER_PAGE = 16;

interface WineExplorerControllerProps {
  pageInfo: NonNullable<DrinksQuery["drinks"]>["pageInfo"];
}

const WineExplorerController = ({ pageInfo }: WineExplorerControllerProps) => {
  const { endCursor, hasNextPage, hasPreviousPage, startCursor, total } =
    pageInfo;

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  return (
    <div className="flex justify-center items-center gap-2 py-10">
      <button
        aria-label="föregående sida för posterna"
        className={` p-2.5 flex items-center justify-center ${
          !hasPreviousPage
            ? ""
            : "md:hover:scale-110 md:ease-in-out md:duration-300"
        }`}
        disabled={!hasPreviousPage}
        onClick={() => {
          router.push(
            `/dryckesutforskaren/?page=${
              Number(page) - 1
            }&last=16&first=null&before=${startCursor}`,
            { scroll: false }
          );
        }}
      >
        {!hasPreviousPage ? <ArrowPrevDis /> : <ArrowPrevActive />}
      </button>

      <div className="flex justify-center items-center gap-3">
        <span className="w-7 flex justify-center items-center h-7 text-white bg-brand-secondary">
          {page}
        </span>{" "}
        av {""}
        {Math.ceil((total ?? 0) / DRINKS_PER_PAGE)}
      </div>

      <button
        aria-label="nästa sida för posterna"
        className={` p-2.5 flex items-center justify-center ${
          !hasNextPage
            ? ""
            : "md:hover:scale-110 md:ease-in-out md:duration-300"
        }`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/dryckesutforskaren/?page=${
              Number(page) + 1
            }&first=16&last=null&after=${endCursor}`,
            { scroll: false }
          );
        }}
      >
        {!hasNextPage ? <ArrowNextDis /> : <ArrowNextActive />}
      </button>
    </div>
  );
};

export default WineExplorerController;
