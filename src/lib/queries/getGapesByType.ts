import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getGapesByType = async (
  id?: string | null,
  after?: string,
  before?: string,
  first?: number | null,
  last?: number | null,
  search?: string | null
) => {
  try {
    if (id) {
      const res = await WP(
        `
        query getGapesByType($id: ID!, $last: Int, $first: Int, $before: String, $after: String, $search: String) {
          grapeType(id: $id, idType: SLUG) {
            name
            grapes(after: $after, first: $first, last: $last, before: $before, where: {search: $search}) {
              edges {
                node {
                  id
                  title
                  slug
                  acf_grape {
                    druvtyp {
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
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
        
                  total
                
              }
            }
          }
        }
        `,
        null,
        { after, before, first, last, id, search }
      );

      const data = res.data.grapeType.grapes;
      return data;
    } else {
      const res = await WP(
        `
        query getGapes($last: Int, $first: Int, $before: String, $after: String, $search: String) {
            grapes(after: $after, first: $first, last: $last, before: $before, where: {search: $search}) {
              edges {
                node {
                  id
                  title
                  slug
                  acf_grape {
                    druvtyp {
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
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
           
                  total
                
              }
            }
          }
        
        `,
        null,
        { after, before, first, last, search }
      );

      const data = res.data.grapes;
      return data;
    }
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
