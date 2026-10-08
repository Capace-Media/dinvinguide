import Loading from "@/app/loading";
import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import GrapeTemplate from "@/components/Templates/GrapeTemplate";
import { getGrape, getGrapeSlugs } from "@/lib/api/grapes/get-grapes";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import { MetaInfo } from "../../../../types/MetaInfoTypes";

export async function generateStaticParams() {
  const slugs = await getGrapeSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined | null }>;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const page = await getGrape(params.slug);

  const seo: any = page?.seo;

  const uri = `/druvor/${page?.slug}`;

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

const Grapes = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  return (
    <Suspense fallback={<Loading />}>
      <GrapeTemplate params={params} />
    </Suspense>
  );
};

export default Grapes;
