import { getGrapes } from "@/lib/api/grapes/get-grapes";
import {
  parsePaginationSearchParams,
  type RouteSearchParams,
} from "@/lib/utils/pagination-search-params";
import Image from "next/image";
import Link from "next/link";
import GrapeFilter from "./grape-filter";
import GrapePaginationController from "./grape-pagination-controller";

const GRAPES_PER_PAGE = 16;

interface GrapePaginationProps {
  searchParams: RouteSearchParams;
}

const GrapePagination = async ({ searchParams }: GrapePaginationProps) => {
  const {
    after,
    before,
    first,
    last,
    filter = "",
  } = parsePaginationSearchParams(searchParams, GRAPES_PER_PAGE);

  const grapes = await getGrapes(filter, {
    after,
    before,
    first,
    last,
    search: "",
  });

  return (
    <section className="layout bg-white">
      <GrapeFilter />
      <div>
        <h2 className="pb-10">Utforska druvor från hela världen</h2>
        <ul className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
          {grapes?.edges.map((grape) => {
              return (
                <li
                  key={grape.node.id}
                  className="group lg:hover:-translate-y-1.75 lg:ease-in-out lg:duration-200"
                >
                  <Link
                    href={`/druvor/${grape.node.slug}`}
                    aria-label={`Läs mer om ${grape.node.title}`}
                  >
                    <div className="relative h-50 w-full bg-[#F5F5F5]">
                      {grape.node.featuredImage?.node?.mediaItemUrl && (
                        <Image
                          src={grape.node.featuredImage.node.mediaItemUrl}
                          alt={
                            grape.node.featuredImage?.node?.altText
                              ? grape.node.featuredImage.node.altText
                              : `bild på ${grape.node.acf_grape?.druvtyp?.name}`
                          }
                          fill
                          style={{
                            objectFit: "cover",
                            borderRadius: "5px 5px 0px 0px",
                          }}
                        />
                      )}
                    </div>
                    <div className="h-17.25 w-full bg-[#F5F5F5] p-2 rounded-b-[10px]">
                      <p className="text-[12px]">
                        {grape.node.acf_grape?.druvtyp?.name &&
                          grape.node.acf_grape.druvtyp.name}
                      </p>
                      <h3 className="text-[18px] md:group-hover:underline">
                        {grape.node.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>

        {grapes?.pageInfo && (
          <GrapePaginationController
            pageInfo={grapes.pageInfo}
            filter={filter}
          />
        )}
      </div>
    </section>
  );
};

export default GrapePagination;
