import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import PageHero from "@/components/Templates/HeroHeaders/PageHero";
import { getPage } from "@/lib/queries/getPage";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";

import { MetaInfo } from "../../../types/MetaInfoTypes";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Ads from "../_components/ads";
import Newsletter from "../_components/Newsletter";
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
  const page = await getSEOByPage("/importorer");

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
  queryClient.prefetchQuery({
    queryKey: ["suppliers"],
    queryFn: () => getSuppliers({}),
  });
  return (
    <>
      <PageHero data={data} />
      <Ads pageType="default" position="TOP" />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SuppliersList />
      </HydrationBoundary>
      <Ads pageType="default" position="MID" />
      <Newsletter />
      <Ads pageType="default" position="BOTTOM" />
    </>
  );
}
