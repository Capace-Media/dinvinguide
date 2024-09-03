import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getDrinks = async (
  after?: string,
  before?: string,
  first?: number | null,
  last?: number | null
) => {
  try {
    const res = await WP(
      `
      query getDrink($after: String, $before: String, $first: Int, $last: Int) {
        drinks(after: $after, before: $before, first: $first, last: $last) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
           
              total
           
          }
          edges {
            cursor
            node {
              slug
              title
              id
              acf_drinks {
                dryckestyper {
                  name
                }
                forpackningar {
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
      `,
      "drink",
      { after, before, first, last }
    );

    const data = res.data.drinks;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
