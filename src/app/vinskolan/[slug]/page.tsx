import { Suspense } from "react";
import Newsletter from "@/components/shared/newsletter/newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import Posts from "@/components/Pagination/Posts";
import PageHero from "@/components/shared/heroes/page-hero";
import { guideLinks } from "@/components/shared/heroes/guide-links";
import { getPage } from "@/lib/api/pages/get-pages";
import { getSchoolPosts } from "@/lib/api/posts/get-posts";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const WineSchool = async (props: Props) => {
  const { slug } = await props.params;
  const [page, posts] = await Promise.all([
    getPage(`/skolor/${slug}`),
    getSchoolPosts(`/skolor/${slug}`),
  ]);

  if (!posts) {
    notFound();
  }

  return (
    <>
      <PageHero page={page} links={guideLinks} guide="Vinskolan" />
      <Suspense fallback={<BannerSkeleton />}>
        <AdTop />
      </Suspense>
      {posts.length > 0 ? <Posts posts={posts} /> : null}
      <Newsletter />
    </>
  );
};

export default WineSchool;
