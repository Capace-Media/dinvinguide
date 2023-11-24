import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getAuthor = async (id: string, search?: string) => {
  try {
    const res = await WP(
      `query getAuthor($id: ID!, $search: String) {
        user(id: $id, idType: USERNAME) {
          username
          name
          firstName
          description
          seo {
            metaDesc
            title
            social {
              facebook
              instagram
              linkedIn
              mySpace
              soundCloud
              pinterest
              twitter
              wikipedia
              youTube
            }
          }
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
          posts(where: {search: $search}) {
            pageInfo {
              offsetPagination {
                total
              }
            }
          }
          
        }
      }`,
      { id, search }
    );

    const users = res.data.user;
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
