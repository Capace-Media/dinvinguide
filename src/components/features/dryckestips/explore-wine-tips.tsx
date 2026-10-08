import PaginationController from "@/components/Pagination/Controller";
import { getDrinkTips } from "@/lib/api/drink-tips/get-drink-tips";
import {
  parsePaginationSearchParams,
  type RouteSearchParams,
} from "@/lib/utils/pagination-search-params";
import Image from "next/image";
import Link from "next/link";

const DRINK_TIPS_PER_PAGE = 16;

interface ExploreWineTipsProps {
  searchParams: RouteSearchParams;
}

const ExploreWineTips = async ({ searchParams }: ExploreWineTipsProps) => {
  const { after, before, first, last } = parsePaginationSearchParams(
    searchParams,
    DRINK_TIPS_PER_PAGE
  );

  const drinkTips = await getDrinkTips({ after, before, first, last });
  const edges = drinkTips?.edges ?? [];
  const pageInfo = drinkTips?.pageInfo;

  return (
    <div>
      <h1 className="pb-10 md:pb-20 text-center layout bg-white">
        EXKLUSIVA DRYCKESTIPS
      </h1>
      <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-[4.3rem] pb-10 layout bg-white">
        {edges.map((wine) => {
            return (
              <li key={wine.node.id} className="group">
                <Link
                  href={`/dryckestips/${wine.node.slug}`}
                  className="flex"
                  aria-label={`läs mer om ${wine.node.title}`}
                >
                  <div className="min-w-25 h-37.5 relative lg:group-hover:animate-shake">
                    {wine.node.featuredImage?.node?.mediaItemUrl && (
                      <Image
                        src={wine.node.featuredImage.node.mediaItemUrl}
                        alt={
                          wine.node.featuredImage?.node?.altText
                            ? wine.node.featuredImage.node.altText
                            : `bild på ${wine.node.title}`
                        }
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                        sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
                      />
                    )}
                  </div>
                  <div className="flex gap-2 flex-col justify-center w-full p-4">
                    <h2 className="text-[17px] lg:group-hover:underline">
                      {wine.node.title}
                    </h2>

                    {wine.node.acf_dryckestips?.betyget && (
                      <p className="text-[12px]">
                        {wine.node.acf_dryckestips.betyget}/100
                      </p>
                    )}

                    <p className="text-[14px] flex">
                      {wine.node.acf_dryckestips?.dryckestyper} -{" "}
                      {wine.node.acf_dryckestips?.forpackningar}
                    </p>

                    {wine.node.acf_dryckestips?.pris && (
                      <p className="flex items-center gap-3 text-[14px]">
                        {wine.node.acf_dryckestips?.pris?.includes("kr") ||
                        wine.node.acf_dryckestips?.pris.includes("euro") ? (
                          <span>{wine.node.acf_dryckestips?.pris}</span>
                        ) : (
                          <span>{wine.node.acf_dryckestips?.pris}kr</span>
                        )}
                      </p>
                    )}
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
