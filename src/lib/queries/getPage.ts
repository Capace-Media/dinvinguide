import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";
import { SEO } from "./fragments/Seo";

export const getPage = async (id: string) => {
  try {
    const res = await WP(
      `query GET_PAGE($id: ID!) {
        page(id: $id, idType: URI) {
          title
          content
          page_content {
            intro
          }
          ${SEO}
          featuredImage {
            node {
              altText
              title
              mediaItemUrl
            }
          }
        }
      }`,
      { id }
    );

    const users = res.data.page;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
