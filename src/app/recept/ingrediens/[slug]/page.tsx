import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import RecipeCategoryTemplate from "@/components/features/recept/category/recipe-category-template";
import {
  getRecipeCategory,
  getRecipeCategoryChildSlugs,
} from "@/lib/api/recipes/get-recipes";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../../types/MetaInfoTypes";
import type { RouteSearchParams } from "@/lib/utils/pagination-search-params";

type Props = {
  searchParams: Promise<RouteSearchParams>;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const page = await getRecipeCategory(
    `/receptkategorier/ingrediens/${params.slug}`
  );

  const seo = page?.seo;

  const uri = `/recept/ingrediens/${page?.slug}`;

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

export async function generateStaticParams() {
  const slugs = await getRecipeCategoryChildSlugs("ingrediens", 10);
  return slugs.map((slug) => ({ slug }));
}

const Maltider = async (props: Props) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  return (
    <RecipeCategoryTemplate
      searchParams={searchParams}
      params={params}
      mainSlug="ingrediens"
    />
  );
};

export default Maltider;
