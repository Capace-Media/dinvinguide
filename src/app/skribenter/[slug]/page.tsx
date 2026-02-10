
import { dynamicSeo } from "@/components/SEO/dynamicSEO";

import { getAuthor } from "@/lib/queries/getAuthor";

import ExplorePages from "@/app/_components/ExplorePages";
import Newsletter from "@/app/_components/Newsletter";
import Ads from "@/app/_components/ads";

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

  const authorProps = {
    ...data,
    posts: data?.posts?.pageInfo?.total,
  };

  return authorProps;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { slug } = params;

  const page = await getAuthorData(slug);

  const seo: any = page?.seo;

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

  const { posts } = data;

  if (!data) {
    return notFound();
  }

  return (
    <div key={params?.slug}>
      <AuthorHero promise={data} word={search} />
      <Ads pageType="default" position="TOP" />
      <div className="flex gap-2 text-brand-gray layout bg-white">
        <Link href="/" className="text-brand-primary">
          Hem
        </Link>{" "}
        /{" "}
        <Link href="/skribenter" className="text-brand-primary">
          Skribenter
        </Link>{" "}
        / <p className=" text-brand-dark">{data?.name}</p>
      </div>
      <AllArticles authorName={params?.slug} title={`${data?.firstName + (data?.firstName?.endsWith("s") ? "" : "s")} artiklar`} />
      <Ads pageType="default" position="MID" />
      <ExplorePages />
      <Ads pageType="default" position="BOTTOM" />
      <Newsletter />
    </div>
  );
}

export default SingleAuthorPage;
