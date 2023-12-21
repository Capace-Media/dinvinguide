import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";

export const getPostsByAuthor = async (
  after?: string,
  before?: string,
  first?: number | null,
  last?: number | null
) => {
  try {
    const res = await WPnext(
      `
      query getDrink($after: String, $before: String, $first: Int, $last: Int) {
        drinks(after: $after, before: $before, first: $first, last: $last) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
            offsetPagination {
              total
            }
          }
          edges {
            cursor
            node {
              slug
              title
              id
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
      `,
      { after, before, first, last }
    );

    const drink = res.data.drinks;
    return drink;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
