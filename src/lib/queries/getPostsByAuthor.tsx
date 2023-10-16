import { WPServerSide } from "../wp";

export const getPostsByAuthor = async (
  after?: string,
  before?: string,
  authorName?: string,
  search = "",
  first?: number | null,
  last?: number | null
) => {
  try {
    const res = await WPServerSide(
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
            offsetPagination {
              total
            }
            startCursor
          }
          edges {
            node {
              id
              title
              uri
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                  title
                }
              }
            }
          }
        }
      }
      `,
      { after, before, search, authorName, first, last }
    );

    const users = res.data.posts;
    return users;
  } catch (error) {
    console.error(error);
    return;
  }
};
