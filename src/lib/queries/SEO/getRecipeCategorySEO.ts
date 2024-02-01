import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import WP from "@/lib/wp";
import { SEO } from "../fragments/Seo";

export const getRecipeCategorySEO = async (id: string) => {
  try {
    const res = await WP(
      `query getRecipeCategorySEO($id: ID!) {
        recipeCategory(id: $id, idType: URI) {
          slug
          seo {
            breadcrumbs {
              text
              url
            }
            canonical
            cornerstone
            focuskw
            metaDesc
            metaKeywords
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphAuthor
            opengraphDescription
            opengraphImage {
              altText
              mediaItemUrl
            }
            opengraphModifiedTime
            opengraphPublishedTime
            opengraphPublisher
            opengraphSiteName
            opengraphTitle
            opengraphType
            opengraphUrl
            title
            twitterDescription
            twitterImage {
              altText
              mediaItemUrl
            }
            twitterTitle
          }
        }
      }`,
      { id }
    );

    const data = res.data.recipeCategory;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
