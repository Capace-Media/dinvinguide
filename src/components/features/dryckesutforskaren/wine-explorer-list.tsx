import type { DrinksQuery } from "@/lib/wp/gql/graphql";
import Image from "next/image";
import Link from "next/link";

type DrinkEdge = NonNullable<DrinksQuery["drinks"]>["edges"][number];

interface WineExplorerListProps {
  drinks: readonly DrinkEdge[];
}

const WineExplorerList = ({ drinks }: WineExplorerListProps) => {
  return (
    <ul className="grid gap-[4.3rem] pb-10 md:grid-cols-2 lg:grid-cols-4">
      {drinks.map((wine) => {
        return (
          <li key={wine.node.id} className="group">
            <Link
              href={`/drycker/${wine.node.slug}`}
              className="flex"
              aria-label={`läs mer om ${wine.node.title}`}
            >
              <div className="relative h-37.5 min-w-25 lg:group-hover:animate-shake">
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
              <div className="flex w-full flex-col justify-center gap-2 p-4">
                <h2 className="text-[17px] lg:group-hover:underline">
                  {wine.node.title}
                </h2>

                <p className="flex text-[14px]">
                  {wine.node.acf_drinks?.dryckestyper?.name} -{" "}
                  {wine.node.acf_drinks?.forpackningar?.name}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default WineExplorerList;
