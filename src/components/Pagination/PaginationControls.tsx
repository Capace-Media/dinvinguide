"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface PaginationControlsProps {
  params: { slug: string };
  startCursor: string;
  endCursor: string;
  first: number | null;
  last: number | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  postsCount: number;
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
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";

  return (
    <div className="flex gap-2">
      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasPreviousPage}
        onClick={() => {
          router.push(
            `/skribenter/${params?.slug}/?page=${
              Number(page) - 1
            }&last=${last}&first=null&previousCursor=${startCursor}`
          );
        }}
      >
        prev page
      </button>

      <div>
        {page} av {Math.ceil(Number(postsCount) / Number(first))}
      </div>

      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/skribenter/${params?.slug}/?page=${
              Number(page) + 1
            }&first=${first}&last=null&nextCursor=${endCursor}`
          );
        }}
      >
        next page
      </button>
    </div>
  );
};

export default PaginationControls;
