import { Client } from '../apollo';
import { gql } from '@apollo/client';

const queryLimit = 2000;

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
      params: {
        recipe: recipe.slug;
      }
    });
    return paths;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getRecipes = async () => {
  try {
    const res = await Client.query({
      query: gql`
        query getRecipes($limit: Int!) {
          recipes(first: $limit) {
            edges {
              node {
                id
                uri
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
        limit: queryLimit,
      },
    });
    console.log(res.data.recipes.edges);
    return res.data.recipes.edges;
  } catch (error) {
    console.log(error);
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
