import { gql } from '@apollo/client';

export const DRINK_SLUGCHECK = gql`
  query checkDrinkSlug($id: ID!) {
    drink(idType: SLUG, id: $id) {
      uri
    }
  }
`;
export const DRINK_IDCHECK = gql`
  query checkDrinkSlug($id: ID!) {
    drink(idType: DATABASE_ID, id: $id) {
      drinkId
      template {
        templateName
      }
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
      slug
      uri
      featuredImage {
        node {
          mediaItemUrl
          altText
          mediaDetails {
            width
            height
          }
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
    drink(idType: DATABASE_ID, id: $id) {
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
          slug
          uri
          featuredImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
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
export const DRINKTIP_IDCHECK = gql`
  query checkDrinkSlug($id: ID!) {
    drinktip(idType: DATABASE_ID, id: $id) {
      drintipId
    }
  }
`;

export const DRINKTIP_SINGLE = gql`
  query fetchDrinktipBySlug($id: ID!) {
    drinktip(idType: SLUG, id: $id) {
      title
      id
      slug
      uri
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
          altText
          mediaDetails {
            width
            height
          }
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
          slug
          uri
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
              altText
              mediaDetails {
                width
                height
              }
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
          slug
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
              altText
              mediaDetails {
                width
                height
              }
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
          slug
          uri
          drinktipId
          id
          featuredImage {
            node {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
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
