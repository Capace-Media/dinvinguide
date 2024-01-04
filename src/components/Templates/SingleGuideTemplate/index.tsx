import Newsletter from "@/app/components/Newsletter";
import Ads from "@/app/components/ads";
import { getPage } from "@/lib/queries/getPage";
import links from "../GuideTemplate/guideLinks.json";
import PageHero from "../HeroHeaders/PageHero";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | any | undefined };
};

async function getSingleGuidePage({ params }: { params: { slug: string } }) {
  const data = await getPage(`/${params.slug}`);
  return data;
}

const SingleGuideTemplate = async ({ params, searchParams }: Props) => {
  const data = await getSingleGuidePage({ params });
  return (
    <>
      <PageHero data={data} links={links} />
      <Ads pageType="default" position="TOP" />

      <Ads pageType="default" position="MID" />
      <Newsletter />
      <Ads pageType="default" position="BOTTOM" />
    </>
  );
};

export default SingleGuideTemplate;
