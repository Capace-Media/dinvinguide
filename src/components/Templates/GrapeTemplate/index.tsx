import Newsletter from "@/components/shared/newsletter/newsletter";
import handleParse from "@/lib/utils/handleParse";

import { getGrape } from "@/lib/queries/get-grape";
import ExploreGuides from "../GuideTemplate/ExploreGuides";
import links from "../GuideTemplate/guideLinks.json";
import PageHero from "../HeroHeaders/PageHero";

const GrapeTemplate = async ({ params }: { params: { slug: string } }) => {
  const data = await getGrape(params.slug);

  return (
    <>
      <PageHero data={data} links={links} guide={"Druvguiden"} />
      <article className="layout bg-white lg:grid lg:grid-cols-2 py-10">
        <div>{handleParse(data?.acf_grape?.text)}</div>
        <div></div>
      </article>
      <ExploreGuides />
      <Newsletter />
    </>
  );
};

export default GrapeTemplate;
