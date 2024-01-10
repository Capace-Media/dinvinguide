"use client";
import {
  ArrowNextActive,
  ArrowNextDis,
  ArrowPrevActive,
  ArrowPrevDis,
} from "@/components/icons";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

interface WineExplorerControllerProps {
  pageInfo?: any;
  after?: string;
  before?: string;
}

const WineExplorerController = ({
  pageInfo,
  after,
  before,
}: WineExplorerControllerProps) => {
  const {
    endCursor,
    hasNextPage,
    hasPreviousPage,
    startCursor,
    offsetPagination,
  } = pageInfo;

  const router = useRouter();
  const searchParams: any = useSearchParams();
  const first = "16";

  const page = searchParams.get("page") ?? "1";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex justify-center items-center gap-2 py-10">
      <button
        aria-label="föregående sida för posterna"
        className={` p-[10px] flex items-center justify-center ${
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
          // scrollToPosts();
        }}
      >
        {!hasPreviousPage ? <ArrowPrevDis /> : <ArrowPrevActive />}
      </button>

      <div className="flex justify-center items-center gap-3">
        <span className="w-[28px] flex justify-center items-center h-[28px] text-white bg-brand-secondary">
          {page}
        </span>{" "}
        av {""}
        {Math.ceil(parseInt(offsetPagination?.total) / parseInt(first))}
      </div>

      <button
        aria-label="nästa sida för posterna"
        className={` p-[10px] flex items-center justify-center ${
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
          // scrollToPosts();
        }}
      >
        {!hasNextPage ? <ArrowNextDis /> : <ArrowNextActive />}
      </button>
    </div>
  );
};

export default WineExplorerController;
