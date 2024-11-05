import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getTopLists = async () => {
  try {
    const res = await WP(
      `query getTopLists($id: ID! = "/topplistor") {
        page(id: $id, idType: URI) {
          acf_topplistor {
            aktivaTopplistor {
              ... on Toplist {
                id
                title
                slug
                acf_toplists {
                  slogan
                  toplistImg {
                    desktop {
                      title
                      mediaItemUrl
                      mediaDetails {
                        width
                        height
                      }
                      altText
                    }
                    mobile {
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
                forpackningar {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }`,
      "page"
    );

    const users = res.data.page?.acf_topplistor?.aktivaTopplistor;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
