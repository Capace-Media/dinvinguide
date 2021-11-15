import { gql } from '@apollo/client';

export const RECIPE_SLUGCHECK = gql`
  query checkRecipeSlug($id: ID!) {
    recipe(idType: SLUG, id: $id) {
      uri
    }
  }
`;
export const RECIPE_IDCHECK = gql`
  query checkRecipeSlug($id: ID!) {
    recipe(idType: DATABASE_ID, id: $id) {
      recipeId
    }
  }
`;

export const RECIPE_SINGLE = gql`
  query fetchRecipeBySlug($id: ID!) {
    recipe(idType: SLUG, id: $id) {
      seo {
        title
        metaDesc
        breadcrumbs {
          url
          text
        }
      }
      title
      uri
      slug
      acf_recipe {
        skrivetAv {
          name
        }
        desc
        passandeDrycker {
          ... on Drink {
            id
            title
            uri
            acf_drinks {
              betyg
              forpackningar {
                name
              }
              dryckestyper {
                name
              }
            }
            featuredImage {
              node {
                mediaItemUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
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
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;
export const RECIPE_SINGLE_PREVIEW = gql`
  query fetchRecipePreview($id: ID!) {
    recipe(idType: DATABASE_ID, id: $id) {
      seo {
        title
        metaDesc
        breadcrumbs {
          url
          text
        }
      }
      title
      uri
      slug
      acf_recipe {
        skrivetAv {
          name
        }
        desc
        passandeDrycker {
          ... on Drink {
            id
            title
            uri
            acf_drinks {
              betyg
              forpackningar {
                name
              }
              dryckestyper {
                name
              }
            }
            featuredImage {
              node {
                mediaItemUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
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
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      preview {
        node {
          seo {
            title
            metaDesc
            breadcrumbs {
              url
              text
            }
          }
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
              altText
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
`;

export const RECIPES = gql`
  query fetchAllRecipes($batch: Int!, $cursor: String!) {
    recipes(first: $batch, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          acf_oldcontent {
            oldContentAcf
          }
          uri
          recipeId
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
              altText
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
`;

export const RECIPES_INIT = gql`
  query fetchInitialRecipes {
    recipes(first: 80) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          acf_oldcontent {
            oldContentAcf
          }
          uri
          recipeId
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
              altText
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
`;

export const RECIPES_ADD = gql`
  query fetchAllRecipes($cursor: String!) {
    recipes(first: 20, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          acf_oldcontent {
            oldContentAcf
          }
          uri
          recipeId
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
              altText
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
`;
