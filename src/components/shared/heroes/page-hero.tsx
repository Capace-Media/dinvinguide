import handleParse from "@/lib/utils/handleParse";
import Image from "next/image";
import Link from "next/link";
import type { GuideLink } from "./guide-links";

export interface PageHeroContent {
  title?: string | null;
  excerpt?: string | null;
  page_content?: { intro?: string | null } | null;
  acf_grape?: { kortBeskrivning?: string | null } | null;
  featuredImage?: {
    node?: { mediaItemUrl?: string | null; altText?: string | null } | null;
  } | null;
}

interface PageHeroProps {
  page?: PageHeroContent | null;
  links?: readonly GuideLink[];
  guide?: string;
}

const PageHero = ({ page, links, guide }: PageHeroProps) => {
  return (
    <>
      <div className="layout w-full bg-white py-17">
        <div className="order-last grid gap-10 md:order-first md:grid-cols-2 lg:gap-45">
          <div className="flex flex-col justify-between gap-2 lg:min-h-115.25">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-6">
                <div className="text-[14px]">
                  <p>{guide}</p>

                  {page?.page_content?.intro ? (
                    handleParse(page?.page_content?.intro)
                  ) : page?.acf_grape?.kortBeskrivning ? (
                    <>
                      <h1>{page?.title}</h1>
                      <p>{page?.acf_grape?.kortBeskrivning}</p>
                    </>
                  ) : page?.excerpt ? (
                    <>
                      <h1>{page?.title}</h1>
                      <div>{handleParse(page?.excerpt)}</div>
                    </>
                  ) : (
                    <h1>{page?.title}</h1>
                  )}
                </div>
              </div>

              <ul className="flex flex-wrap gap-3 pt-4">
                {links &&
                  links.map((node) => {
                    return (
                      <li
                        className="border-b-2 border-brand-primary"
                        key={node?.id}
                      >
                        <Link
                          className="text-[14px] text-brand-primary uppercase"
                          href={`${node?.uri}`}
                        >
                          {node?.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className="relative order-first h-92.5 w-full md:order-last lg:h-130">
            <div className="center-y absolute left-0 z-10 h-75 w-[85%] lg:h-107.5">
              {page?.featuredImage?.node?.mediaItemUrl && (
                <div className="relative h-full w-full shadow-xl">
                  <Image
                    src={page?.featuredImage?.node?.mediaItemUrl}
                    alt={
                      page?.featuredImage?.node?.altText
                        ? page?.featuredImage?.node?.altText
                        : "Bild från DinVinguide"
                    }
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                    sizes="(min-width: 1880px) 687px, (min-width: 1040px) calc(38.17vw - 23px), (min-width: 780px) calc(42.5vw - 38px), (min-width: 380px) calc(85vw - 27px), calc(25vw + 189px)"
                    priority
                  />
                </div>
              )}
            </div>
            <div className="center-y absolute -right-4 h-full w-[85%] bg-brand-beige md:-right-11 md:w-full lg:-right-20"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHero;
