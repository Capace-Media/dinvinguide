import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

type DataArgs = {
  after?: string;
  before?: string;
  id?: string | null;
  search?: string;
  first?: number;
  last?: number | null;
  parent?: string;
};

export const getWhineAtlases = async (args: DataArgs) => {
  const { after, before, first, last, parent, search } = args;
  try {
    const res = await WP(
      `
      query getWhineAtlases($parent: ID! = "cG9zdDo0NzcyMQ==", $after: String, $before: String, $first: Int, $last: Int, $search: String) {
        pages(
          where: {orderby: {field: TITLE, order: ASC}, parent: $parent, search: $search}
          after: $after
          before: $before
          first: $first
          last: $last
        ) {
          edges {
            node {
              id
              uri
              slug
              title
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
  
              total
          
          }
        }
      }
      `,
      null,
      { after, before, first, last, parent, search }
    );

    const data = res.data.pages;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
