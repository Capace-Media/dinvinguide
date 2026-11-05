import { dynamicSeo } from "@/lib/utils/seo/dynamic-seo";
import Line from "@/components/shared/line";
import { getQueryClient } from "@/lib/get-query-client";
import { getPage } from "@/lib/api/pages/get-pages";
import { getPosts } from "@/lib/api/posts/get-posts";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata, ResolvingMetadata } from "next";
import type { MetaInfo } from "../../../types/MetaInfoTypes";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/components/shared/ads/banner";
import AdTop from "@/components/shared/ads/default/top";
import AdMid from "@/components/shared/ads/default/mid";
import { Suspense } from "react";
import AllArticles from "@/components/shared/post/articles";

type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | any | undefined | null;
  }>;
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  _props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const page = await getPage("/artiklar");

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
  const posts = await getPosts({ first: 16, after: pageParam || undefined });

  return { posts };
}

const Articles = async () => {
  const queryClient = getQueryClient();

  // Prefetch the initial page of articles on the server
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["articles", "", "", ""],
    queryFn: fetchPosts,
    initialPageParam: "",
    getNextPageParam: (lastPage: Awaited<ReturnType<typeof fetchPosts>>) =>
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
      <Suspense fallback={<BannerSkeleton />}>
        <AdMid />
      </Suspense>
      <Newsletter />
    </>
  );
};

export default Articles;
