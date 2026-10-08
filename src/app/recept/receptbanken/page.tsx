import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import RecipesTemplate from "@/components/Templates/RecipesBankTemplate";
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
  const page = await getPage("/recept");

  const seo: any = page?.seo;

  const uri = `/recept/receptbanken`;

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

const RecipesBank = async (props: Props) => {
  const searchParams = await props.searchParams;
  return (
    <>
      <RecipesTemplate searchParams={searchParams} />
    </>
  );
};

export default RecipesBank;
