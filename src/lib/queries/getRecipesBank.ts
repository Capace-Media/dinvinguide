import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";

type DataArgs = {
  after?: string;
  before?: string;
  search?: string;
  first?: number;
  last?: number | null;
};

export const getRecipesBank = async (args: DataArgs) => {
  const { after, before, first, last, search } = args;
  try {
    const res = await WPnext(
      `
      query MyQuery2($after: String, $before: String, $first: Int, $last: Int, $search: String) {
        recipes(
          after: $after
          before: $before
          first: $first
          last: $last
          where: {search: $search}
        ) {
          edges {
            node {
              acf_recipe {
                skrivetAv {
                  name
                }
                time {
                  cookingTime
                  prepTime
                }
                recipeAverageRating
              }
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
      { after, before, search, first, last }
    );

    const data = res.data.recipes;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
