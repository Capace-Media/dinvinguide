import type { Drinktip } from "@/lib/schemas/front-page";
import { mergeLatestWithHighlighted } from "@/lib/utils/merge-latest-with-highlighted";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DRINK_COUNT = 4;

interface ExclusiveDrinksProps {
  latest: readonly Drinktip[];
  highlighted: readonly Drinktip[];
}

const ExclusiveDrinks = ({ latest, highlighted }: ExclusiveDrinksProps) => {
  const drinks = mergeLatestWithHighlighted(latest, highlighted, DRINK_COUNT);

  return (
    <div className="layout contain bg-white">
      <div className="flex justify-between  pb-6">
        <div>
          <h2 className="heading">Exklusiva dryckestips</h2>
          <p className="text-sm max-w-[500px]">
            Dyk in i vårt exklusiva utbud av dryckestips och högkvalitativa
            viner. Varje vin är granskat av våra experter och betygsatt 0-100.
          </p>
        </div>
        <div className="md:block hidden">
          <Link
            href={`/dryckestips`}
            aria-label={`Utforska alla våra dryckestips`}
            className="flex items-center gap-3 py-4 lg:hover:underline text-brand-secondary"
          >
            <span>Utforska alla våra dryckestips</span>
            <MoveRight className="size-6" strokeWidth={1} aria-hidden />
          </Link>
        </div>
      </div>

      <div className="pb-6">
        <ul className="grid xl:grid-cols-4 md:grid-cols-2 gap-[4.3rem] pb-10 layout bg-white shadow-lg border-[#F0F0CC] border-b-18 ">
          {drinks.map((wine) => {
            const image = wine.featuredImage?.node;
            return (
              <li key={wine.id} className="group">
                <Link
                  href={`/dryckestips/${wine.slug}`}
                  className="flex"
                  aria-label={`läs mer om ${wine.title}`}
                >
                  <div className="min-w-[100px] h-[160px] relative lg:group-hover:animate-shake">
                    {image?.mediaItemUrl && (
                      <Image
                        src={image.mediaItemUrl}
                        alt={image.altText || `bild på ${wine.title}`}
                        width={image.mediaDetails?.width ?? 400}
                        height={image.mediaDetails?.height ?? 269}
                        sizes="(max-width: 768px) 26vw, (max-width: 1024px) 15vw, (max-width: 1790px) 10vw, 102px"
                        className="object-contain w-full h-full"
                      />
                    )}
                  </div>
                  <div className=" flex gap-2 flex-col justify-center w-full p-4 ">
                    <h2 className="text-[17px] lg:group-hover:underline">
                      {wine.title}
                    </h2>

                    {wine.acf_dryckestips?.betyget ? (
                      <p className="text-[12px]">
                        {wine.acf_dryckestips.betyget}/100
                      </p>
                    ) : null}

                    <p className="text-[14px] flex">
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
