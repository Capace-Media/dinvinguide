import { getErrorMessage } from "../utils/getErrorMessage";
import { WPServerSide, WPnext } from "../wp";
import { RECIPE } from "./fragments/Recipe";
import { SEO } from "./fragments/Seo";

export const getSingleRecipe = async (id: string) => {
  try {
    const res = await WPnext(
      `query GET_RECIPE($id: ID!) {
        recipe(id: $id, idType: URI) {
          title
          ${SEO}
          featuredImage {
            node {
              altText
              title
              mediaItemUrl
              mediaDetails {
                width
                height
              }
            }
          }
          acf_recipe {
            desc
            processen
            recipeAverageRating
            recipeRatingCount
            ingredienserOvrigt
            antalPortioner
            receptdelar {
              rubrik
              ingredienser {
                antal
                enhet {
                  name
                }
                namn
              }
            }
            beskrivningStegForSteg {
              instruktion
            }
            skrivetAv {
              slug
              name
              id
            }
            recepieCategories {
              id
              slug
              uri
              name
            }
            kok {
              name
              slug
              id
            }
            passandeDrycker {
              ... on Drink {
                id
                slug
                title
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
            time {
              cookingTime
              prepTime
            }
            bilder {
              kortBeskrivning
              img {
                altText
                id
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            nutritions {
              energKcal
              fett
              fieldGroupName
              kolhydrater
              protein
            }
          }
        }
      }`,
      { id }
    );

    const users = res.data.recipe;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};

export const getPreviewRecipe = async (id: number) => {
  try {
    const res = await WPServerSide(
      `query getPreviewRecipe($id: ID!) {
        recipe(idType: DATABASE_ID, id: $id) {
          ${RECIPE}
          preview {
            node {
          ${RECIPE}
        }
      }
        }
      }`,
      { id }
    );

    const data = res?.data?.recipe?.preview?.node
      ? res.data.recipe.preview.node
      : res?.data?.recipe;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
