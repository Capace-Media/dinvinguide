import { Client } from '../apollo';
import { gql } from '@apollo/client';

const queryLimit = 2000;
const batchLimit = 200;

export const getRecipePaths = async () => {
  try {
    const res = await Client.query({
      query: gql`
        query getRecipePaths($limit: Int!) {
          recipes(first: $limit) {
            edges {
              cursor
              node {
                slug
              }
            }
          }
        }
      `,
      variables: {
        limit: queryLimit,
      },
    });
    const paths = res.data.recipes.edges.map(({ node: recipe }) => {
      return {
        params: {
          recipe: recipe.slug,
        },
      };
    });
    return paths;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getRecipes = async () => {
  try {
    let hasNextPage = true;
    let currentCursor = '';
    let array = [];

    while (hasNextPage) {
      const req = await Client.query({
        query: gql`
          query getMoreArticles($batch: Int!, $cursor: String!) {
            recipes(first: $batch, after: $cursor) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  id
                  uri
                  date
                  title
                  acf_recipe {
                    skrivetAv {
                      name
                    }
                  }
                  featuredImage {
                    node {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          batch: batchLimit,
          cursor: currentCursor,
        },
      });

      array.push(...req.data.recipes.edges);
      hasNextPage = req.data.recipes.pageInfo.hasNextPage;
      currentCursor = req.data.recipes.pageInfo.endCursor;

      console.log(
        'RECIPE BATCH =>',
        hasNextPage,
        currentCursor,
        req.data.recipes.edges.length
      );
    }

    console.log('TOTAL RECIPES =>', array.length);
    return array;
  } catch (error) {
    console.log('ERROR getRecipes =>', error);
    return;
  }
};

export const getRecipe = async (slug) => {
  try {
    const res = await Client.query({
      query: gql`
        query getRecipe($slug: String!) {
          recipeBy(slug: $slug) {
            title
            uri
            slug
            acf_recipe {
              skrivetAv {
                name
              }
              desc
              ingredienserOvrigt
              antalPortioner
              processen
              receptdelar {
                rubrik
                ingredienser {
                  namn
                  antal
                  enhet {
                    name
                  }
                }
              }
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
        }
      `,
      variables: {
        slug,
      },
    });
    return res.data.recipeBy;
  } catch (error) {
    console.log(error);
    return;
  }
};
