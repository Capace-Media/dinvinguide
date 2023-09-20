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
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
  }
`;
