import { getErrorMessage } from "../utils/getErrorMessage";
import { WPServerSide, WPnext } from "../wp";
import { SEO } from "./fragments/Seo";

export const getPost = async (id: string) => {
  try {
    const res = await WPnext(
      `query GET_POST($id: ID!) {
        post(idType: URI, id: $id) {
          title
          slug
          uri
          content
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
                modifiedGmt
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
                  ... on Grape {
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

export const getPreviewPost = async (id: any) => {
  try {
    const res = await WPServerSide(
      `query getArticlePreviewBySlug($id: ID!) {
        post(idType: DATABASE_ID, id: $id) {
         
          title
          template {
            templateName
          }
          uri
          content
          acf_oldcontent {
            oldContentAcf
          }
          acf_posts {
            flerBilder {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
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
                    altText
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
            }
            sektioner {
              ... on Post_AcfPosts_Sektioner_Video {
                fieldGroupName
                url
              }
              ... on Post_AcfPosts_Sektioner_Dryck {
                fieldGroupName
                name
                text
                other {
                  linkSystembolaget
                }
                bild {
                  bild {
                    mediaItemUrl
                    altText
                    mediaDetails {
                      width
                      height
                    }
                  }
                }
              }
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
                        mediaDetails {
                          width
                          height
                        }
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
                        mediaDetails {
                          width
                          height
                        }
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
                        mediaDetails {
                          width
                          height
                        }
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
              altText
              mediaDetails {
                width
                height
              }
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
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
                kortBeskrivning
              }
            }
          }
          preview {
            node {
              title
              template {
                templateName
              }
              uri
              content
              acf_oldcontent {
                oldContentAcf
              }
              acf_posts {
                flerBilder {
                  mediaItemUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
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
                        altText
                        mediaDetails {
                          width
                          height
                        }
                      }
                    }
                  }
                }
                sektioner {
                  ... on Post_AcfPosts_Sektioner_Video {
                    fieldGroupName
                    url
                  }
                  ... on Post_AcfPosts_Sektioner_Dryck {
                    fieldGroupName
                    name
                    text
                    other {
                      linkSystembolaget
                    }
                    bild {
                      bild {
                        mediaItemUrl
                        altText
                        mediaDetails {
                          width
                          height
                        }
                      }
                    }
                  }
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
                            mediaDetails {
                              width
                              height
                            }
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
                            mediaDetails {
                              width
                              height
                            }
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
                            mediaDetails {
                              width
                              height
                            }
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
                  altText
                  mediaDetails {
                    width
                    height
                  }
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
                      altText
                      mediaDetails {
                        width
                        height
                      }
                    }
                    kortBeskrivning
                  }
                }
              }
            }
          }
        }
      }
      `,
      { id }
    );

    const data = res?.data?.post?.preview?.node
      ? res.data.post.preview.node
      : res?.data?.post;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
