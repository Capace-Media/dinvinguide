import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import WP from "@/lib/wp";
import { SEO } from "../fragments/Seo";

export const getWordSEO = async (id: string) => {
  try {
    const res = await WP(
      `query getWordSEO($id: ID!) {
        glossary(id: $id, idType: URI) {
          slug
          ${SEO}
        }
      }`,
      { id }
    );

    const words = res.data.glossary;
    return words;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
