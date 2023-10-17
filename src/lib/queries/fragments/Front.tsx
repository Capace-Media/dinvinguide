import { SEO } from "./Seo";

export const FRONT = `
page(id: "/", idType: URI) {
    GQL_frontPageFields {
      heroBild {
        altText
        mediaItemUrl
        id
      }
    }
    content
    ${SEO}
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
  }
`;
