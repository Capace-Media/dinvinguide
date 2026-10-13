import { graphql } from "@/lib/wp/gql";

// The fields the site search indexes, one cursor-paged query per content type.
// Kept small: titles, a short text field and what a result row needs.

export const PostSearchSourceQuery = graphql(`
  query PostSearchSource($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        date
        modifiedGmt
        excerpt
        author {
          node {
            slug
          }
        }
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`);

export const RecipeSearchSourceQuery = graphql(`
  query RecipeSearchSource($first: Int!, $after: String) {
    recipes(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        date
        modifiedGmt
        acf_recipe {
          desc
        }
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`);

export const DrinktipSearchSourceQuery = graphql(`
  query DrinktipSearchSource($first: Int!, $after: String) {
    drinktips(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        date
        modifiedGmt
        acf_dryckestips {
          beskrivning
        }
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`);

export const DrinkSearchSourceQuery = graphql(`
  query DrinkSearchSource($first: Int!, $after: String) {
    drinks(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        date
        modifiedGmt
        acf_drinks {
          beskrivning
        }
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`);

export const GrapeSearchSourceQuery = graphql(`
  query GrapeSearchSource($first: Int!, $after: String) {
    grapes(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        title
        slug
        date
        modifiedGmt
        acf_grape {
          kortBeskrivning
        }
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
`);
