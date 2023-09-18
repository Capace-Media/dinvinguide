import WP from "../wp";

export const getAuthors = async () => {
  try {
    const res = await WP(`query getAllAuthors {
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
          }`);

    const users = res.data.acfOptionsSkribenter.acf_skribenter;
    return users;
  } catch (error) {
    console.error(error);
    return;
  }
};
