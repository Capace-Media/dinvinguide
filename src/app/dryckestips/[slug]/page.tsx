import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import DrinkTipTemplate from "@/components/Templates/DrinkTipTemplate";
import { getDrinkTipsSEO } from "@/lib/queries/SEO/getDrinkTipsSEO";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../types/MetaInfoTypes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getDrinkTipsSEO(`/dryckestips/${params.slug}`);

  const seo: any = page?.seo;

  const uri = `/dryckestips/${page?.slug}`;

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

const DrinkTipsPage = ({ searchParams, params }: Props) => {
  return (
    <>
      <DrinkTipTemplate searchParams={searchParams} params={params} />
    </>
  );
};

export default DrinkTipsPage;
