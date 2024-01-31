import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import WP from "@/lib/wp";
import { SEO } from "../fragments/Seo";

export const getGrapeSEO = async (id: string) => {
  try {
    const res = await WP(
      `query getGrapeSEO($id: ID!) {
        grape(id: $id, idType: URI) {
          slug
          ${SEO}
        }
      }`,
      { id }
    );

    const grapes = res.data.grape;
    return grapes;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
