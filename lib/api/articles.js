import { Client } from '../apollo';
import { gql } from '@apollo/client';

export const getArticlePaths = async () => {
  try {
    const res = await Client.query({
      query: gql`
        query getArticleSlugs {
          posts(first: 100) {
            edges {
              node {
                slug
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
    console.log(res);
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

export const getArticle = async (slug) => {
  try {
    const res = await Client.query({
      query: gql`
        query getArticle($slug: String!) {
          postBy(slug: $slug) {
            title
            acf_posts {
              ingress
              sektioner {
                ... on Post_AcfPosts_Sektioner_ExtraPuff {
                  fieldGroupName
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
                }
                ... on Post_AcfPosts_Sektioner_StorBild {
                  fieldGroupName
                  iGalleri
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
                acf_user {
                  bild {
                    mediaItemUrl
                  }
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
    console.log(res);

    return res.data.postBy;
  } catch (error) {
    console.log(error);
    return;
  }
};
