import { gql } from '@apollo/client';
export const SEARCH_DRINKS = gql`
  query searchDrinks($search: String!, $batch: Int!, $cursor: String!) {
    drinks(where: { search: $search }, first: $batch, after: $cursor) {
      edges {
        node {
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
export const SEARCH_DRINKTIPS = gql`
  query searchDrinktips($search: String!, $batch: Int!, $cursor: String!) {
    drinktips(where: { search: $search }, first: $batch, after: $cursor) {
      edges {
        node {
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
export const SEARCH_POSTS = gql`
  query searchPosts($search: String!, $batch: Int!, $cursor: String!) {
    posts(where: { search: $search }, first: $batch, after: $cursor) {
      edges {
        node {
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
export const SEARCH_RECIPES = gql`
  query searchPosts($search: String!, $batch: Int!, $cursor: String!) {
    recipes(where: { search: $search }, first: $batch, after: $cursor) {
      edges {
        node {
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
export const SEARCH_GRAPES = gql`
  query searchPosts($search: String!, $batch: Int!, $cursor: String!) {
    grapes(where: { search: $search }, first: $batch, after: $cursor) {
      edges {
        node {
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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
