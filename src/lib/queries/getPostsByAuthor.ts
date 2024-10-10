import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getPostsByAuthor = async (
  after?: string,
  before?: string,
  authorName?: string,
  search = "",
  first?: number | null,
  last?: number | null
) => {
  try {
    const res = await WP(
      `
    query getPostsByAuthor($after: String, $before: String, $search: String, $authorName: String, $first: Int, $last: Int) {
        posts(
          first: $first
          last: $last
          after: $after
          before: $before
          where: {authorName: $authorName, search: $search}
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
     
              total
       
            startCursor
          }
          edges {
            node {
              id
              title
              uri
              modifiedGmt
              acf_posts {
                ingress
              }
              author {
                node {
                  name
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
                  title
                  sizes(size: THUMBNAIL)
                }
              }
            }
          }
        }
      }
      `,
      null,
      { after, before, search, authorName, first, last }
    );

    const users = res.data.posts;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};

type DataArgs = {
  after?: string;
  before?: string;
  search?: string;
  first?: number | null;
  last?: number | null;
};

export const getAllArticles = async (args: DataArgs) => {
  const { after, before, search, first, last } = args;
  try {
    const res = await WP(
      `
    query getAllArticles($after: String, $before: String, $search: String, $first: Int, $last: Int) {
        posts(
          first: $first
          last: $last
          after: $after
          before: $before
          where: { search: $search}
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
    
              total
       
            startCursor
          }
          edges {
            node {
              id
              title
              uri
              modifiedGmt
              acf_posts {
                ingress
              }
              author {
                node {
                  name
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
                  title
                  sizes(size: THUMBNAIL)
                }
              }
            }
          }
        }
      }
      `,
      "post",
      { after, before, search, first, last }
    );

    const users = res.data.posts;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
