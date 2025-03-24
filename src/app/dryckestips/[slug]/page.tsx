import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import DrinkTipTemplate from "@/components/Templates/DrinkTipTemplate";
import { getDrinkTipsSEO } from "@/lib/queries/SEO/getDrinkTipsSEO";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../types/MetaInfoTypes";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
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

const DrinkTipsPage = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return (
    <>
      <DrinkTipTemplate searchParams={searchParams} params={params} />
    </>
  );
};

export default DrinkTipsPage;
