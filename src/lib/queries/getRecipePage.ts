import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getRecipePage = async () => {
  try {
    const res = await WP(`query getRecipePage {
        page(id: "recept", idType: URI) {
            page_content {
              intro
            }
          }
        recipes(first: 3) {
            nodes {
              title
              slug
              id
              modifiedGmt: dateGmt
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
