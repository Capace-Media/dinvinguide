export const POSTS = `
posts(first: 8, where: {authorNotIn: [50]}) {
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
`;
