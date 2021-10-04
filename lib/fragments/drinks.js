import { gql } from '@apollo/client';

export const DRINK_SLUGCHECK = gql`
  query checkDrinkSlug($slug: ID!) {
    drink(idType: SLUG, id: $slug) {
      uri
    }
  }
`;

export const DRINK_SINGLE = gql`
  query fetchDrinkBySlug($slug: ID!) {
    drink(idType: SLUG, id: $slug) {
      title
      date
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
`;

export const DRINK_SINGLE_PREVIEW = gql`
  query fetchDrinkPreviewBySlug($slug: ID!) {
    drink(idType: SLUG, id: $slug) {
      preview {
        node {
          title
          date
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
  query checkDrinktipSlug($slug: ID!) {
    drinktip(idType: SLUG, id: $slug) {
      uri
    }
  }
`;

export const DRINKTIP_SINGLE = gql`
  query fetchDrinktipBySlug($slug: ID!) {
    drinktip(idType: SLUG, id: $slug) {
      title
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
  query fetchDrinktipPreviewBySlug($slug: ID!) {
    drinktip(idType: SLUG, id: $slug) {
      preview {
        node {
          title
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
