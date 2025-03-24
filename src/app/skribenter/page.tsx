import AuthorsComponent from "@/components/Blocks/skribenter";
import { getAuthors } from "@/lib/queries/getAuthors";
import { getPage } from "@/lib/queries/getPage";
import Ads from "../components/ads";

import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import { MetaInfo } from "../../../types/MetaInfoTypes";
import Loading from "../loading";
import AuthorsHero from "./components/AuthorsHero";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | any | undefined | null;
  }>;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEO();
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

const getAuthorsData = async () => {
  const data = await getAuthors();
  const pageData = await getPage("skribenter");

  return { data, pageData };
};

async function getSEO() {
  const page = await getSEOByPage("/skribenter");
  return page;
}

const Authors = async () => {
  const { data, pageData } = await getAuthorsData();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <AuthorsHero promise={pageData} />
        <Ads pageType="default" position="TOP" />
        <AuthorsComponent data={data} />
      </Suspense>
    </>
  );
};

export default Authors;
