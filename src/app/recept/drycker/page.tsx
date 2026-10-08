import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import RecipeCategoryTemplate from "@/components/Templates/RecipeCategoryTemplate";
import { getPage } from "@/lib/queries/getPage";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../types/MetaInfoTypes";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage("/recept/drycker");

  const seo: any = page?.seo;

  const uri = `/recept/${page?.slug}`;

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

const Drycker = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = { slug: "drycker" };
  return (
    <>
      <RecipeCategoryTemplate searchParams={searchParams} params={params} />
    </>
  );
};

export default Drycker;
