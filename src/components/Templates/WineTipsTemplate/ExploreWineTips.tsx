import PaginationController from "@/components/Pagination/Controller";
import { getDrinkTips } from "@/lib/queries/getDrinkTips";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const ExploreWineTips = async ({ searchParams }: Props) => {
  const postsPerPage: number = 16;

  const first: number = parseInt(
    searchParams?.first ? searchParams?.first : postsPerPage
  );
  const last: number = parseInt(searchParams?.last);
  const after = searchParams?.after;
  const before = searchParams?.before;

  const data = await getDrinkTips(after, before, first, last);

  const { edges, pageInfo } = data;

  return (
    <div className="">
      <h1 className="pb-10 md:pb-20 text-center layout bg-white">
        EXKLUSIVA DRYCKESTIPS
      </h1>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-[4.3rem] pb-10 layout bg-white">
        {edges &&
          edges.map((wine: any) => {
            return (
              <li key={wine.node.id} className="group">
                <Link
                  href={`/dryckestips/${wine?.node?.slug}`}
                  className="flex"
                  aria-label={`läs mer om ${wine?.node?.title}`}
                >
                  <div className="min-w-[100px] h-[150px] relative shake-image">
                    {wine?.node?.featuredImage?.node?.mediaItemUrl && (
                      <Image
                        src={wine.node.featuredImage.node.mediaItemUrl}
                        alt={
                          wine?.node?.featuredImage?.node?.altText
                            ? wine.node.featuredImage.node.altText
                            : `bild på ${wine?.node?.title}`
                        }
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                        sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
                        className=""
                      />
                    )}
                  </div>
                  <div className=" flex gap-2 flex-col justify-center w-full p-4 ">
                    <h2 className="text-[17px] lg:group-hover:underline">
                      {wine?.node?.title}
                    </h2>

                    {wine?.node?.acf_dryckestips?.betyget && (
                      <p className="text-[12px]">
                        {wine.node.acf_dryckestips.betyget}/100
                      </p>
                    )}

                    <p className="text-[14px] flex">
                      {wine?.node?.acf_dryckestips?.dryckestyper} -{" "}
                      {wine?.node?.acf_dryckestips?.forpackningar}
                    </p>

                    <p className="text-[14px]">
                      {wine?.node?.acf_dryckestips?.pris}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>

      {pageInfo?.hasNextPage === true || pageInfo?.hasPreviousPage === true ? (
        <PaginationController
          pageInfo={pageInfo}
          uri="/dryckestips"
          id="dryckestips"
        />
      ) : null}
    </div>
  );
};

export default ExploreWineTips;
