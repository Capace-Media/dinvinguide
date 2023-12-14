import { SEO } from "./Seo";

export const FRONT = `
page(id: "/", idType: URI) {
    content
    ${SEO}
    featuredImage {
      node {
        altText
        mediaItemUrl
        mediaDetails {
          width
          height
        }
      }
    }
  }
`;
