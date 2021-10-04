import { gql } from '@apollo/client';

export const RECIPE_SLUGCHECK = gql`
  query checkRecipeSlug($slug: ID!) {
    recipe(idType: SLUG, id: $slug) {
      uri
    }
  }
`;

export const RECIPE_SINGLE = gql`
  query fetchRecipeBySlug($slug: ID!) {
    recipe(idType: SLUG, id: $slug) {
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
  query fetchRecipeBySlug($slug: ID!) {
    recipe(idType: SLUG, id: $slug) {
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
