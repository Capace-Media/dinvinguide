import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";

interface ExtraPuffProps {
  content: any;
}

type PuffTypename = "Grape" | "Drink" | "Recipe" | "Drinktip";

const PUFF_CONFIG: Record<
  PuffTypename,
  { label: string; href: (slug: string) => string; layout: "hero" | "bottle" }
> = {
  Grape: { label: "druvor", href: (slug) => `/druvor/${slug}`, layout: "hero" },
  Recipe: {
    label: "recept",
    href: (slug) => `/recept/${slug}`,
    layout: "hero",
  },
  Drink: {
    label: "drycker",
    href: (slug) => `/drycker/${slug}`,
    layout: "bottle",
  },
  Drinktip: {
    label: "Exklusiva dryckestips",
    href: (slug) => `/dryckestips/${slug}`,
    layout: "bottle",
  },
};

const ExtraPuff = ({ content }: ExtraPuffProps) => {
  const data = content?.extraPuff?.[0];
  if (!data?.__typename) return null;

  const config = PUFF_CONFIG[data.__typename as PuffTypename];
  if (!config) return null;

  return config.layout === "hero" ? (
    <HeroPuff data={data} config={config} />
  ) : (
    <BottlePuff data={data} config={config} />
  );
};

export default ExtraPuff;

function getDescription(data: any): string | undefined {
  return data?.acf_recipe?.desc ?? data?.acf_grape?.kortBeskrivning;
}

function PuffHeading({
  label,
  title,
  href,
  className = "",
}: {
  label: string;
  title: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      className={`group flex flex-col ${className}`}
      href={href}
      aria-label={`Läs mer om ${title}`}
    >
      <span className="font-main text-[13px] uppercase group-hover:underline">
        {label}
      </span>
      <span className="font-sub text-[22px] group-hover:underline">
        {title}
      </span>
    </Link>
  );
}

function PuffDescription({ html }: { html?: string }) {
  if (!html) return null;
  return <div className="text-[12px] md:text-[12px]">{handleParse(html)}</div>;
}

function PuffButton({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      aria-label={`Läs mer om ${title}`}
      className="btn w-full lg:mt-4 lg:w-35.5"
    >
      Läs mer
    </Link>
  );
}

function FeaturedImage({
  data,
  className = "object-cover w-full h-full",
  fill = false,
  unoptimized = false,
}: {
  data: any;
  className?: string;
  fill?: boolean;
  unoptimized?: boolean;
}) {
  const image = data?.featuredImage?.node;
  if (!image?.mediaItemUrl) return null;

  const alt = image.altText ?? `bild på ${data?.title}`;

  if (fill) {
    return (
      <Image
        unoptimized={unoptimized}
        src={image.mediaItemUrl}
        alt={alt}
        fill
        style={{ objectFit: "contain" }}
        sizes="(min-width: 1200px) 300px, (min-width: 768px) 384px, 100vw"
        className={className}
      />
    );
  }

  return (
    <Image
      src={image.mediaItemUrl}
      alt={alt}
      width={image.mediaDetails?.width}
      height={image.mediaDetails?.height}
      className={className}
      sizes="(max-width: 1024px) 93vw, (max-width: 1790px) 29vw, 549px"
    />
  );
}

/** Grape & Recipe: text beside image on desktop, stacked image-with-overlay on mobile */
function HeroPuff({
  data,
  config,
}: {
  data: any;
  config: (typeof PUFF_CONFIG)[PuffTypename];
}) {
  const href = config.href(data.slug);
  const description = getDescription(data);

  return (
    <section className="relative flex w-full flex-col py-8 lg:h-82.5 lg:flex-row lg:gap-10">
      <div className="hidden lg:flex lg:w-[40%] lg:flex-col lg:justify-center">
        {data?.title && (
          <PuffHeading label={config.label} title={data.title} href={href} />
        )}
        <PuffDescription html={description} />
        <PuffButton href={href} title={data.title} />
      </div>

      <Link
        href={href}
        aria-label={`Läs mer om ${data?.title}`}
        className="group relative min-h-55 w-full lg:h-full lg:min-h-0 lg:w-[60%]"
      >
        <FeaturedImage data={data} />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 z-10 p-4 text-white lg:w-[70%]">
          <p className="font-main text-[12px] text-white uppercase group-hover:underline lg:hidden">
            {config.label}
          </p>
          {data?.title && (
            <h2 className="font-sub text-[16px] leading-6 text-white group-hover:underline md:text-[18px]">
              {data.title}
            </h2>
          )}
          {description && (
            <div className="parse-light mt-2 text-[12px] lg:hidden">
              {handleParse(description)}
            </div>
          )}
        </div>
      </Link>

      <div className="mt-6 flex flex-col lg:hidden">
        <PuffButton href={href} title={data.title} />
      </div>
    </section>
  );
}

/** Drink & Drinktip: bottle image + text, stacked on mobile */
function BottlePuff({
  data,
  config,
}: {
  data: any;
  config: (typeof PUFF_CONFIG)[PuffTypename];
}) {
  const href = config.href(data.slug);
  const description = getDescription(data);

  return (
    <section className="group flex flex-col gap-8 py-8 md:flex-row md:items-center">
      <div className="relative h-70 w-full shrink-0 md:h-87.5 md:w-auto md:min-w-50 lg:group-hover:animate-shake">
        <FeaturedImage data={data} fill unoptimized />
      </div>

      <div className="flex w-full flex-col justify-center md:w-1/2">
        {data?.title && (
          <PuffHeading label={config.label} title={data.title} href={href} />
        )}
        <PuffDescription html={description} />
        <PuffButton href={href} title={data.title} />
      </div>
    </section>
  );
}
