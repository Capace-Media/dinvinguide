import { gql } from '@apollo/client';

export const GRAPE_SLUGCHECK = gql`
  query checkGrapeSlug($slug: ID!) {
    grape(id: $slug, idType: SLUG) {
      uri
    }
  }
`;

export const GRAPE_SINGLE = gql`
  query getGrapeBySlug($slug: ID!) {
    grape(id: $slug, idType: SLUG) {
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
  query getGrapeBySlug($slug: ID!) {
    grape(id: $slug, idType: SLUG) {
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
