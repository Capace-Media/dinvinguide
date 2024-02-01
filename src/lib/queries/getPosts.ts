import { getErrorMessage } from "../utils/getErrorMessage";
import WP from "../wp";
import { POSTS } from "./fragments/Posts";

export const getPosts = async () => {
  try {
    const res = await WP(`query getPosts {
         ${POSTS}
         page(id: "/", idType: URI) {
          GQL_frontPageFields {
            highlightedArticles {
              ... on Post {
                id
                title
                uri
                modifiedGmt
                acf_posts {
                  ingress
                }
                author {
                  node {
                    name
                  }
                }
                featuredImage {
                  node {
                    altText
                    mediaItemUrl
                    mediaDetails {
                      width
                      height
                    }
                    title
                    sizes(size: THUMBNAIL)
                  }
                }
              }
            }
          }
        }
          }`);

    const data = res.data;
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: getErrorMessage(error),
    };
  }
};
