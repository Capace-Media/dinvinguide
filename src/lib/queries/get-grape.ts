import { cache } from "react";
import WP from "../wp";
import { SEO } from "./fragments/Seo";

// Shared by the grape page and its generateMetadata, so one request per render.
export const getGrape = cache(async (slug: string) => {
  const id = `/druvor/${slug}`;
  try {
    const response = await WP(
      `
    query getGrape($id: ID!) {
      grape(id: $id, idType: URI) {
        id
        slug
        ${SEO}
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

    return response.data.grape;
  } catch (error) {
    console.error("no data found: =====>", error);
    return null;
  }
});
