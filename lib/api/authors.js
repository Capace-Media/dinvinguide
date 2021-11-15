import { Client } from '../apollo';
import { gql } from '@apollo/client';

const batchSize = 200;

export const getAuthorPaths = async () => {
  try {
    const res = await Client.query({
      query: gql`
        query getAllAuthors {
          acfOptionsSkribenter {
            acf_skribenter {
              skribenter {
                slug
              }
            }
          }
        }
      `,
    });
    const users = res.data.acfOptionsSkribenter.acf_skribenter.skribenter;
    const paths = users.map((author) => {
      return { params: { author: author.slug } };
    });
    paths.push({ params: { author: 'nordefors' } });
    paths.push({ params: { author: 'eva' } });
    paths.push({ params: { author: 'maja' } });
    paths.push({ params: { author: 'anetterosvall' } });

    return paths;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getAuthorData = async (nicename) => {
  try {
    const res = await Client.query({
      query: gql`
        query getAuthorData($user: String!) {
          users(where: { nicename: $user }) {
            edges {
              node {
                nicename
                name
                firstName
                description
                acf_user {
                  facebook
                  instagram
                  twitter
                  email
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
            }
          }
        }
      `,
      variables: {
        user: nicename,
      },
    });

    const author = res.data.users.edges[0].node;
    return author;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getPostsByAuthor = async (nicename) => {
  try {
    let hasNextPage = true;
    let currentCursor = '';
    let array = [];
    while (hasNextPage) {
      const res = await Client.query({
        query: gql`
          query getAuthorData(
            $user: String!
            $cursor: String!
            $batchSize: Int!
          ) {
            posts(
              first: $batchSize
              where: { authorName: $user }
              after: $cursor
            ) {
              pageInfo {
                endCursor
                hasNextPage
              }
              edges {
                node {
                  title
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
            }
          }
        `,
        variables: {
          user: nicename,
          cursor: currentCursor,
          batchSize,
        },
      });
      array.push(...res.data.posts.edges);
      hasNextPage = res.data.posts.pageInfo.hasNextPage;
      currentCursor = res.data.posts.pageInfo.endCursor;
      console.log(
        'AUTHOR POSTS BATCH =>',
        hasNextPage,
        currentCursor,
        res.data.posts.edges.length
      );
    }
    console.log('FETCHED AUTHOR POSTS =>', array.length);
    return array;
  } catch (error) {
    console.log('getPostsByAuthor ERROR =>', error);
    return;
  }
};

export const getAuthors = async () => {
  try {
    const res = await Client.query({
      query: gql`
        query getAllAuthors {
          acfOptionsSkribenter {
            acf_skribenter {
              skribenter {
                name
                slug
                description
                acf_user {
                  instagram
                  facebook
                  twitter
                  email
                  bild {
                    mediaItemUrl
                  }
                }
              }
              medarbetare {
                name
                slug
                description
                acf_user {
                  instagram
                  facebook
                  twitter
                  email
                  kortBeskrivning
                  bild {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
      `,
    });
    const users = res.data.acfOptionsSkribenter.acf_skribenter;
    return users;
  } catch (error) {
    console.log(error);
    return;
  }
};
