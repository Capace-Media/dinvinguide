import type { FrontPageDrinktip } from "@/lib/api/pages/get-pages";
import { mergeLatestWithHighlighted } from "@/lib/utils/merge-latest-with-highlighted";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DRINK_COUNT = 4;

interface ExclusiveDrinksProps {
  latest: readonly FrontPageDrinktip[];
  highlighted: readonly FrontPageDrinktip[];
}

const ExclusiveDrinks = ({ latest, highlighted }: ExclusiveDrinksProps) => {
  const drinks = mergeLatestWithHighlighted(latest, highlighted, DRINK_COUNT);

  return (
    <div className="layout contain bg-white">
      <div className="flex justify-between pb-6">
        <div>
          <h2 className="heading">Exklusiva dryckestips</h2>
          <p className="max-w-[500px] text-sm">
            Dyk in i vårt exklusiva utbud av dryckestips och högkvalitativa
            viner. Varje vin är granskat av våra experter och betygsatt 0-100.
          </p>
        </div>
        <div className="hidden md:block">
          <Link
            href={`/dryckestips`}
            aria-label={`Utforska alla våra dryckestips`}
            className="flex items-center gap-3 py-4 text-brand-secondary lg:hover:underline"
          >
            <span>Utforska alla våra dryckestips</span>
            <MoveRight className="size-6" strokeWidth={1} aria-hidden />
          </Link>
        </div>
      </div>

      <div className="pb-6">
        <ul className="layout grid gap-[4.3rem] border-b-18 border-[#F0F0CC] bg-white pb-10 shadow-lg md:grid-cols-2 xl:grid-cols-4">
          {drinks.map((wine) => {
            const image = wine.featuredImage?.node;
            return (
              <li key={wine.id} className="group">
                <Link
                  href={`/dryckestips/${wine.slug}`}
                  className="flex"
                  aria-label={`läs mer om ${wine.title}`}
                >
                  <div className="relative h-[160px] min-w-[100px] lg:group-hover:animate-shake">
                    {image?.mediaItemUrl && (
                      <Image
                        src={image.mediaItemUrl}
                        alt={image.altText || `bild på ${wine.title}`}
                        width={image.mediaDetails?.width ?? 400}
                        height={image.mediaDetails?.height ?? 269}
                        sizes="(max-width: 768px) 26vw, (max-width: 1024px) 15vw, (max-width: 1790px) 10vw, 102px"
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex w-full flex-col justify-center gap-2 p-4">
                    <h2 className="text-[17px] lg:group-hover:underline">
                      {wine.title}
                    </h2>

                    {wine.acf_dryckestips?.betyget ? (
                      <p className="text-[12px]">
                        {wine.acf_dryckestips.betyget}/100
                      </p>
                    ) : null}

                    <p className="flex text-[14px]">
                      {wine.acf_dryckestips?.dryckestyper} -{" "}
                      {wine.acf_dryckestips?.forpackningar}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="md:hidden">
        <Link
          href={`/dryckestips`}
          aria-label={`Utforska alla våra dryckestips`}
          className="btn"
        >
          <span>Upptäck alla exklusiva drycker</span>
        </Link>
      </div>
    </div>
  );
};

export default ExclusiveDrinks;
