import { graphql } from "@/lib/wp/gql";

export const DrinkFieldsFragment = graphql(`
  fragment DrinkFields on Drink {
    title
    uri
    date
    acf_drinks {
      dryckestyper {
        slug
        name
      }
      passarTillRecept {
        ... on Recipe {
          id
          slug
          title
          featuredImage {
            node {
              ...ImageFields
            }
          }
          acf_recipe {
            desc
          }
        }
      }
      bolagetAdress
      beskrivning
      betyg
      ekologiskt
      forpackningar {
        name
      }
      omprovning
      vagn
      recension
      pris
      potentielltBetyg
    }
    featuredImage {
      node {
        id
        ...ImageFields
      }
    }
  }
`);

export const DrinkQuery = graphql(`
  query Drink($id: ID!) {
    drink(id: $id, idType: URI) {
      slug
      seo {
        ...SeoFields
      }
      modifiedGmt
      leverantorer_to_drink {
        leverantorer {
          ... on LeverantR {
            id
            title
            slug
            databaseId
          }
        }
      }
      ...DrinkFields
    }
  }
`);

export const PreviewDrinkQuery = graphql(`
  query PreviewDrink($id: ID!) {
    drink(idType: DATABASE_ID, id: $id) {
      ...DrinkFields
      preview {
        node {
          ...DrinkFields
        }
      }
    }
  }
`);

export const DrinksQuery = graphql(`
  query Drinks($after: String, $before: String, $first: Int, $last: Int) {
    drinks(after: $after, before: $before, first: $first, last: $last) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        total
      }
      edges {
        cursor
        node {
          slug
          title
          id
          acf_drinks {
            dryckestyper {
              name
            }
            forpackningar {
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
    }
  }
`);

export const ToplistPathsQuery = graphql(`
  query ToplistPaths {
    pageBy(uri: "topplistor") {
      id
      acf_topplistor {
        aktivaTopplistor {
          ... on Toplist {
            __typename
            uri
            slug
            modifiedGmt
          }
        }
      }
    }
  }
`);

export const ToplistsQuery = graphql(`
  query Toplists {
    pageBy(uri: "topplistor") {
      id
      acf_topplistor {
        aktivaTopplistor {
          ... on Toplist {
            __typename
            id
            uri
            title
            slug
            featuredImage {
              node {
                ...ImageFields
              }
            }
            seo {
              ...SeoFields
            }
            acf_toplists {
              ekologiskt
              maxAntal
              slogan
              dryckestyper {
                name
              }
              forpackningar {
                name
              }
            }
          }
        }
      }
    }
  }
`);

// Drinks published in a date window, paged by `getDrinksPublishedBetween`.
export const ToplistDrinksQuery = graphql(`
  query ToplistDrinks(
    $afterYear: Int!
    $afterMonth: Int!
    $afterDay: Int!
    $beforeYear: Int!
    $beforeMonth: Int!
    $beforeDay: Int!
    $batch: Int!
    $cursor: String!
  ) {
    drinks(
      where: {
        dateQuery: {
          after: { year: $afterYear, month: $afterMonth, day: $afterDay }
          before: { year: $beforeYear, month: $beforeMonth, day: $beforeDay }
        }
      }
      first: $batch
      after: $cursor
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          date
          uri
          title
          slug
          leverantorer_to_drink {
            leverantorer {
              ... on LeverantR {
                id
                title
                slug
                databaseId
              }
            }
          }
          acf_drinks {
            ekologiskt
            betyg
            pris
            recension
            beskrivning
            dryckestyper {
              name
            }
            forpackningar {
              name
            }
            passarTillRecept {
              ... on Recipe {
                title
                slug
                uri
              }
            }
          }
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
      }
    }
  }
`);
