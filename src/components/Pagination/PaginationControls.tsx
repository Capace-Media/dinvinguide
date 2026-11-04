"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import {
  ArrowNextActive,
  ArrowNextDis,
  ArrowPrevActive,
  ArrowPrevDis,
} from "../icons";

interface PaginationControlsProps {
  params: { slug: string };
  startCursor: string;
  endCursor: string;
  first: number | null;
  last: number | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  postsCount: number;
  scrollToPosts: any;
  search: any;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  params,
  startCursor,
  endCursor,
  first,
  last,
  hasNextPage,
  hasPreviousPage,
  postsCount,
  scrollToPosts,
  search,
}) => {
  const router = useRouter();
  const searchParams: any = useSearchParams();

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
    <div className="flex items-center justify-center gap-2 py-10">
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
            `/skribenter/${params?.slug}/?page=${
              Number(page) - 1
            }&last=${last}&first=null&previousCursor=${startCursor}&search=${
              search ? search : ""
            }`,
            { scroll: false },
          );
          // scrollToPosts();
          if (isMobile) {
            scrollToPosts();
          }
        }}
      >
        {!hasPreviousPage ? <ArrowPrevDis /> : <ArrowPrevActive />}
      </button>

      <div className="flex items-center justify-center gap-3">
        <span className="flex h-[28px] w-[28px] items-center justify-center bg-brand-secondary text-white">
          {page}
        </span>{" "}
        av {Math.ceil(Number(postsCount) / Number(first))}
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
            `/skribenter/${params?.slug}/?page=${
              Number(page) + 1
            }&first=${first}&last=null&nextCursor=${endCursor}&search=${
              search ? search : ""
            }`,
            { scroll: false },
          );
          // scrollToPosts();
          if (isMobile) {
            scrollToPosts();
          }
        }}
      >
        {!hasNextPage ? <ArrowNextDis /> : <ArrowNextActive />}
      </button>
    </div>
  );
};

export default PaginationControls;
