import { gql } from '@apollo/client';

export const ARTICLE_SLUGCHECK = gql`
  query checkArticleSlug($slug: ID!) {
    post(idType: SLUG, id: $slug) {
      uri
    }
  }
`;

export const ARTICLE_SINGLE = gql`
  query getArticleBySlug($slug: ID!) {
    post(idType: SLUG, id: $slug) {
      title
      uri
      content
      acf_posts {
        ingress
        lasMer {
          ... on Post {
            id
            title
            slug
            uri
            author {
              node {
                name
                nicename
              }
            }
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
          ... on Grape {
            id
            title
            slug
            uri
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
          ... on Recipe {
            id
            title
            slug
            uri
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }

          ... on Page {
            id
            title
            slug
            uri
            author {
              node {
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
        sektioner {
          ... on Post_AcfPosts_Sektioner_ExtraPuff {
            fieldGroupName
            extraPuff {
              ... on Grape {
                title
                slug
                uri
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
              }
              ... on Drink {
                title
                slug
                uri
                drinkTypes {
                  edges {
                    node {
                      name
                    }
                  }
                }
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
              }
              ... on Recipe {
                title
                slug
                uri
                passarTills {
                  edges {
                    node {
                      name
                    }
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
          ... on Post_AcfPosts_Sektioner_Brodtext {
            text
            fieldGroupName
          }
          ... on Post_AcfPosts_Sektioner_Citat {
            fieldGroupName
            text
          }
          ... on Post_AcfPosts_Sektioner_Mellanbild {
            fieldGroupName
            iGalleri
            img {
              mediaItemUrl
              mediaDetails {
                width
                height
              }
            }
          }
          ... on Post_AcfPosts_Sektioner_StorBild {
            fieldGroupName
            iGalleri
            img {
              mediaItemUrl
              mediaDetails {
                width
                height
              }
            }
          }
          ... on Post_AcfPosts_Sektioner_Faktalada {
            text
            fieldGroupName
          }
        }
      }
      featuredImage {
        node {
          mediaItemUrl
        }
      }
      author {
        node {
          nicename
          name
          firstName
          acf_user {
            bild {
              mediaItemUrl
            }
            kortBeskrivning
          }
        }
      }
    }
  }
`;

export const ARTICLE_SINGLE_PREVIEW = gql`
  query getArticlePreviewBySlug($slug: ID!) {
    post(idType: SLUG, id: $slug) {
      preview {
        node {
          title
          uri
          content
          acf_posts {
            ingress
            lasMer {
              ... on Post {
                id
                title
                slug
                uri
                author {
                  node {
                    name
                    nicename
                  }
                }
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
              }
              ... on Grape {
                id
                title
                slug
                uri
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
              }
              ... on Recipe {
                id
                title
                slug
                uri
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
              }

              ... on Page {
                id
                title
                slug
                uri
                author {
                  node {
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
            sektioner {
              ... on Post_AcfPosts_Sektioner_ExtraPuff {
                fieldGroupName
                extraPuff {
                  ... on Grape {
                    title
                    slug
                    uri
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                  ... on Drink {
                    title
                    slug
                    uri
                    drinkTypes {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                  }
                  ... on Recipe {
                    title
                    slug
                    uri
                    passarTills {
                      edges {
                        node {
                          name
                        }
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
              ... on Post_AcfPosts_Sektioner_Brodtext {
                text
                fieldGroupName
              }
              ... on Post_AcfPosts_Sektioner_Citat {
                fieldGroupName
                text
              }
              ... on Post_AcfPosts_Sektioner_Mellanbild {
                fieldGroupName
                iGalleri
                img {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              ... on Post_AcfPosts_Sektioner_StorBild {
                fieldGroupName
                iGalleri
                img {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              ... on Post_AcfPosts_Sektioner_Faktalada {
                text
                fieldGroupName
              }
            }
          }
          featuredImage {
            node {
              mediaItemUrl
            }
          }
          author {
            node {
              nicename
              name
              firstName
              acf_user {
                bild {
                  mediaItemUrl
                }
                kortBeskrivning
              }
            }
          }
        }
      }
    }
  }
`;

export const ARTICLES = gql`
  query fetchAllArticles($batch: Int, $cursor: String!) {
    posts(first: $batch, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          title
          uri
          id
          date
          author {
            node {
              nicename
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
