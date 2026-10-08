import { dynamicSeo } from "@/components/SEO/dynamicSEO";
import Line from "@/components/graphic/Line";
import { getQueryClient } from "@/lib/get-query-client";
import { getSEOByPage } from "@/lib/queries/getSEOByPage";
import { POSTS } from "@/lib/queries/posts";
import WP from "@/lib/wp";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";
import { MetaInfo } from "../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import AdMid from "@/shared/components/ads/default/mid";
import { Suspense } from "react";
import AllArticles from "./_components/articles";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | any | undefined | null;
  }>;
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getSEOByPage("/artiklar");

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

async function fetchPosts({ pageParam }: { pageParam: string }) {
  const res = await WP(POSTS, "post", { first: 16, after: pageParam || undefined });

  return res?.data;
}

const Articles = async (props: Props) => {
  // const searchParams = await props.searchParams;
  const queryClient = getQueryClient();

  // Prefetch the initial page of articles on the server
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["articles", "", "", ""],
    queryFn: fetchPosts,
    initialPageParam: "",
    getNextPageParam: (lastPage: any) =>
      lastPage?.posts?.pageInfo?.hasNextPage
        ? lastPage.posts.pageInfo.endCursor
        : undefined,
  });

  return (
    <>
      <div className="layout bg-white pt-20">
        <Line />
      </div>
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllArticles title="Utforska alla våra artiklar" />
      </HydrationBoundary>
      {/* <ArticleTemplate searchParams={searchParams} /> */}
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
    </>
  );
};

export default Articles;
