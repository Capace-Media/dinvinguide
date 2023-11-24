import AuthorPosts from "@/components/Blocks/skribenter/Posts";
import { dynamicSeo } from "@/components/SEO/dynamicSEO";

import { getAuthor } from "@/lib/queries/getAuthor";
import { getAuthors } from "@/lib/queries/getAuthors";

import ExplorePages from "@/app/components/ExplorePages";
import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import { isCustomPageSlug } from "@/lib/utils/exclude";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import AuthorHero from "../components/AuthorHero";
type PropsPaths = {
  slug: string;
};
export async function generateStaticParams() {
  const authors = await getAuthors();

  const authorsPaths: PropsPaths[] = [];

  authors?.skribenter &&
    authors.skribenter.map((author: any) => {
      if (author?.slug && !isCustomPageSlug(author?.slug)) {
        authorsPaths.push({ slug: author.slug });
      }
    });

  return authorsPaths;
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
};

async function getAuthorData(params: { slug: string }) {
  const data = await getAuthor(params.slug);

  const authorProps = {
    ...data,
    posts: data?.posts?.pageInfo?.offsetPagination?.total,
  };

  return authorProps;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const page = await getAuthorData(params);

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

const Author = async ({ params, searchParams }: Props) => {
  const data = await getAuthorData(params);

  const { posts } = data;

  return (
    <>
      <AuthorHero promise={data} />
      <Ads pageType="default" position="TOP" />
      <section className="layout bg-white">
        <div className="contain">
          <div className="flex gap-2 text-brand-gray">
            <Link href="/" className="text-brand-primary">
              Hem
            </Link>{" "}
            /{" "}
            <Link href="/skribenter" className="text-brand-primary">
              Skribenter
            </Link>{" "}
            / <p className=" text-brand-dark">{data?.name}</p>
          </div>
          <h2 className=" font-sub text-[28px] md:text-[35px] lg:text-[42px] ">
            {data?.firstName}s senaste artiklar
          </h2>
        </div>
        <AuthorPosts
          params={params}
          searchParams={searchParams}
          postsCount={posts}
        />
      </section>
      <Ads pageType="default" position="MID" />
      <ExplorePages />
      <Ads pageType="default" position="BOTTOM" />
      <Newsletter />
    </>
  );
};

export default Author;
