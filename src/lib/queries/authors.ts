import { IMAGE_CONTENT } from "./globals";
import { POSTS_CONTENT } from "./posts";

export const AUTHORS = `query AUTHORS {
            acfOptionsSkribenter {
              acf_skribenter {
                skribenter {
                  name
                  slug
                  id
                  description
                  posts(first: 4) {
                    nodes {
                      ${POSTS_CONTENT}
                    }
                  }
                  acf_user {
                    bildExtra {
                      ${IMAGE_CONTENT}
                    }
                    instagram
                    facebook
                    twitter
                    email
                    bild {
                      ${IMAGE_CONTENT}
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
                      ${POSTS_CONTENT}
                    }
                  }
                  acf_user {
                    instagram
                    facebook
                    twitter
                    email
                    kortBeskrivning
                    bild {
                      ${IMAGE_CONTENT}
                    }
                  }
                }
              }
            }
          }`;
