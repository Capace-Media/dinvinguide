import { getGapesByType } from "@/lib/queries/getGapesByType";
import { getWineSchools } from "@/lib/queries/getWineSchools";
import Image from "next/image";
import Link from "next/link";
import WineSchoolController from "./WineSchoolController";

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

const WineSchoolPagination = async ({ params, searchParams }: Props) => {
  const postsPerPage: number =
    typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 16;

  const startFirst: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const endLast: number = parseInt(searchParams?.last);

  const promise = await getWineSchools({
    after: searchParams?.after,
    before: searchParams?.before,
    first: startFirst,
    last: endLast,
  });

  return (
    <section className="layout bg-white">
      <div>
        <h2 className="pb-10">Skolor hos DinVinguide</h2>
        <ul className="grid md:grid-cols-2 gap-4 lg:grid-cols-4">
          {promise?.edges &&
            promise.edges.map((grape: any) => {
              return (
                <li
                  key={grape?.node?.id}
                  className="group lg:hover:-translate-y-[7px] lg:ease-in-out lg:duration-200"
                >
                  <Link
                    href={`/guide/vinskolan/${grape?.node?.slug}`}
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
        {promise?.pageInfo?.hasNextPage === true ||
        promise?.pageInfo?.hasPreviousPage === true ? (
          <WineSchoolController pageInfo={promise?.pageInfo} />
        ) : null}
      </div>
    </section>
  );
};

export default WineSchoolPagination;
