import { graphql } from "@/lib/wp/gql";

// The fields the site search indexes, one cursor-paged query per content type.
// Kept small: titles, a short text field and what a result row needs.
//
// Oldest first, so new content lands on the last page. Each page is cached by
// the cursor before it; newest first, one new post would shift every page's
// cursor, miss the cache for all of them and rebuild from WordPress (~40 s).

export const PostSearchSourceQuery = graphql(`
  query PostSearchSource($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: { orderby: [{ field: DATE, order: ASC }] }
    ) {
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
    recipes(
      first: $first
      after: $after
      where: { orderby: [{ field: DATE, order: ASC }] }
    ) {
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
    drinktips(
      first: $first
      after: $after
      where: { orderby: [{ field: DATE, order: ASC }] }
    ) {
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
    drinks(
      first: $first
      after: $after
      where: { orderby: [{ field: DATE, order: ASC }] }
    ) {
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
    grapes(
      first: $first
      after: $after
      where: { orderby: [{ field: DATE, order: ASC }] }
    ) {
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
