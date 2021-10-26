import { gql } from '@apollo/client';

export const GRAPE_SLUGCHECK = gql`
  query checkGrapeSlug($id: ID!) {
    grape(id: $id, idType: SLUG) {
      uri
    }
  }
`;

export const GRAPE_SINGLE = gql`
  query getGrapeBySlug($id: ID!) {
    grape(id: $id, idType: SLUG) {
      title
      uri
      acf_grape {
        text
      }
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
  }
`;
export const GRAPE_SINGLE_PREVIEW = gql`
  query getGrapeBySlug($id: ID!) {
    grape(id: $id, idType: SLUG) {
      preview {
        node {
          title
          uri
          acf_grape {
            text
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;

export const GRAPES = gql`
  query getAllGrapes($batch: Int!, $cursor: String!) {
    grapes(first: $batch, after: $cursor) {
      edges {
        node {
          title
          id
          uri
          acf_grape {
            druvtyp {
              name
            }
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
