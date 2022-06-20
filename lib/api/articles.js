import { Client } from '../apollo';
import { gql } from '@apollo/client';

const batchLimit = 200;

export const getArticlePaths = async () => {
  try {
    const res = await Client.query({
      query: gql`
        query getArticleSlugs {
          posts(first: 100) {
            edges {
              node {
                slug
                uri
                author {
                  node {
                    nicename
                  }
                }
              }
            }
          }
        }
      `,
    });
    const paths = res.data.posts.edges.map(({ node: post }) => {
      const path = {
        params: {
          article: post.slug,
          author: post.author.node.nicename,
        },
      };
      return path;
    });
    return paths;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getArticles = async () => {
  try {
    let hasNextPage = true;
    let currentCursor = '';
    let array = [];

    while (hasNextPage) {
      const req = await Client.query({
        query: gql`
          query getMoreArticles($batch: Int!, $cursor: String!) {
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
                  featuredImage {
                    node {
                      mediaItemUrl
                      altText
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          batch: batchLimit,
          cursor: currentCursor,
        },
      });

      array.push(...req.data.posts.edges);
      hasNextPage = req.data.posts.pageInfo.hasNextPage;
      currentCursor = req.data.posts.pageInfo.endCursor;
    }

    return array;
  } catch (error) {
    console.log('ERROR getArticles =>', error);
    return;
  }
};

export const getArticle = async (slug) => {
  try {
    const res = await Client.query({
      query: gql`
        query getArticle($slug: String!) {
          postBy(slug: $slug) {
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
                nicename
                name
                firstName
                acf_user {
                  bild {
                    mediaItemUrl
                    altText
                  }
                  kortBeskrivning
                }
              }
            }
          }
        }
      `,
      variables: {
        slug,
      },
    });

    return res.data.postBy;
  } catch (error) {
    console.log(error);
    return;
  }
};
