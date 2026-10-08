import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import WineTipsTemplate from "@/components/Templates/WineTipsTemplate";
import { getPage } from "@/lib/queries/getPage";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../types/MetaInfoTypes";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/dryckestips");

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

const DrinkTips = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return (
    <>
      <WineTipsTemplate searchParams={searchParams} params={params} />
    </>
  );
};

export default DrinkTips;
