import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";

export const getSchoolPosts = async (id: string) => {
  try {
    const res = await WPnext(
      `query getWineSchools($id: ID!) {
        page(id: $id, idType: URI) {
          acf_overviewPage {
            sidor {
              ... on Post {
                __typename
                id
                title
                uri
                slug
                modifiedGmt
                acf_posts {
                  ingress
                }
                author {
                  node {
                    name
                  }
                }
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
              ... on Page {
                __typename
                id
                title
                uri
                slug
                modifiedGmt
                acf_posts {
                  ingress
                }
                author {
                  node {
                    name
                  }
                }
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
