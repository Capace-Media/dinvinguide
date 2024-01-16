import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import AuthorPost from "@/components/Blocks/skribenter/Posts/post";
import { getPage } from "@/lib/queries/getPage";
import { getSchoolPosts } from "@/lib/queries/getSchoolPosts";
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

  return (
    <>
      <PageHero data={data} links={links} guide={"Vinskola"} />
      <Ads pageType="default" position="TOP" />
      {posts?.acf_overviewPage?.sidor ? (
        <div className="layout bg-white contain">
          <ul className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {posts?.acf_overviewPage?.sidor &&
              posts.acf_overviewPage.sidor.map((post: any) => {
                return (
                  <li key={post?.id}>
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
