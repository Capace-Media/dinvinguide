import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import WP from "@/lib/wp";
import { SEO } from "../fragments/Seo";

export const getDrinkTipsSEO = async (id: string) => {
  try {
    const res = await WP(
      `query getDrinkTipsSEO($id: ID!) {
        drinktip(id: $id, idType: URI) {
          slug
          ${SEO}
        }
      }`,
      null,
      { id }
    );

    const drinks = res.data.drinktip;
    return drinks;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
