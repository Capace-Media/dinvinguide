import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";
import { SEO } from "./fragments/Seo";

export const getSEOByPage = async (id: string) => {
  try {
    const res = await WP(
      `query getSEOByPage($id: ID!) {
        page(id: $id, idType: URI) {
          slug
          ${SEO}
        }
      }`,
      "page",
      { id }
    );

    const users = res.data.page;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
