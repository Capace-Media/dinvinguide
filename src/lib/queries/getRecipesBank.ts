import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";

type DataArgs = {
  after?: string;
  before?: string;
  search?: string;
  first?: number;
  last?: number | null;
  id?: string;
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
              guestWriter {
                nodes {
                  name
                }
              }
              acf_recipe {
                recepieCategories {
                  slug
                  name
                }
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

export const getRecipesByCategory = async (args: DataArgs) => {
  const { after, before, first, last, search, id } = args;
  try {
    const res = await WPnext(
      `
      query getRecipesByCategory($id: ID!, $after: String, $before: String, $first: Int, $last: Int, $search: String) {
        recipeCategory(id: $id, idType: URI) {
          recipes(
                after: $after
                before: $before
                first: $first
                last: $last
                where: {search: $search}
              ) {
                edges {
                  node {
                    guestWriter {
                      nodes {
                        name
                      }
                    }
                    acf_recipe {
                      recepieCategories {
                        slug
                        name
                      }
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
      }
      `,
      { after, before, search, first, last, id }
    );

    const data = res.data.recipeCategory.recipes;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};

export const getDrinkRecipe = async () => {
  try {
    const res = await WPnext(`query getDrinkRecipe($id: ID! = "drycker") {
      recipeCategory(id: $id, idType: SLUG) {
 
        recipes(first: 4) {
          nodes {
            guestWriter {
              nodes {
                name
              }
            }
            acf_recipe {
              recepieCategories {
                slug
                name
              }
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
        }
      }
    `);
    const data = res.data.recipeCategory.recipes;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
