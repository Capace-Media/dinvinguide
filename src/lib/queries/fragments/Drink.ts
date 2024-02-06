export const DRINK = ` title
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
          altText
          mediaItemUrl
          mediaDetails {
            height
            width
          }
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
    altText
    mediaItemUrl
    id
    mediaDetails {
      height
      width
    }
  }
}`;
