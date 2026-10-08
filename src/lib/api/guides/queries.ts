import { graphql } from "@/lib/wp/gql";

// Child pages of a guide page (the wine atlas regions, the wine schools),
// sorted by title.
export const ChildPagesQuery = graphql(`
  query ChildPages(
    $parent: ID!
    $after: String
    $before: String
    $first: Int
    $last: Int
    $search: String
  ) {
    pages(
      where: {
        orderby: { field: TITLE, order: ASC }
        parent: $parent
        search: $search
      }
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      edges {
        node {
          id
          uri
          slug
          title
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        total
      }
    }
  }
`);
