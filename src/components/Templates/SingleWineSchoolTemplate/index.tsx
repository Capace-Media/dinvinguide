import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import AuthorPost from "@/components/Blocks/skribenter/Posts/post";
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
        <div className="layout bg-white contain">
          <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {posts?.acf_overviewPage?.sidor &&
              posts.acf_overviewPage.sidor.map((post: any, index: number) => {
                return (
                  <li key={post?.id} className="relative">
                    <span className=" absolute z-[8] top-[4px] left-[4px] bg-brand-primary text-white text-[13px] px-2 rounded-[10px]">
                      {index + 1}
                    </span>
                    <AuthorPost post={post} />
                  </li>
                );
              })}
          </ul>
        </div>
      ) : null}
      <Newsletter />
    </>
  );
};

export default SingleWineSchoolTemplate;
