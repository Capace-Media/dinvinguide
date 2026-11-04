"use client";
import {
  ArrowNextActive,
  ArrowNextDis,
  ArrowPrevActive,
  ArrowPrevDis,
} from "@/components/icons";

import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

interface PaginationControllerProps {
  pageInfo: any;
  filter?: string;
  uri: string;
  id?: any;
  search?: any;
  identifier?: string;
}

const PaginationController = ({
  pageInfo,
  filter,
  uri,
  id,
  search,
  identifier,
}: PaginationControllerProps) => {
  const { endCursor, hasNextPage, hasPreviousPage, startCursor, total } =
    pageInfo;

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
    <div className="layout flex items-center justify-center gap-2 bg-white py-10">
      <button
        aria-label="föregående sida för posterna"
        className={`flex items-center justify-center p-[10px] ${
          !hasPreviousPage
            ? ""
            : "md:duration-300 md:ease-in-out md:hover:scale-110"
        }`}
        disabled={!hasPreviousPage}
        onClick={() => {
          router.push(
            `${uri}?page=${
              Number(page) - 1
            }&last=16&first=null&before=${startCursor}${
              filter ? `&filter=${filter}` : ""
            }${identifier ? `&identifier=${identifier}` : ""}&search=${
              search ? search : ""
            }`,
            { scroll: true },
          );
        }}
      >
        {!hasPreviousPage ? <ArrowPrevDis /> : <ArrowPrevActive />}
      </button>

      <div className="flex items-center justify-center gap-3">
        <span className="flex h-[28px] w-[28px] items-center justify-center bg-brand-secondary text-white">
          {page}
        </span>{" "}
        av {""}
        {Math.ceil(parseInt(total) / parseInt(first))}
      </div>

      <button
        aria-label="nästa sida för posterna"
        className={`flex items-center justify-center p-[10px] ${
          !hasNextPage
            ? ""
            : "md:duration-300 md:ease-in-out md:hover:scale-110"
        }`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `${uri}?page=${
              Number(page) + 1
            }&first=16&last=null&after=${endCursor}${
              filter ? `&filter=${filter}` : ""
            }${identifier ? `&identifier=${identifier}` : ""}&search=${
              search ? search : ""
            }`,
            { scroll: true },
          );
        }}
      >
        {!hasNextPage ? <ArrowNextDis /> : <ArrowNextActive />}
      </button>
    </div>
  );
};

export default PaginationController;
