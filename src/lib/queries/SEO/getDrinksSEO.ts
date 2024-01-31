import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import WP from "@/lib/wp";
import { SEO } from "../fragments/Seo";

export const getDrinkSEO = async (id: string) => {
  try {
    const res = await WP(
      `query getDrinkSEO($id: ID!) {
        drink(id: $id, idType: URI) {
          slug
          ${SEO}
        }
      }`,
      { id }
    );

    const drinks = res.data.drink;
    return drinks;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
