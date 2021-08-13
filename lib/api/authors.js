import { Client } from '../apollo';
import { gql } from '@apollo/client';

export const getAuthorPaths = async (role) => {
  try {
    const res = await Client.query({
      query: gql`
        query getAllAuthurSlugs {
          users {
            edges {
              node {
                nicename

                slug
                roles {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    const users = res.data.users.edges;
    if (!role) {
      return users.map(({ node: user }) => {
        return { params: { author: user.slug } };
      });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return;
    }
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
        user: nicename,
      },
    });

    const user = res.data.users.edges[0].node;
    console.log(user);
    const author = {
      name: user.name,
      firstName: user.firstName,
      image: user.acf_user.bild.mediaItemUrl,
      description: user.description,
    };
    return author;
  } catch (error) {
    console.log(error);
    return;
  }
};
