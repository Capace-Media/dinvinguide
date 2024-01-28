export const RECIPE = `
title
          featuredImage {
            node {
              altText
              title
              mediaItemUrl
              mediaDetails {
                width
                height
              }
            }
          }
          acf_recipe {
            desc
            processen
            recipeAverageRating
            recipeRatingCount
            ingredienserOvrigt
            antalPortioner
            receptdelar {
              rubrik
              ingredienser {
                antal
                enhet {
                  name
                }
                namn
              }
            }
            beskrivningStegForSteg {
              instruktion
            }
            skrivetAv {
              slug
              name
              id
            }
            recepieCategories {
              id
              slug
              uri
              name
            }
            kok {
              name
              slug
              id
            }
            passandeDrycker {
              ... on Drink {
                id
                slug
                title
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
                    altText
                    mediaItemUrl
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            time {
              cookingTime
              prepTime
            }
            bilder {
              kortBeskrivning
              img {
                altText
                id
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
            nutritions {
              energKcal
              fett
              fieldGroupName
              kolhydrater
              protein
            }
          }
`;
