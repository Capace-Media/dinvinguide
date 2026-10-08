
import { dynamicSeo } from "@/components/SEO/dynamicSEO";

import { getAuthor } from "@/lib/api/authors/get-authors";

import ExplorePages from "@/components/shared/explore-pages";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import AdBottom from "@/shared/components/ads/default/bottom";
import { Suspense } from "react";

import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import AuthorHero from "../components/AuthorHero";
import AllArticles from "@/app/artiklar/_components/articles";

export async function generateStaticParams() {
  return [
    { slug: "fredrikschelin" },
    { slug: "anders" },
    { slug: "sofiaander" },
    { slug: "magnus" },
  ];
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | any | undefined }>;
};

async function getAuthorData(id: string, search?: string) {
  const data = await getAuthor(id, search);
  if (!data) return null;

  return { ...data, posts: data.posts?.pageInfo?.total };
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;

  const page = await getAuthorData(slug);

  const seo = page?.seo;

  const uri = `/skribenter/${page?.username}`;

  const img = {
    url: page?.acf_user?.bild?.mediaItemUrl
      ? page.acf_user.bild.mediaItemUrl
      : "",
    alt: page?.acf_user?.bild?.altText ? page.acf_user.bild.altText : "",
  };
  const author = page
    ? {
      title: page?.name,
      slug: `${process.env.NEXT_PUBLIC_SITE_URL}/skribenter/${page?.username}`,
    }
    : null;

  const previousMeta: MetaInfo = (await parent) as unknown as MetaInfo;

  const data = await dynamicSeo({ seo, previousMeta, author, uri, img });

  return data;
}

async function SingleAuthorPage(props: Props) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const data = await getAuthorData(params?.slug, search);

  if (!data) {
    return notFound();
  }

  return (
    <div key={params?.slug}>
      <AuthorHero promise={data} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <div className="flex gap-2 text-brand-gray layout bg-white">
        <Link href="/" className="text-brand-primary">
          Hem
        </Link>{" "}
        /{" "}
        <Link href="/skribenter" className="text-brand-primary">
          Skribenter
        </Link>{" "}
        / <p className="text-brand-dark">{data?.name}</p>
      </div>
      <div id="articles">
        <AllArticles authorName={params?.slug} title={`${data?.firstName + (data?.firstName?.endsWith("s") ? "" : "s")} artiklar`} />
      </div>
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <ExplorePages />
      <Suspense fallback={<BannerSkeleton />}>
        <AdBottom />
      </Suspense>
      <Newsletter />
    </div>
  );
}

export default SingleAuthorPage;
