import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";

export const getAuthors = async () => {
  try {
    const res = await WP(`query getAllAuthors {
            acfOptionsSkribenter {
              acf_skribenter {
                skribenter {
                  name
                  slug
                  id
                  description
                  posts(first: 4) {
                    nodes {
                      title
                      slug
                      uri
                      id
                      modifiedGmt
                      author {
                        node {
                          name
                        }
                      }
                      acf_posts {
                        ingress
                      }
                      featuredImage {
                        node {
                          mediaItemUrl
                          mediaDetails {
                            width
                            height
                          }
                          altText
                          title
                          
                        }
                      }
                    }
                  }
                  acf_user {
                    bildExtra {
                      altText
                      mediaItemUrl
                       mediaDetails {
                        width
                        height
                      }
                      title
                    }
                    instagram
                    facebook
                    twitter
                    email
                    bild {
                      mediaItemUrl
                      mediaDetails {
                        width
                        height
                      }
                      altText
                      title
                    }
                  }
                }
                medarbetare {
                  name
                  slug
                  id
                  description
                  posts(first: 4) {
                    nodes {
                      title
                      slug
                      uri
                      id
                      modifiedGmt
                      author {
                        node {
                          name
                        }
                      }
                      acf_posts {
                        ingress
                      }
                      featuredImage {
                        node {
                          mediaItemUrl
                          mediaDetails {
                            width
                            height
                          }
                          altText
                          title
                  
                        }
                      }
                    }
                  }
                  acf_user {
                    instagram
                    facebook
                    twitter
                    email
                    kortBeskrivning
                    bild {
                      mediaItemUrl
                      mediaDetails {
                        width
                        height
                      }
                      altText
                      title
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
    return {
      message: getErrorMessage(error),
    };
  }
};
