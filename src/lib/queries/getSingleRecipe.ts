import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";
import { SEO } from "./fragments/Seo";

export const getSingleRecipe = async (id: string) => {
  try {
    const res = await WP(
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
