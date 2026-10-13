import { graphql } from "@/lib/wp/gql";

// Body shared by the published post and its draft preview, so both render
// through PostTemplate with the same shape.
export const PostBodyFieldsFragment = graphql(`
  fragment PostBodyFields on Post {
    acf_posts {
      ingress
      lasMer {
        ... on Post {
          __typename
          uri
          ...PostCardFields
          author {
            node {
              nicename
            }
          }
        }
        ... on Grape {
          __typename
          id
          title
          slug
          uri
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
        ... on Recipe {
          __typename
          id
          title
          slug
          uri
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
        ... on Page {
          __typename
          id
          title
          slug
          uri
          author {
            node {
              name
            }
          }
          featuredImage {
            node {
              ...ImageFields
            }
          }
        }
      }
      sektioner {
        ... on Post_AcfPosts_Sektioner_ExtraPuff {
          fieldGroupName
          extraPuff {
            ... on Drinktip {
              __typename
              title
              slug
              uri
              featuredImage {
                node {
                  ...ImageFields
                }
              }
              acf_dryckestips {
                dryckestyper
                forpackningar
              }
            }
            ... on Grape {
              __typename
              title
              slug
              uri
              acf_grape {
                kortBeskrivning
              }
              featuredImage {
                node {
                  ...ImageFields
                }
              }
            }
            ... on Drink {
              __typename
              title
              slug
              uri
              drinkTypes {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  ...ImageFields
                }
              }
            }
            ... on Recipe {
              __typename
              title
              slug
              uri
              acf_recipe {
                desc
              }
              passarTills {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  ...ImageFields
                }
              }
            }
          }
        }
        ... on Post_AcfPosts_Sektioner_Video {
          fieldGroupName
          url
        }
        ... on Post_AcfPosts_Sektioner_Brodtext {
          text
          fieldGroupName
        }
        ... on Post_AcfPosts_Sektioner_Citat {
          fieldGroupName
          text
        }
        ... on Post_AcfPosts_Sektioner_Mellanbild {
          fieldGroupName
          iGalleri
          img {
            ...ImageFields
          }
        }
        ... on Post_AcfPosts_Sektioner_StorBild {
          fieldGroupName
          iGalleri
          img {
            ...ImageFields
          }
        }
        ... on Post_AcfPosts_Sektioner_Faktalada {
          text
          fieldGroupName
        }
      }
    }
    featuredImage {
      node {
        ...ImageFields
      }
    }
    author {
      node {
        ...AuthorFields
      }
    }
  }
`);

export const PostQuery = graphql(`
  query Post($id: ID!) {
    post(idType: URI, id: $id) {
      title
      slug
      uri
      content
      modifiedGmt: dateGmt
      seo {
        ...SeoFields
      }
      acf_oldcontent {
        oldContentAcf
      }
      ...PostBodyFields
    }
  }
`);

export const PreviewPostFieldsFragment = graphql(`
  fragment PreviewPostFields on Post {
    title
    slug
    uri
    modifiedGmt
    ...PostBodyFields
  }
`);

export const PreviewPostQuery = graphql(`
  query PreviewPost($id: ID!) {
    post(idType: DATABASE_ID, id: $id) {
      ...PreviewPostFields
      preview {
        node {
          ...PreviewPostFields
        }
      }
    }
  }
`);

export const PostsQuery = graphql(`
  query Posts(
    $after: String
    $before: String
    $search: String
    $first: Int
    $last: Int
    $authorNotIn: [ID] = [50]
    $year: Int
    $authorName: String
  ) {
    posts(
      first: $first
      last: $last
      after: $after
      before: $before
      where: {
        search: $search
        authorNotIn: $authorNotIn
        authorName: $authorName
        dateQuery: { year: $year }
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        total
        startCursor
      }
      edges {
        node {
          ...PostCardFields
        }
      }
    }
  }
`);

export const PostPathsQuery = graphql(`
  query PostPaths {
    posts {
      nodes {
        slug
        author {
          node {
            slug
          }
        }
      }
    }
  }
`);

export const SchoolPostFieldsFragment = graphql(`
  fragment SchoolPostFields on ContentNode {
    __typename
    id
    uri
    slug
    modifiedGmt
  }
`);

export const SchoolPostsQuery = graphql(`
  query SchoolPosts($id: ID!) {
    page(id: $id, idType: URI) {
      acf_overviewPage {
        sidor {
          ... on Post {
            ...SchoolPostFields
            title
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
                ...ImageFields
              }
            }
          }
          ... on Page {
            ...SchoolPostFields
            title
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
                ...ImageFields
              }
            }
          }
        }
      }
    }
  }
`);
