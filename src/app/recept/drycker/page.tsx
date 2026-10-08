import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import RecipeCategoryTemplate from "@/components/features/recept/category/recipe-category-template";
import { getPage } from "@/lib/api/pages/get-pages";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

type Props = {
  searchParams: Promise<RouteSearchParams>;
};

export async function generateMetadata(
  _props: Props,
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
  return <RecipeCategoryTemplate searchParams={searchParams} params={params} />;
};

export default Drycker;
