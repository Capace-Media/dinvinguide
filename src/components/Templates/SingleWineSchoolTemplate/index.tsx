import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import { Suspense } from "react";

import Posts from "@/components/Pagination/Posts";
import { getPage } from "@/lib/api/pages/get-pages";
import { getSchoolPosts } from "@/lib/api/posts/get-posts";
import { notFound } from "next/navigation";
import links from "../GuideTemplate/guideLinks.json";
import PageHero from "../HeroHeaders/PageHero";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined | null };
};

const SingleWineSchoolTemplate = async ({ params, searchParams }: Props) => {
  const { slug } = params;

  const data = await getPage(`/skolor/${slug}`);

  const posts = await getSchoolPosts(`/skolor/${slug}`);

  if (!posts) {
    return notFound();
  }

  return (
    <>
      <PageHero data={data} links={links} guide={"Vinskolan"} />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      {posts.length > 0 ? <Posts posts={posts} /> : null}
      <Newsletter />
    </>
  );
};

export default SingleWineSchoolTemplate;
