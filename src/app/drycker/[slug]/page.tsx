import Loading from "@/app/loading";
import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import DrinkTemplate from "@/components/Templates/DrinkTemplate";
import { getDrinkSEO } from "@/lib/queries/SEO/getDrinksSEO";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import { MetaInfo } from "../../../../types/MetaInfoTypes";

type Props = {
  searchParams: { [key: string]: string | string[] | any | undefined | null };
  params: { slug: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getDrinkSEO(`/drycker/${params.slug}`);

  const seo: any = page?.seo;

  const uri = `/drycker/${page?.slug}`;

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

const Drink = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DrinkTemplate params={params} />
      </Suspense>
    </>
  );
};

export default Drink;
