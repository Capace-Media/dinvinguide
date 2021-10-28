import { gql } from '@apollo/client';

export const DRINK_SLUGCHECK = gql`
  query checkDrinkSlug($id: ID!) {
    drink(idType: SLUG, id: $id) {
      uri
    }
  }
`;

export const DRINK_SINGLE = gql`
  query fetchDrinkBySlug($id: ID!) {
    drink(idType: SLUG, id: $id) {
      seo {
        title
        metaDesc
        breadcrumbs {
          url
          text
        }
      }
      title
      date
      id
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      acf_drinks {
        pris
        ekologiskt
        recension
        bolagetAdress
        knappUrl
        betyg
        vagn
        dryckestyper {
          name
        }
        forpackningar {
          name
        }
      }
    }
  }
`;

export const DRINK_SINGLE_PREVIEW = gql`
  query fetchDrinkPreviewBySlug($id: ID!) {
    drink(idType: SLUG, id: $id) {
      preview {
        node {
          seo {
            title
            metaDesc
            breadcrumbs {
              url
              text
            }
          }
          title
          date
          id
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          acf_drinks {
            land
            argang
            pris
            ekologiskt
            recension
            bolagetAdress
            knappUrl
            betyg
            vagn
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
`;

export const DRINKTIP_SLUGCHECK = gql`
  query checkDrinktipSlug($id: ID!) {
    drinktip(idType: SLUG, id: $id) {
      uri
    }
  }
`;

export const DRINKTIP_SINGLE = gql`
  query fetchDrinktipBySlug($id: ID!) {
    drinktip(idType: SLUG, id: $id) {
      title
      id
      seo {
        title
        metaDesc
        breadcrumbs {
          url
          text
        }
      }
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      acf_dryckestips {
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
`;

export const DRINKTIP_SINGLE_PREVIEW = gql`
  query fetchDrinktipPreviewBySlug($id: ID!) {
    drinktip(idType: SLUG, id: $id) {
      preview {
        node {
          title
          id
          seo {
            title
            metaDesc
            breadcrumbs {
              url
              text
            }
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          acf_dryckestips {
            pris
            dryckestyper
            forpackningar
            ekologiskt
            recension
            bolagetAdress
            knappUrl
            beskrivning
          }
        }
      }
    }
  }
`;

export const DRINKS = gql`
  query fetchAllDrinks($batch: Int, $cursor: String!) {
    drinks(first: $batch, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          date
          uri
          drinkId
          title
          acf_drinks {
            betyg
            ekologiskt
            dryckestyper {
              name
            }
            forpackningar {
              name
            }
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`;

export const DRINKTIPS = gql`
  query fetchAllDrinktips($cursor: String!, $batch: Int!) {
    drinktips(first: $batch, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          title
          uri
          drinktipId
          id
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          acf_dryckestips {
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
`;
