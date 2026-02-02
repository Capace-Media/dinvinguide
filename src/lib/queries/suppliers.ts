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
              mediaDetails {
                  width
                  height
              }
            }
          }
        }
      }
    }
  }
`;

export const getSupplierQuery = `
  query getSupplierQuery($id: ID!) {
   leverantR(id: $id, idType: SLUG) {
    title
    content
    excerpt
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
    drycker_to_leverantor {
      drycker {
        ... on Drink {
          id
          title
          slug
          __typename
          acf_drinks {
            dryckestyper {
              name
            }
            forpackningar {
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
            }
          }
        }
        ... on Drinktip {
          id
          title
          slug
          __typename
          acf_dryckestips {
            potentielltBetyg
            betyget
            dryckestyper
            forpackningar
            pris
            passarTillRecept {
              ... on Recipe {
                id
                title
                uri
              }
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
    }
  }
  }
`;
