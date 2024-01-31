import { getErrorMessage } from "../utils/getErrorMessage";
import { WPnext } from "../wp";

export const getSearchData = async (search: string) => {
  try {
    const res = await WPnext(
      `query getSearchData($search: String) {
        drinktips(where: {search: $search}) {
          nodes {
            title
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
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
              }
            }
          }
        }
      }`,
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
