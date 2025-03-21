export const getSuppliersQuery = `
  query getSuppliersQuery($after: String, $before: String, $first: Int, $last: Int) {
    suppliers: leverantRer(after: $after, before: $before, first: $first, last: $last) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      edges {
        node {
          excerpt
          id
          slug
          title
          featuredImage {
            node {
              id
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;
