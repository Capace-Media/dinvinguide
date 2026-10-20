import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface DrinkLayoutProps {
  className?: string;
  title: string;
  headingLevel: "h1" | "h2";
  uri?: string | null;
  image?: { mediaItemUrl?: string | null; altText?: string | null } | null;
  importer?: { slug?: string | null; title?: string | null } | null;
  orderUrl?: string | null;
  /** Rendered above the title. */
  eyebrow?: ReactNode;
  /** Drink specific details rendered below the importer. */
  children?: ReactNode;
}

const DrinkLayout = ({
  className,
  title,
  headingLevel: Heading,
  uri,
  image,
  importer,
  orderUrl,
  eyebrow,
  children,
}: DrinkLayoutProps) => {
  return (
    <article
      className={`lg:grid-cols-2 grid gap-8 lg:gap-0 relative z-10 ${className ?? ""}`}
    >
      <div className="relative">
        {image?.mediaItemUrl && (
          <Link href={uri ?? ""} className="flex justify-center">
            <figure className="relative w-50 h-130.5">
              <Image
                src={image.mediaItemUrl}
                fill
                style={{ objectFit: "contain" }}
                alt={image.altText ? image.altText : `Bild på ${title}`}
                sizes="200px"
              />
            </figure>
          </Link>
        )}
      </div>

      <div className="flex justify-center items-center min-w-0">
        <div className="flex flex-col gap-16 min-w-0 max-w-full">
          <div className="flex flex-col gap-1">
            {eyebrow}
            <Heading className="normal-case text-[38px] leading-10">
              {title}
            </Heading>
            {importer && (
              <div className="flex items-center gap-2 py-2">
                <h2 className="uppercase text-base">Importör: </h2>
                <Link
                  href={`/importorer/${importer.slug}`}
                  className="underline text-brand-primary"
                >
                  <span className="sr-only">Läs mer om </span>
                  {importer.title}
                </Link>
              </div>
            )}
            {children}
          </div>

          {orderUrl?.includes("https://") ? (
            <a
              href={orderUrl}
              className="flex items-center gap-3 lg:hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                Beställ på {new URL(orderUrl).hostname.replace("www.", "")}
              </span>
              <ArrowRight className="size-3" strokeWidth={1.2} aria-hidden />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default DrinkLayout;
