import Newsletter from "@/components/shared/newsletter/newsletter";
import handleParse from "@/lib/utils/handleParse";

import WP from "@/lib/wp";
import ExploreGuides from "../GuideTemplate/ExploreGuides";
import links from "../GuideTemplate/guideLinks.json";
import PageHero from "../HeroHeaders/PageHero";

async function getGrapeData(id: string) {
  try {
    const response = await WP(
      `
    query MyQuery($id: ID!) {
      grape(id: $id, idType: URI) {
        id
        acf_grape {
          kortBeskrivning
          text
          druvtyp {
            name
            slug
          }
        }
        title
        featuredImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
    `,
      "grape",
      { id }
    );

    if (!response) {
      throw new Error("No data found");
    }

    const data = response.data.grape;

    return data;
  } catch (error) {
    console.error("no data found: =====>", error);
    return null;
  }
}

const GrapeTemplate = async ({ params }: { params: { slug: string } }) => {
  const id: string = `/druvor/${params.slug}`;
  const data = await getGrapeData(id);

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
