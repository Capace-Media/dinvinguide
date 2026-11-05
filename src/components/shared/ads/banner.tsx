import type { Ad } from "@/lib/api/ads/ad-slots";
import { getImageProps } from "next/image";

export default function Banner({
  ad,
  priority = false,
}: {
  ad: Ad;
  priority?: boolean;
}) {
  const mobile = ad.mobile ?? ad.desktop;
  const alt = mobile.altText || ad.title;

  // <Image> can't art-direct between two creatives, but getImageProps hands
  // back exactly what it would have rendered — so the optimizer URL and any
  // configured loader stay Next's concern rather than something we hardcode.
  const { props: desktopImg } = getImageProps({
    alt,
    src: ad.desktop.mediaItemUrl,
    width: ad.desktop.mediaDetails?.width ?? 980,
    height: ad.desktop.mediaDetails?.height ?? 200,
    sizes: "980px",
    priority,
  });

  const { props: mobileImg } = getImageProps({
    alt,
    src: mobile.mediaItemUrl,
    width: mobile.mediaDetails?.width ?? 280,
    height: mobile.mediaDetails?.height ?? 256,
    sizes: "280px",
    priority,
  });

  return (
    // data-ad-slot is a stable hook for the smoke tests — counting <picture>
    // would break the moment anything else on the site uses one.
    <div className="layout contain bg-white" data-ad-slot>
      <div className="flex items-center justify-center">
        <div className="block h-64 w-70 lg:h-50 lg:w-245 lg:duration-300 lg:ease-in-out lg:hover:scale-[1.01] lg:hover:shadow-lg">
          <a
            href={ad.link}
            target="_blank"
            rel="noreferrer"
            className="relative block h-full w-full"
            aria-label={`Annons: ${ad.title}`}
          >
            <picture className="block h-full w-full">
              <source
                media="(min-width: 1024px)"
                srcSet={desktopImg.srcSet}
                sizes={desktopImg.sizes}
                width={desktopImg.width}
                height={desktopImg.height}
              />
              <img
                {...mobileImg}
                alt={alt}
                className="h-full w-full object-contain"
              />
            </picture>
          </a>
        </div>
      </div>
    </div>
  );
}

// `tone` is the only thing that differs between page types — DL pages use the
// DL brand colour for the pulse.
export function BannerSkeleton({
  tone = "bg-brand-primary",
}: {
  tone?: string;
}) {
  return (
    <div className="layout contain bg-white">
      <div className="flex items-center justify-center">
        <div
          className={`block h-64 w-70 lg:h-50 lg:w-245 ${tone} animate-pulse rounded-sm`}
        ></div>
      </div>
    </div>
  );
}
