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
      className={`relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-0 ${className ?? ""}`}
    >
      <div className="relative">
        {image?.mediaItemUrl && (
          <Link href={uri ?? ""} className="flex justify-center">
            <figure className="relative h-130.5 w-50">
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

      <div className="flex min-w-0 items-center justify-center">
        <div className="flex max-w-full min-w-0 flex-col gap-16">
          <div className="flex flex-col gap-1">
            {eyebrow}
            <Heading className="text-[38px] leading-10 normal-case">
              {title}
            </Heading>
            {importer && (
              <div className="flex items-center gap-2 py-2">
                <h2 className="text-base uppercase">Importör: </h2>
                <Link
                  href={`/importorer/${importer.slug}`}
                  className="text-brand-primary underline"
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
