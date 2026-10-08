import { cache } from "react";
import WP from "../wp";
import { SEO } from "./fragments/Seo";

// Shared by the glossary word page and its generateMetadata, so one request
// per render.
export const getWord = cache(async (slug: string) => {
  const id = `/glossary/${slug}`;
  try {
    const res = await WP(
      `query getWord($id: ID!) {
        glossary(id: $id, idType: URI) {
        id
        content
        title
        modifiedGmt
        slug
        ${SEO}
        featuredImage {
          node {
            altText
            mediaItemUrl
            mediaDetails {
              width
              height
            }
          }
        }
        GQL_Word_Content {
          relateradTermer {
            ... on Glossary {
              id
              slug
              title
            }
          }
          hurAndvandsOrdet {
            alternativ1
            alternativ2
            alternativ3
          }
        }
      }
    }`,
      null,
      { id }
    );

    const data = res?.data?.glossary;
    if (!data) {
      throw new Error(`Could not fetch word data for ${id}`);
    }
    return data;
  } catch (error) {
    console.error("error =====>", error);
    return null;
  }
});
