import { gql } from '@apollo/client';

export const PAGE_OVERVIEW = gql`
  query fetchOverviewPage($id: ID!) {
    page(idType: URI, id: $id) {
      title
      uri
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
      uri
      acf_explorer {
        slogan
        bkgResults {
          mediaItemUrl
        }
      }
    }
  }
`;

export const PAGE_SINGLE = gql`
  query fetchPage($id: ID!) {
    page(idType: URI, id: $id) {
      title
      content
      date
      uri
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      author {
        node {
          nicename
          name
        }
      }
      acf_posts {
        ingress
        sektioner {
          ... on Page_AcfPosts_Sektioner_Brodtext {
            fieldGroupName
            text
          }
        }
        lasMer {
          ... on Post {
            id
            title
            uri
            slug
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
          ... on Page {
            id
            title
            uri
            slug
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
