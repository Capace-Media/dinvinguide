import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";
import { DRINK } from "./fragments/Drink";
import { SEO } from "./fragments/Seo";

export const getDrink = async (id: string) => {
  try {
    const res = await WPnext(
      `query getDrink($id: ID! ) {
        drink(id: $id, idType: URI) {
          title
          uri
          date
          acf_drinks {
            dryckestyper {
              slug
              name
            }
            passarTillRecept {
              ... on Recipe {
                id
                slug
                title
                featuredImage {
                  node {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
                acf_recipe {
                  desc
                }
              }
            }
            bolagetAdress
            beskrivning
            betyg
            ekologiskt
            forpackningar {
              name
            }
            omprovning
            vagn
            recension
            pris
            potentielltBetyg
          }
          featuredImage {
            node {
              altText
              mediaItemUrl
              id
              mediaDetails {
                height
                width
              }
            }
          }
        }
      }`,
      { id }
    );

    const data = res.data.drink;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};

export const getPreviewDrink = async (id: number) => {
  try {
    const res = await WPnext(
      `query getPreviewDrink($id: ID!) {
        drink(idType: DATABASE_ID, id: $id) {
          ${DRINK}
          preview {
          node {
         ${DRINK}
        }
      }
        }
      }`,
      { id }
    );

    const data = res?.data?.drink?.preview?.node
      ? res.data.drink.preview.node
      : res.data.drink;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
