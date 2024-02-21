import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";

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
      <Ads pageType="default" position="TOP" />
      {posts?.acf_overviewPage?.sidor ? (
        <Posts posts={posts?.acf_overviewPage?.sidor} />
      ) : null}
      <Newsletter />
    </>
  );
};

export default SingleWineSchoolTemplate;
