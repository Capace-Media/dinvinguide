export const POSTS_CONTENT = `
    id
    title
    slug
    modifiedGmt: dateGmt
    acf_posts {
      ingress
    }
    author {
      node {
        name
        slug
      }
    }
    featuredImage {
      node {
        altText
        mediaDetails {
          width
          height
        }
        mediaItemUrl
      }
    }
`;

export const POSTS = `
query POSTS($after: String, $before: String, $search: String, $first: Int, $last: Int, $authorNotIn: [ID] = [50], $year: Int, $authorName: String) {
  posts(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { search: $search, authorNotIn: $authorNotIn, authorName: $authorName, dateQuery: {year: $year}}
    )  {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      total
      startCursor
    }
    edges {
      node {
        ${POSTS_CONTENT}
      }
    }
  }
}
`;

export const HIGHLIGHTED_POSTS = `
query getHighlightedPosts {
    posts(first: 8, where: {authorNotIn: [50]}) {
      nodes {
        ${POSTS_CONTENT}
      }
    }
    page(id: "/", idType: URI) {
      GQL_frontPageFields {
        highlightedArticles {
          ... on Post {
            ${POSTS_CONTENT}
          }
        }
      }
    }
  }
`;
