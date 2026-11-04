"use client";

import { getSuppliers } from "@/app/actions/suppliers";

import {
  ArrowNextActive,
  ArrowNextDis,
  ArrowPrevActive,
  ArrowPrevDis,
} from "@/components/icons";
import handleParse from "@/lib/utils/handleParse";
import { truncateText } from "@/lib/utils/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SuppliersList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get cursor values from URL
  const after = searchParams.get("after") || undefined;
  const before = searchParams.get("before") || undefined;
  const pageSize = Number(searchParams.get("pageSize") || 8);

  // Add state to track current page
  const currentPage = Number(searchParams.get("page") || 1);

  // Create a function to update URL search params
  const createQueryString = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    // Update or delete provided parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    return newParams.toString();
  };

  const { data, error, status, isFetching } = useQuery({
    queryKey: ["suppliers", after, before, pageSize],
    queryFn: () =>
      getSuppliers({
        after,
        before,
        first: before ? undefined : pageSize,
        last: before ? pageSize : undefined,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
  });

  // Handle navigation to next page
  const handleNextPage = () => {
    if (data?.pageInfo?.hasNextPage) {
      router.push(
        `${pathname}?${createQueryString({
          after: data.pageInfo.endCursor,
          before: null,
          page: String(currentPage + 1),
        })}`,
        { scroll: false },
      );
    }
  };

  // Handle navigation to previous page
  const handlePreviousPage = () => {
    if (data?.pageInfo?.hasPreviousPage) {
      router.push(
        `${pathname}?${createQueryString({
          after: null,
          before: data.pageInfo.startCursor,
          page: String(currentPage - 1),
        })}`,
        { scroll: false },
      );
    }
  };

  // Handle changing page size
  const handlePageSizeChange = (newSize: number) => {
    router.push(
      `${pathname}?${createQueryString({
        pageSize: String(newSize),
        after: null,
        before: null,
        page: "1", // Reset to page 1 when changing page size
      })}`,
    );
  };

  if (status === "pending")
    return (
      <section className="layout contain bg-white">
        <div>
          <h2 className="pb-10 text-[2rem] font-bold">
            Utforska våra importörer
          </h2>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(pageSize)
            .fill(0)
            .map((_, index) => (
              <li key={`skeleton-${index}`} className="group">
                <SkeletonCard />
              </li>
            ))}
        </ul>

        <div className="flex items-center justify-center gap-2 py-10">
          {/* Skeleton pagination */}
          <div className="rounded-xs bg-gray-200 p-2.5"></div>
          <div className="flex items-center justify-center gap-3">
            <div className="h-7 w-7 rounded-xs bg-gray-200"></div>
          </div>
          <div className="rounded-xs bg-gray-200 p-2.5"></div>
        </div>
      </section>
    );
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <section className="layout contain bg-white">
      <div>
        <h2 className="pb-10 text-[2rem] font-bold">
          Utforska våra importörer
        </h2>
      </div>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data?.edges?.map((supplier) => (
          <li
            key={supplier.node.id}
            className="group lg:duration-200 lg:ease-in-out lg:hover:-translate-y-1.75"
          >
            <Link href={`/importorer/${supplier.node.slug}`}>
              <div className="relative h-50 w-full rounded-t-[10px] bg-[#F5F5F5]">
                {supplier.node.featuredImage?.node?.mediaItemUrl ? (
                  <Image
                    src={supplier.node.featuredImage.node.mediaItemUrl}
                    alt={
                      supplier.node.featuredImage.node.altText ||
                      `Bild på ${supplier.node.title}`
                    }
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "5px 5px 0px 0px",
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-gray-400">Ingen bild</span>
                  </div>
                )}
              </div>
              <div className="h-22.25 w-full rounded-b-[10px] bg-[#F5F5F5] p-2">
                <h3 className="text-[18px] md:group-hover:underline">
                  {supplier.node.title}
                </h3>
                <div>
                  {handleParse(truncateText(supplier.node.excerpt || "", 90))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center gap-2 py-10">
        <button
          onClick={handlePreviousPage}
          disabled={!data?.pageInfo?.hasPreviousPage || isFetching}
          className="flex items-center justify-center p-2.5"
        >
          {!data?.pageInfo?.hasPreviousPage || isFetching ? (
            <ArrowPrevDis />
          ) : (
            <ArrowPrevActive />
          )}
          <span className="sr-only">Föregående i listan</span>
        </button>

        <div className="flex items-center justify-center gap-3">
          {/* Show previous page number if available */}
          {currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className="flex h-7 w-7 items-center justify-center rounded-xs text-gray-600 hover:bg-gray-100"
              disabled={!data?.pageInfo?.hasPreviousPage || isFetching}
            >
              {currentPage - 1}
            </button>
          )}

          {/* Current page */}
          <span className="flex h-7 w-7 items-center justify-center bg-brand-secondary text-white">
            {currentPage}
          </span>

          {/* Show next page number if available */}
          {data?.pageInfo?.hasNextPage && (
            <button
              onClick={handleNextPage}
              className="flex h-7 w-7 items-center justify-center rounded-xs text-gray-600 hover:bg-gray-100"
              disabled={isFetching}
            >
              {currentPage + 1}
            </button>
          )}
        </div>

        <button
          onClick={handleNextPage}
          disabled={!data?.pageInfo?.hasNextPage || isFetching}
          className="flex items-center justify-center p-2.5"
        >
          {!data?.pageInfo?.hasNextPage || isFetching ? (
            <ArrowNextDis />
          ) : (
            <ArrowNextActive />
          )}
          <span className="sr-only">Nästa i listan</span>
        </button>
      </div>
    </section>
  );
}

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="h-50 w-full rounded-t-[10px] bg-gray-300"></div>
    <div className="h-22.25 w-full rounded-b-[10px] bg-gray-200 p-2">
      <div className="mb-2 h-5 w-3/4 rounded-sm bg-gray-300"></div>
      <div className="mb-1 h-3 w-full rounded-sm bg-gray-300"></div>
      <div className="h-3 w-2/3 rounded-sm bg-gray-300"></div>
    </div>
  </div>
);
