import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

import { SEO } from "./fragments/Seo";

export const getFrontPage = async () => {
  try {
    const res = await WP(
      `query GET_FRONT_PAGE {
        page(id: "/", idType: URI) {
          content
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
        }
      }`,
      ""
    );

    const data = res?.data;

    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
