import { gql } from '@apollo/client';

export const PAGE_SLUGCHECK = gql`
  query checkPageSlug($id: ID!) {
    page(idType: URI, id: $id) {
      uri
    }
  }
`;
export const PAGE_TEMPLATECHECK = gql`
  query checkPageTemplate($id: ID!) {
    page(idType: URI, id: $id) {
      template {
        templateName
      }
    }
  }
`;
export const PAGE_OVERVIEW = gql`
  query fetchOverviewPage($id: ID!) {
    page(idType: URI, id: $id) {
      seo {
        title
        metaDesc
        breadcrumbs {
          url
          text
        }
      }
      title
      uri
      id
      acf_overviewPage {
        ingress
        sidor {
          ... on Post {
            id
            uri
            title
            featuredImage {
              node {
                mediaItemUrl
                altText
              }
            }
          }
          ... on Page {
            id
            uri
            title
            featuredImage {
              node {
                mediaItemUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;
export const PAGE_OVERVIEW_PREVIEW = gql`
  query fetchOverviewPagePreview($id: ID!) {
    page(idType: URI, id: $id) {
      preview {
        node {
          seo {
            title
            metaDesc
            breadcrumbs {
              url
              text
            }
          }
          title
          uri
          id
          acf_overviewPage {
            ingress
            sidor {
              ... on Post {
                id
                uri
                title
                featuredImage {
                  node {
                    mediaItemUrl
                    altText
                  }
                }
              }
              ... on Page {
                id
                uri
                title
                featuredImage {
                  node {
                    mediaItemUrl
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_EXPLORER = gql`
  query fetchExplorerPage($id: ID!) {
    page(idType: URI, id: $id) {
      seo {
        title
        metaDesc
        breadcrumbs {
          url
          text
        }
      }
      title
      uri
      acf_explorer {
        slogan
        singular
        plural
        bkgResults {
          mediaItemUrl
          altText
        }
      }
    }
  }
`;
export const PAGE_EXPLORER_PREVIEW = gql`
  query fetchExplorerPage($id: ID!) {
    page(idType: URI, id: $id) {
      preview {
        node {
          seo {
            title
            metaDesc
            breadcrumbs {
              url
              text
            }
          }
          title
          uri
          acf_explorer {
            slogan
            singular
            plural
            bkgResults {
              mediaItemUrl
              altText
            }
          }
        }
      }
    }
  }
`;

export const PAGE_SINGLE = gql`
  query fetchPage($id: ID!) {
    page(idType: URI, id: $id) {
      seo {
        title
        metaDesc
        breadcrumbs {
          url
          text
        }
      }
      title
      content
      date
      uri
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
      author {
        node {
          nicename
          name
        }
      }
      acf_oldcontent {
        oldContentAcf
      }
      acf_posts {
        ingress
        sektioner {
          ... on Page_AcfPosts_Sektioner_Brodtext {
            fieldGroupName
            text
          }
          ... on Page_AcfPosts_Sektioner_Faktalada {
            text
            fieldGroupName
          }
          ... on Page_AcfPosts_Sektioner_Mellanbild {
            fieldGroupName
            iGalleri
            img {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          ... on Page_AcfPosts_Sektioner_StorBild {
            fieldGroupName
            iGalleri
            img {
              mediaItemUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
        lasMer {
          ... on Post {
            id
            title
            uri
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
              }
            }
          }
          ... on Page {
            id
            title
            uri
            slug
            featuredImage {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGE_SINGLE_PREVIEW = gql`
  query fetchPage($id: ID!) {
    page(idType: URI, id: $id) {
      preview {
        node {
          seo {
            title
            metaDesc
            breadcrumbs {
              url
              text
            }
          }
          title
          content
          date
          author {
            node {
              name
            }
          }
          uri
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
          author {
            node {
              nicename
              name
            }
          }
          acf_oldcontent {
            oldContentAcf
          }
          acf_posts {
            ingress
            sektioner {
              ... on Page_AcfPosts_Sektioner_Brodtext {
                fieldGroupName
                text
              }
              ... on Page_AcfPosts_Sektioner_Faktalada {
                text
                fieldGroupName
              }
              ... on Page_AcfPosts_Sektioner_Mellanbild {
                fieldGroupName
                iGalleri
                img {
                  mediaItemUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              ... on Page_AcfPosts_Sektioner_StorBild {
                fieldGroupName
                iGalleri
                img {
                  mediaItemUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
            lasMer {
              ... on Post {
                id
                title
                uri
                slug
                featuredImage {
                  node {
                    mediaItemUrl
                    altText
                  }
                }
              }
              ... on Page {
                id
                title
                uri
                slug
                featuredImage {
                  node {
                    mediaItemUrl
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PAGES = gql`
  query fetchAllPages($batch: Int!, $cursor: String!) {
    pages(first: $batch, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          uri
          pageId
          title
          featuredImage {
            node {
              mediaItemUrl
              altText
            }
          }
          content
          acf_oldcontent {
            oldContentAcf
          }
        }
      }
    }
  }
`;
