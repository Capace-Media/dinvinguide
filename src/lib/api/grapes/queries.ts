import { graphql } from "@/lib/wp/gql";

export const GrapeQuery = graphql(`
  query Grape($id: ID!) {
    grape(id: $id, idType: URI) {
      id
      slug
      seo {
        ...SeoFields
      }
      acf_grape {
        kortBeskrivning
        text
        druvtyp {
          name
          slug
        }
      }
      title
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
    }
  }
`);

// Prerendered at build; the rest render on demand.
export const GrapeSlugsQuery = graphql(`
  query GrapeSlugs {
    grapes {
      nodes {
        slug
      }
    }
  }
`);

export const GrapeCardFieldsFragment = graphql(`
  fragment GrapeCardFields on GrapeConnection {
    edges {
      node {
        id
        title
        slug
        acf_grape {
          druvtyp {
            name
          }
        }
        featuredImage {
          node {
            ...ImageFields
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      total
    }
  }
`);

export const GrapesQuery = graphql(`
  query Grapes(
    $last: Int
    $first: Int
    $before: String
    $after: String
    $search: String
  ) {
    grapes(
      after: $after
      first: $first
      last: $last
      before: $before
      where: { search: $search }
    ) {
      ...GrapeCardFields
    }
  }
`);

export const GrapesByTypeQuery = graphql(`
  query GrapesByType(
    $id: ID!
    $last: Int
    $first: Int
    $before: String
    $after: String
    $search: String
  ) {
    grapeType(id: $id, idType: SLUG) {
      name
      grapes(
        after: $after
        first: $first
        last: $last
        before: $before
        where: { search: $search }
      ) {
        ...GrapeCardFields
      }
    }
  }
`);
