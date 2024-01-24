import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";

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
  const { after, before, first, last, parent } = args;
  try {
    const res = await WPnext(
      `
      query getWhineAtlases($parent: ID! = "cG9zdDo0NzcyMQ==", $after: String, $before: String, $first: Int, $last: Int) {
        pages(
          where: {parent: $parent}
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
            offsetPagination {
              total
            }
          }
        }
      }
      `,
      { after, before, first, last, parent }
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
