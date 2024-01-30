import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import WordsTemplate from "@/components/Templates/WordsTemplate";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";
import { ParamsProps } from "../../../types/Global";
import { MetaInfo } from "../../../types/MetaInfoTypes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { id: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEOByPage("/ordlistan");

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

const Words = ({ searchParams, params }: ParamsProps) => {
  return (
    <>
      <WordsTemplate searchParams={searchParams} />
    </>
  );
};

export default Words;
