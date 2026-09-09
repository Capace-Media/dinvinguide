import Newsletter from "@/app/_components/Newsletter";
import { BannerSkeleton } from "@/shared/components/ads/banner";
import AdTop from "@/shared/components/ads/default/top";
import { Suspense } from "react";

import Posts from "@/components/Pagination/Posts";
import { getPage } from "@/lib/queries/getPage";
import { getSchoolPosts } from "@/lib/queries/getSchoolPosts";
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
      {posts?.acf_overviewPage?.sidor ? (
        <Posts posts={posts?.acf_overviewPage?.sidor} />
      ) : null}
      <Newsletter />
    </>
  );
};

export default SingleWineSchoolTemplate;
