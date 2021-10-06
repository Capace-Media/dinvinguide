import { gql } from '@apollo/client';

export const RECIPE_SLUGCHECK = gql`
  query checkRecipeSlug($id: ID!) {
    recipe(idType: SLUG, id: $id) {
      uri
    }
  }
`;

export const RECIPE_SINGLE = gql`
  query fetchRecipeBySlug($id: ID!) {
    recipe(idType: SLUG, id: $id) {
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
`;
export const RECIPE_SINGLE_PREVIEW = gql`
  query fetchRecipeBySlug($id: ID!) {
    recipe(idType: SLUG, id: $id) {
      preview {
        node {
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
    }
  }
`;
