import Image from "next/image";
import Link from "next/link";
import { isPresent } from "@/lib/utils/is-present";
import type { AcfRecipe } from "./types";

interface SuitableWinesProps {
  drinks: AcfRecipe["passandeDrycker"] | undefined;
}

const SuitableWines = ({ drinks }: SuitableWinesProps) => {
  if (!drinks) {
    return null;
  }
  return (
    <section>
      <h2 className="pb-6 text-[28px]">Passande drycker</h2>

      <ul className="flex flex-wrap gap-6 py-8">
        {drinks.filter(isPresent).map((wine) => {
            return (
              <li key={wine.id} className="group max-w-77.75">
                <Link
                  href={`/drycker/${wine?.slug}`}
                  className="flex"
                  aria-label={`läs mer om ${wine?.title}`}
                >
                  {wine.featuredImage?.node.mediaItemUrl && (
                    <div className="min-w-25 h-37.5 relative lg:group-hover:animate-shake">
                      <Image
                        src={wine.featuredImage.node.mediaItemUrl}
                        alt={
                          wine.featuredImage.node.altText
                            ? wine.featuredImage.node.altText
                            : `bild på ${wine.title}`
                        }
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                        sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
                      />
                    </div>
                  )}
                  <div className=" flex gap-2 flex-col justify-center w-full p-4 ">
                    <h2 className="text-[17px] lg:group-hover:underline">
                      {wine?.title}
                    </h2>

                    <p className="text-[14px] flex">
                      {wine?.acf_drinks?.dryckestyper?.name} -{" "}
                      {wine?.acf_drinks?.forpackningar?.name}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default SuitableWines;
