import type { Ad } from "@/lib/fetchers/ad-shape";
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
    <div className="bg-white layout contain">
      <div className="flex justify-center items-center">
        <div className="lg:hover:scale-[1.01] lg:hover:shadow-lg lg:duration-300 lg:ease-in-out block w-70 h-64 lg:w-245 lg:h-50">
          <a
            href={ad.link}
            target="_blank"
            rel="noreferrer"
            className="block relative w-full h-full"
            aria-label={`Annons: ${ad.title}`}
          >
            <picture className="block w-full h-full">
              <source
                media="(min-width: 1024px)"
                srcSet={desktopImg.srcSet}
                sizes={desktopImg.sizes}
                width={desktopImg.width}
                height={desktopImg.height}
              />
              <img {...mobileImg} className="w-full h-full object-contain" />
            </picture>
          </a>
        </div>
      </div>
    </div>
  );
}

// `tone` is the only thing that differs between page types — DL pages use the
// DL brand colour for the pulse.
export function BannerSkeleton({ tone = "bg-brand-primary" }: { tone?: string }) {
  return (
    <div className="bg-white layout contain">
      <div className="flex justify-center items-center">
        <div
          className={`block w-70 h-64 lg:w-245 lg:h-50 ${tone} animate-pulse rounded-sm`}
        ></div>
      </div>
    </div>
  );
}
