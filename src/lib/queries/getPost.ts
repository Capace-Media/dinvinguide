import { getErrorMessage } from "../utils/getErrorMessage";
import WP, { WPServerSide } from "../wp";
import { POST } from "./fragments/Post";
import { SEO } from "./fragments/Seo";

export const getPost = async (id: string) => {
  try {
    const res = await WP(
      `query GET_POST($id: ID!) {
        post(idType: URI, id: $id) {
          title
          slug
          uri
          content
          modifiedGmt: dateGmt
          ${SEO}
          acf_oldcontent {
            oldContentAcf
          }
          acf_posts {
            ingress
            lasMer {
              ... on Post {
                id
                title
                slug
                uri
                modifiedGmt: dateGmt
                acf_posts {
                  ingress
                }
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
                    mediaDetails {
                      width
                      height
                    }
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
                    mediaDetails {
                      width
                      height
                    }
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
                    mediaDetails {
                      width
                      height
                    }
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
                    mediaDetails {
                      width
                      height
                    }
                    altText
                  }
                }
              }
            }
            sektioner {
              ... on Post_AcfPosts_Sektioner_ExtraPuff {
                fieldGroupName
                extraPuff {
                ... on Drinktip {
                      __typename
                      title
                      slug
                      uri
                      featuredImage {
                        node {
                          mediaItemUrl
                          mediaDetails {
                            width
                            height
                          }
                          altText
                        }
                      }
                      acf_dryckestips {
                        dryckestyper
                        forpackningar
                      }
                    }
                  ... on Grape {
                    __typename
                    title
                    slug
                    uri
                    acf_grape {
                      kortBeskrivning
                    }
                    featuredImage {
                      node {
                        mediaItemUrl
                        mediaDetails {
                          width
                          height
                        }
                        altText
                      }
                    }
                  }
                  ... on Drink {
                    __typename
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
                        mediaDetails {
                          width
                          height
                        }
                        altText
                      }
                    }
                  }
                  ... on Recipe {
                    __typename
                    title
                    slug
                    uri
                    acf_recipe{
                      desc
                    }
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
                        mediaDetails {
                          width
                          height
                        }
                        altText
                      }
                    }
                  }
                }
              }
              ... on Post_AcfPosts_Sektioner_Video {
                fieldGroupName
                url
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
              mediaDetails {
                width
                height
              }
              altText
              
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
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }`,
      null,
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

export const getPreviewPost = async (id: number) => {
  try {
    const res = await WPServerSide(
      `query getPreviewPost($id: ID!) {
        post(idType: DATABASE_ID, id: $id) {
          ${POST}
          preview {
          node {
         ${POST}
        }
      }
        }
      }`,
      { id }
    );

    const data = res?.data?.post?.preview?.node
      ? res.data.post.preview.node
      : res.data.post;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
