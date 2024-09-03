import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import WP from "@/lib/wp";
import { SEO } from "../fragments/Seo";

export const getRecipeSEO = async (id: string) => {
  try {
    const res = await WP(
      `query getRecipeSEO($id: ID!) {
        recipe(id: $id, idType: URI) {
          slug
          ${SEO}
        }
      }`,
      null,
      { id }
    );

    const recipes = res.data.recipe;
    return recipes;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
