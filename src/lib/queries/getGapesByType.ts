import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";

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
      console.log("Hello id =====>", id);
      const res = await WPnext(
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
                  featuredImage {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
                offsetPagination {
                  total
                }
              }
            }
          }
        }
        `,
        { after, before, first, last, id, search }
      );

      console.log("res in id =====>", res);

      const data = res.data.grapeType;
      return data;
    } else {
      console.log("hello grapes =====>", first, last);

      const res = await WPnext(
        `
        query getGapes($last: Int, $first: Int, $before: String, $after: String, $search: String) {
            grapes(after: $after, first: $first, last: $last, before: $before, where: {search: $search}) {
              edges {
                node {
                  id
                  title
                  slug
                  featuredImage {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
                offsetPagination {
                  total
                }
              }
            }
          }
        
        `,
        { after, before, first, last, search }
      );

      console.log("res in all grapes =====>", res);
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
