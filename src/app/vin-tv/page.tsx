import Loading from "@/app/loading";
import VinTVTemplate from "@/components/Templates/VinTVTemplate";
import { getPage } from "@/lib/api/pages/get-pages";
import { Metadata, ResolvingMetadata } from "next";

import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { Suspense } from "react";
import { MetaInfo } from "../../../types/MetaInfoTypes";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/vin-tv");

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
const VinTV = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = { slug: "vin-tv" };
  return (
    <Suspense fallback={<Loading />}>
      <VinTVTemplate params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default VinTV;
