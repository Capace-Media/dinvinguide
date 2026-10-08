import { graphql } from "@/lib/wp/gql";

export const WordQuery = graphql(`
  query Word($id: ID!) {
    glossary(id: $id, idType: URI) {
      id
      content
      title
      modifiedGmt
      slug
      seo {
        ...SeoFields
      }
      featuredImage {
        node {
          ...ImageFields
        }
      }
      GQL_Word_Content {
        relateradTermer {
          ... on Glossary {
            id
            slug
            title
          }
        }
        hurAndvandsOrdet {
          alternativ1
          alternativ2
          alternativ3
        }
      }
    }
  }
`);

export const WordsByLetterQuery = graphql(`
  query WordsByLetter(
    $id: ID!
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    letter(id: $id, idType: SLUG) {
      glossaries(after: $after, before: $before, first: $first, last: $last) {
        pageInfo {
          hasNextPage
          endCursor
          hasPreviousPage
          startCursor
          total
        }
        edges {
          node {
            slug
            title
            id
          }
        }
      }
    }
  }
`);
