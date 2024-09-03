import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import RecipeCategoryTemplate from "@/components/Templates/RecipeCategoryTemplate";
import { getRecipeCategorySEO } from "@/lib/queries/SEO/getRecipeCategorySEO";

import WP from "@/lib/wp";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../../types/MetaInfoTypes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getRecipeCategorySEO(
    `/receptkategorier/ingrediens/${params.slug}`
  );

  const seo: any = page?.seo;

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
  const data = await WP(`
  query MyQuery2($id: ID! = "ingrediens") {
    recipeCategory(id: $id, idType: SLUG) {
      children(first: 10) {
        nodes {
          slug
        }
      }
    }
  }`);
  const paths: any[] = [];

  data?.data?.recipeCategory?.children?.nodes &&
    data.data.recipeCategory.children.nodes.map((recipe: any) => {
      paths.push({ slug: recipe.slug });
    });

  return paths;
}

const Maltider = ({ searchParams, params }: Props) => {
  return (
    <>
      <RecipeCategoryTemplate
        searchParams={searchParams}
        params={params}
        mainSlug="ingrediens"
      />
    </>
  );
};

export default Maltider;
