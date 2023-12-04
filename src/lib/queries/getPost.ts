import { getErrorMessage } from "../utils/getErrorMessage";
import WP, { WPnext } from "../wp";
import { SEO } from "./fragments/Seo";

export const getPost = async (id: string) => {
  try {
    const res = await WPnext(
      `query GET_POST($id: ID!) {
        post(idType: URI, id: $id) {
          title
          slug
          uri
          modifiedGmt
          ${SEO}
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
                    altText
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
                    altText
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
                    altText
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
                    altText
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
                        altText
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
                        altText
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
                        altText
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
                  altText
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
                  altText
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
              username
              nicename
              slug
              name
              description
              acf_user {
                email
                facebook
                instagram
                kortBeskrivning
                bild {
                  altText
                  mediaItemUrl
                }
              }
            }
          }
        }
      }`,
      { id }
    );

    const data = res.data.post;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
