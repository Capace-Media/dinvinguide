import Loading from "@/app/loading";
import DruvguidenTemplate from "@/components/Templates/DruvguidenTemplate";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";

import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { Suspense } from "react";
import { MetaInfo } from "../../../types/MetaInfoTypes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEOByPage("/druvguiden");

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

const Druvguiden = ({ searchParams }: Props) => {
  const params = { slug: "druvguiden" };
  return (
    <Suspense fallback={<Loading />}>
      <DruvguidenTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default Druvguiden;
