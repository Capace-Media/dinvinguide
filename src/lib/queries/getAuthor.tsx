import WP from "../wp";

export const getAuthor = async (id: string) => {
  try {
    const res = await WP(
      `query getAuthor($id: ID!) {
        user(id: $id, idType: USERNAME) {
          username
          name
          description
          acf_user {
            email
            extratitel
            facebook
            instagram
            kortBeskrivning
            twitter
            bildExtra {
              altText
              mediaItemUrl
              title
            }
            bild {
              altText
              title
              mediaItemUrl
            }
          }
          posts {
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
          
        }
      }`,
      { id }
    );

    const users = res.data.user;
    return users;
  } catch (error) {
    console.error(error);
    return;
  }
};
