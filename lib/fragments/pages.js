import { gql } from '@apollo/client';

export const PAGE_OVERVIEW = gql`
  query fetchOverviewPage($id: ID!) {
    page(idType: URI, id: $id) {
      title

      acf_overviewPage {
        ingress
        sidor {
          ... on Post {
            id
            uri
            title
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
          ... on Page {
            id
            uri
            title
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_EXPLORER = gql`
  query fetchExplorerPage($id: ID!) {
    page(idType: URI, id: $id) {
      title
      acf_explorer {
        slogan
      }
    }
  }
`;
