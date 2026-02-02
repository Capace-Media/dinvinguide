import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getSearchData = async (search: string) => {
  try {
    const res = await WP(
      `query getSearchData($search: String) {
        drinktips(where: {search: $search}) {
          nodes {
            title
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        recipes(where: {search: $search}) {
          nodes {
              title
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        posts(where: {search: $search}) {
          nodes {
              title
            slug
            author {
              node {
                slug
              }
            }
            featuredImage {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        drinks(where: {search: $search}) {
          nodes {
              title
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        grapes(where: {search: $search}) {
          nodes {
              title
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      }`,
      null,
      { search }
    );

    const data = res?.data;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
