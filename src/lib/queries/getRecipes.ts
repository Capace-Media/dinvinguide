import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getRecipes = async () => {
  try {
    const res = await WP(`query getRecipes {
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

export const getHighlightedRecipes = async () => {
  try {
    const res = await WP(`query getHighlightedRecipes {
      page(id: "/", idType: URI) {
        GQL_frontPageFields {
          highlightedRecept {
            ... on Recipe {
              title
              slug
              id
              modifiedGmt
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
        }
      }
    }`);

    const data = res?.data?.page?.GQL_frontPageFields?.highlightedRecept;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
