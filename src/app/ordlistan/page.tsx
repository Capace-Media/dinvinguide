import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { getPage } from "@/lib/api/pages/get-pages";
import { Metadata, ResolvingMetadata } from "next";

import { MetaInfo } from "../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import PageHero from "@/components/shared/heroes/page-hero";
import LetterFilter from "@/components/features/ordlistan/letter-filter";
import WordsByLetter from "@/components/features/ordlistan/words-by-letter";
import alphabet from "@/json/alphabet.json";
import guides from "@/json/guides.json";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

type Props = {
  searchParams: Promise<RouteSearchParams>;
};

export async function generateMetadata(
  _props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/ordlistan");

  const seo: any = page?.seo;

  const uri = `/${page?.slug}`;

  const img = {
    url: seo?.opengraphImage?.mediaItemUrl
      ? seo.opengraphImage.mediaItemUrl
      : "",
    alt: seo?.opengraphImage?.altText ? seo.opengraphImage.altText : "",
  };

  const previousMeta: MetaInfo = (await parent) as unknown as MetaInfo;

  const data = await dynamicSeo({ seo, previousMeta, uri, img });

  return data;
}

const Words = async (props: Props) => {
  const searchParams = await props.searchParams;
  const page = await getPage("/ordlistan");
  const activeFilter =
    typeof searchParams.filter === "string" ? searchParams.filter : undefined;

  return (
    <>
      <PageHero page={page} links={guides} guide="Våra guider" />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <div className="layout bg-white">
        <nav className="w-full">
          <ul className="flex flex-wrap w-full justify-center gap-[1.6rem]">
            {alphabet.map((letter) => (
              <li key={letter.id}>
                <LetterFilter letter={letter} activeFilter={activeFilter} />
              </li>
            ))}
          </ul>
        </nav>
        <section className="py-10">
          <WordsByLetter searchParams={searchParams} />
        </section>
      </div>
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>
    </>
  );
};

export default Words;
