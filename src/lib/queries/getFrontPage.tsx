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

    console.log("res", res);

    const data = res?.data;
    console.log("data", data);
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
