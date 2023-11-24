import AuthorPosts from "@/components/Blocks/skribenter/Posts";
import { dynamicSeo } from "@/components/SEO/dynamicSEO";

import { getAuthor } from "@/lib/queries/getAuthor";

import ExplorePages from "@/app/components/ExplorePages";
import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MetaInfo } from "../../../../types/MetaInfoTypes";
import AuthorHero from "../components/AuthorHero";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
};

async function getAuthorData(params: string, search?: string) {
  const data = await getAuthor(params, search);

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

  const page = await getAuthorData("fredrikschelin");

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

const Author = async ({ searchParams }: Props) => {
  const params: { slug: string } = {
    slug: "fredrikschelin",
  };
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const data = await getAuthorData("fredrikschelin", search);

  const { posts } = data;

  return (
    <>
      <AuthorHero promise={data} search={search} />
      <Ads pageType="default" position="TOP" />
      <section className="layout bg-white text-brand-dark">
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
          search={search}
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
