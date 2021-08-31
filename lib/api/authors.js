import { Client } from '../apollo';
import { gql } from '@apollo/client';

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

    return paths;
  } catch (error) {
    console.log(error);
    return;
  }
};

// export const getAuthorPaths = async (role) => {
//   try {
//     const res = await Client.query({
//       query: gql`
//         query getAllAuthurSlugs {
//           users {
//             edges {
//               node {
//                 nicename

//                 slug
//                 roles {
//                   edges {
//                     node {
//                       name
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       `,
//     });

//     const users = res.data.users.edges;
//     if (!role) {
//       return users.map(({ node: user }) => {
//         return { params: { author: user.slug } };
//       });
//     }
//   } catch (error) {
//     if (error) {
//       console.log(error);
//       return;
//     }
//   }
// };

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
                  }
                }
                posts(first: 25) {
                  edges {
                    node {
                      title
                      uri
                      featuredImage {
                        node {
                          mediaItemUrl
                        }
                      }
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
            }
          }
        }
      `,
    });
    const users = res.data.acfOptionsSkribenter.acf_skribenter.skribenter;
    console.log(users);
    return users;
  } catch (error) {
    console.log(error);
    return;
  }
};
