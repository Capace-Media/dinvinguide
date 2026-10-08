import { dynamicSeo } from "@/components/SEO/dynamicSEO";

import { getPage } from "@/lib/api/pages/get-pages";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../types/MetaInfoTypes";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import DlTop from "@/shared/components/ads/dl/top";
import DlMid from "@/shared/components/ads/dl/mid";
import DlBottom from "@/shared/components/ads/dl/bottom";
import { Suspense } from "react";
import DLHero from "@/components/shared/heroes/dl-hero";
import TopListLinks from "@/components/shared/top-list-links";
import WineExplorer from "@/components/features/dryckesutforskaren/wine-explorer";
import handleParse from "@/lib/utils/handleParse";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";
async function getSEO() {
  const data = await getPage("/dryckesutforskaren");
  return data;
}

type Props = {
  searchParams: Promise<RouteSearchParams>;
};

export async function generateMetadata(
  _props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEO();

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

const Drinks = async (props: Props) => {
  const searchParams = await props.searchParams;
  const page = await getSEO();

  return (
    <>
      <DLHero hero={page} id="dryckesutforskaren" />
      <section className="layout py-5 md:py-12">
        {handleParse(page?.page_content?.intro ?? "")}
      </section>
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlTop />
      </Suspense>
      <WineExplorer searchParams={searchParams} />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlMid />
      </Suspense>
      <TopListLinks />
      <Suspense fallback={<BannerSkeleton tone="bg-brand-dl" />}>
        <DlBottom />
      </Suspense>
    </>
  );
};

export default Drinks;
