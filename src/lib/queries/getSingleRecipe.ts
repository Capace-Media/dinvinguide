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
          acf_recipe {
            desc
            beskrivningStegForSteg {
              instruktion
            }
            processen
          }
          featuredImage {
            node {
              altText
              title
              mediaItemUrl
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
