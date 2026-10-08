import { graphql } from "@/lib/wp/gql";

export const DrinkTipsQuery = graphql(`
  query DrinkTips($after: String, $before: String, $first: Int, $last: Int) {
    drinktips(after: $after, before: $before, first: $first, last: $last) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
        total
      }
      edges {
        node {
          title
          slug
          uri
          drinktipId
          id
          modifiedGmt
          featuredImage {
            node {
              ...ImageFields
            }
          }
          acf_dryckestips {
            potentielltBetyg
            betyget
            dryckestyper
            forpackningar
            pris
            passarTillRecept {
              ... on Recipe {
                id
                title
                uri
              }
            }
          }
        }
      }
    }
  }
`);

export const DrinkTipQuery = graphql(`
  query DrinkTip($id: ID!) {
    drinktip(idType: URI, id: $id) {
      seo {
        ...SeoFields
      }
      title
      date
      id
      slug
      uri
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
      featuredImage {
        node {
          ...ImageFields
        }
      }
      acf_dryckestips {
        potentielltBetyg
        betyget
        pris
        dryckestyper
        ekologiskt
        forpackningar
        recension
        bolagetAdress
        knappUrl
        beskrivning
      }
    }
  }
`);
