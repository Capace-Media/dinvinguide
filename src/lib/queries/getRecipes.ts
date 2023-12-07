import { getErrorMessage } from "../utils/getErrorMessage";
import WP, { WPnext } from "../wp";

export const getRecipes = async () => {
  try {
    const res = await WPnext(`query getRecipes {
        page(id: "recept", idType: URI) {
            page_content {
              intro
            }
          }
        recipes(first: 7) {
            nodes {
              title
              slug
              id
              modifiedGmt
              featuredImage {
                node {
                  altText
                  title
                  mediaItemUrl
                }
              }
              acf_recipe {
                recepieCategories {
                    id
                    name
                    slug
                  }
                skrivetAv {
                  name
                  id
                  slug
                }
              }
            }
          }
          }`);

    const data = res?.data;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
