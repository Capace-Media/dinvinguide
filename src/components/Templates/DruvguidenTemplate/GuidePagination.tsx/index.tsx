import { getGrapes as fetchGrapes } from "@/lib/api/grapes/get-grapes";
import Image from "next/image";
import Link from "next/link";
import DruvPaginationController from "./DruvPaginationController";
import GrapeFilter from "./GrapeFilter";

type DataArgs = {
  after?: string;
  before?: string;
  id?: string | null;
  search?: string;
  first?: number;
  last?: number | null;
};

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};
async function getGrapes(args: DataArgs) {
  const { after, before, id, search = "", first, last } = args;
  const data = await fetchGrapes(id, { after, before, first, last, search });

  return data;
}

const GuidePagination = async ({ params, searchParams }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 16;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);

  const filter: string = searchParams?.filter || "";

  const promise = await getGrapes({
    after: searchParams?.after,
    before: searchParams?.before,
    id: filter,
    search: "",
    first: startFirst,
    last: endLast,
  });

  return (
    <section className="layout bg-white">
      <GrapeFilter />
      <div>
        <h2 className="pb-10">Utforska druvor från hela världen</h2>
        <ul className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
          {promise?.edges &&
            promise.edges.map((grape: any) => {
              return (
                <li
                  key={grape?.node?.id}
                  className="group lg:hover:-translate-y-[7px] lg:ease-in-out lg:duration-200"
                >
                  <Link
                    href={`/druvor/${grape?.node?.slug}`}
                    aria-label={`Läs mer om ${grape?.node?.title}`}
                  >
                    <div className="relative h-[200px] w-full bg-[#F5F5F5]">
                      {grape?.node?.featuredImage?.node?.mediaItemUrl && (
                        <Image
                          src={grape.node.featuredImage.node.mediaItemUrl}
                          alt={
                            grape?.node?.featuredImage?.node?.altText
                              ? grape.node.featuredImage.node.altText
                              : `bild på ${grape?.node?.acf_grape?.druvtyp?.name}`
                          }
                          fill
                          style={{
                            objectFit: "cover",
                            borderRadius: "5px 5px 0px 0px",
                          }}
                        />
                      )}
                    </div>
                    <div className="h-[69px] w-full bg-[#F5F5F5] p-2 rounded-b-[10px]">
                      <p className="text-[12px]">
                        {grape?.node?.acf_grape?.druvtyp?.name &&
                          grape.node.acf_grape.druvtyp.name}
                      </p>
                      <h3 className="text-[18px] md:group-hover:underline">
                        {grape?.node?.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>

        <DruvPaginationController
          pageInfo={promise?.pageInfo}
          filter={filter}
        />
      </div>
    </section>
  );
};

export default GuidePagination;
