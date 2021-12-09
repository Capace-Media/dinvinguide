import { gql } from '@apollo/client';

export const GRAPE_SLUGCHECK = gql`
  query checkGrapeSlug($id: ID!) {
    grape(id: $id, idType: SLUG) {
      uri
    }
  }
`;
export const GRAPE_IDCHECK = gql`
  query checkGrapeSlug($id: ID!) {
    grape(id: $id, idType: DATABASE_ID) {
      grapeId
      status
      template {
        templateName
      }
    }
  }
`;

export const GRAPE_SINGLE = gql`
  query getGrapeBySlug($id: ID!) {
    grape(id: $id, idType: SLUG) {
      seo {
        title
        metaDesc
        breadcrumbs {
          url
          text
        }
      }
      title
      uri
      acf_grape {
        text
      }
      featuredImage {
        node {
          mediaItemUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;
export const GRAPE_SINGLE_PREVIEW = gql`
  query getGrapeBySlug($id: ID!) {
    grape(id: $id, idType: DATABASE_ID) {
      title
      status
      seo {
        title
        metaDesc
        breadcrumbs {
          url
          text
        }
      }
      title
      uri
      acf_grape {
        text
      }
      featuredImage {
        node {
          mediaItemUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
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
              altText
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

export const GRAPES = gql`
  query getAllGrapes($batch: Int!, $cursor: String!) {
    grapes(first: $batch, after: $cursor) {
      edges {
        node {
          title
          id
          grapeId
          uri
          acf_grape {
            druvtyp {
              name
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
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
