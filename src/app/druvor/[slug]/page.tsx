import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { getGrape, getGrapeSlugs } from "@/lib/api/grapes/get-grapes";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import ExploreGuides from "@/components/shared/explore-guides";
import PageHero from "@/components/shared/heroes/page-hero";
import { guideLinks } from "@/components/shared/heroes/guide-links";
import handleParse from "@/lib/utils/handleParse";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getGrapeSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
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

const Grapes = async (props: Props) => {
  const params = await props.params;
  const grape = await getGrape(params.slug);

  if (!grape) {
    notFound();
  }

  return (
    <>
      <PageHero page={grape} links={guideLinks} guide="Druvguiden" />
      <article className="layout bg-white lg:grid lg:grid-cols-2 py-10">
        <div>{handleParse(grape.acf_grape?.text ?? "")}</div>
        <div></div>
      </article>
      <ExploreGuides />
      <Newsletter />
    </>
  );
};

export default Grapes;
