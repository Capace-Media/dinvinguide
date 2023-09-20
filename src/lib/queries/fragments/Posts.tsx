export const POSTS = `
posts(first: 8) {
    nodes {
      title
      author {
        node {
          uri
          name
        }
      }
      acf_posts {
        ingress
      }
      date
    }
  }
`;
