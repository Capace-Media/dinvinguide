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
        { scroll: false }
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
        { scroll: false }
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
      })}`
    );
  };

  if (status === "pending")
    return (
      <section className="bg-white layout contain">
        <div>
          <h2 className="text-[2rem] font-bold pb-10">
            Utforska våra importörer
          </h2>
        </div>

        <ul className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
          {Array(pageSize)
            .fill(0)
            .map((_, index) => (
              <li key={`skeleton-${index}`} className="group">
                <SkeletonCard />
              </li>
            ))}
        </ul>

        <div className="flex justify-center items-center gap-2 py-10">
          {/* Skeleton pagination */}
          <div className="p-2.5 bg-gray-200 rounded-xs"></div>
          <div className="flex justify-center items-center gap-3">
            <div className="w-7 h-7 bg-gray-200 rounded-xs"></div>
          </div>
          <div className="p-2.5 bg-gray-200 rounded-xs"></div>
        </div>
      </section>
    );
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <section className="bg-white layout contain">
      <div>
        <h2 className="text-[2rem] font-bold pb-10">
          Utforska våra importörer
        </h2>
      </div>

      <ul className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
        {data?.edges?.map((supplier) => (
          <li
            key={supplier.node.id}
            className="group lg:hover:-translate-y-1.75 lg:ease-in-out lg:duration-200"
          >
            <Link href={`/importorer/${supplier.node.slug}`}>
              <div className="relative h-50 w-full bg-[#F5F5F5] rounded-t-[10px]">
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
                  <div className="flex items-center justify-center h-full w-full">
                    <span className="text-gray-400">Ingen bild</span>
                  </div>
                )}
              </div>
              <div className="h-22.25 w-full bg-[#F5F5F5] p-2 rounded-b-[10px]">
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

      <div className="flex justify-center items-center gap-2 py-10">
        <button
          onClick={handlePreviousPage}
          disabled={!data?.pageInfo?.hasPreviousPage || isFetching}
          className="p-2.5 flex items-center justify-center"
        >
          {!data?.pageInfo?.hasPreviousPage || isFetching ? (
            <ArrowPrevDis />
          ) : (
            <ArrowPrevActive />
          )}
          <span className="sr-only">Föregående i listan</span>
        </button>

        <div className="flex justify-center items-center gap-3">
          {/* Show previous page number if available */}
          {currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className="w-7 flex justify-center items-center h-7 text-gray-600 hover:bg-gray-100 rounded-xs"
              disabled={!data?.pageInfo?.hasPreviousPage || isFetching}
            >
              {currentPage - 1}
            </button>
          )}

          {/* Current page */}
          <span className="w-7 flex justify-center items-center h-7 text-white bg-brand-secondary">
            {currentPage}
          </span>

          {/* Show next page number if available */}
          {data?.pageInfo?.hasNextPage && (
            <button
              onClick={handleNextPage}
              className="w-7 flex justify-center items-center h-7 text-gray-600 hover:bg-gray-100 rounded-xs"
              disabled={isFetching}
            >
              {currentPage + 1}
            </button>
          )}
        </div>

        <button
          onClick={handleNextPage}
          disabled={!data?.pageInfo?.hasNextPage || isFetching}
          className="p-2.5 flex items-center justify-center"
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
    <div className="h-50 w-full bg-gray-300 rounded-t-[10px]"></div>
    <div className="h-22.25 w-full bg-gray-200 p-2 rounded-b-[10px]">
      <div className="h-5 bg-gray-300 rounded-sm w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 rounded-sm w-full mb-1"></div>
      <div className="h-3 bg-gray-300 rounded-sm w-2/3"></div>
    </div>
  </div>
);
