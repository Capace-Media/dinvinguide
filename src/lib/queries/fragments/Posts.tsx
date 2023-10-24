export const POSTS = `
posts(first: 8) {
    nodes {
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
          title
          sizes(size: THUMBNAIL)
        }
      }
    }
  }
`;
