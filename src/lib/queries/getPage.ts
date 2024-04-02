import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";

import { SEO } from "./fragments/Seo";

export const getPage = async (id: string) => {
  try {
    const res = await WPnext(
      `query GET_PAGE($id: ID!) {
        page(id: $id, idType: URI) {
          title
          content
          page_content {
            intro
          }
          acf_explorer {
            slogan
          }
          author {
            node {
              username
              nicename
              slug
              name
              description
              acf_user {
                email
                facebook
                instagram
                kortBeskrivning
                bild {
                  altText
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
          ${SEO}
          featuredImage {
            node {
              altText
              title
              mediaItemUrl
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }`,
      { id }
    );

    if (!res) {
      throw new Error(`Could not fetch page: ${id}`);
    }

    const users = res?.data?.page;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
