import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import PageHero from "@/components/shared/heroes/page-hero";
import { getPage } from "@/lib/api/pages/get-pages";
import { Metadata, ResolvingMetadata } from "next";

import { MetaInfo } from "../../../types/MetaInfoTypes";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { getSuppliers } from "../actions/suppliers";
import SuppliersList from "./_components/SuppliersList";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | any | undefined | null;
  }>;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/importorer");

  if (!page) {
    return {};
  }

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

export default async function ProducenterPage() {
  const data = await getPage("/importorer");

  const queryClient = new QueryClient();
  // Must be awaited: dehydrate() runs immediately, so without this the client
  // receives an empty cache and refetches the supplier list on every load.
  await queryClient.prefetchQuery({
    queryKey: ["suppliers"],
    queryFn: () => getSuppliers({}),
  });
  return (
    <>
      <PageHero page={data} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* SuppliersList calls useSearchParams(). Without a Suspense boundary
            around it, Next bails the whole route out of static prerendering,
            which baked every Suspense fallback on this page — including the
            three ad slots — into the static HTML. */}
        <Suspense fallback={null}>
          <SuppliersList />
        </Suspense>
      </HydrationBoundary>
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>
    </>
  );
}
