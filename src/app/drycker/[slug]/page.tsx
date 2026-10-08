import Loading from "@/app/loading";
import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import DrinkTemplate from "@/components/Templates/DrinkTemplate";
import { getDrink } from "@/lib/queries/getDrink";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import { MetaInfo } from "../../../../types/MetaInfoTypes";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const page = await getDrink(`/drycker/${params.slug}`);

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

const Drink = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <DrinkTemplate params={params} />
      </Suspense>
    </>
  );
};

export default Drink;
