import { graphql } from "@/lib/wp/gql";

// Slugs and modified dates for the sitemaps. Lists are capped (`first`) at
// what each section realistically holds; recipes page through instead.

export const GrapeSitemapQuery = graphql(`
  query GrapeSitemap {
    grapes(first: 1000) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`);

export const DrinkSitemapQuery = graphql(`
  query DrinkSitemap {
    drinks(first: 1000) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`);

export const DrinkTipSitemapQuery = graphql(`
  query DrinkTipSitemap {
    drinktips(first: 1000) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`);

export const WordSitemapQuery = graphql(`
  query WordSitemap {
    glossaries(first: 100) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`);

export const RecipeSitemapQuery = graphql(`
  query RecipeSitemap($first: Int!, $after: String) {
    recipes(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`);

export const PostSitemapQuery = graphql(`
  query PostSitemap {
    posts(first: 1000) {
      nodes {
        slug
        modifiedGmt
        author {
          node {
            slug
          }
        }
      }
    }
  }
`);

export const PlaylistSitemapQuery = graphql(`
  query PlaylistSitemap {
    playlists(first: 50) {
      nodes {
        slug
      }
    }
  }
`);

export const WineAtlasSitemapQuery = graphql(`
  query WineAtlasSitemap($parent: ID!) {
    pages(where: { parent: $parent }, first: 50) {
      nodes {
        slug
        modifiedGmt
        children(first: 50) {
          nodes {
            slug
            modifiedGmt
          }
        }
      }
    }
  }
`);

export const WineSchoolSitemapQuery = graphql(`
  query WineSchoolSitemap($parent: ID!) {
    pages(where: { parent: $parent }, first: 40) {
      nodes {
        slug
        modifiedGmt
      }
    }
  }
`);
