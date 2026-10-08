import { graphql } from "@/lib/wp/gql";

// Fragments shared by several domains. Codegen inlines them into every
// document that spreads them, so a query only lists what it reads.

export const ImageFieldsFragment = graphql(`
  fragment ImageFields on MediaItem {
    altText
    mediaItemUrl
    mediaDetails {
      width
      height
    }
  }
`);

export const SeoFieldsFragment = graphql(`
  fragment SeoFields on PostTypeSEO {
    breadcrumbs {
      text
      url
    }
    canonical
    cornerstone
    focuskw
    metaDesc
    metaKeywords
    metaRobotsNofollow
    metaRobotsNoindex
    opengraphAuthor
    opengraphDescription
    opengraphImage {
      altText
      mediaItemUrl
    }
    opengraphModifiedTime
    opengraphPublishedTime
    opengraphPublisher
    opengraphSiteName
    opengraphTitle
    opengraphType
    opengraphUrl
    readingTime
    title
    twitterDescription
    twitterImage {
      altText
      mediaItemUrl
    }
    twitterTitle
  }
`);

export const TaxonomySeoFieldsFragment = graphql(`
  fragment TaxonomySeoFields on TaxonomySEO {
    breadcrumbs {
      text
      url
    }
    canonical
    cornerstone
    focuskw
    metaDesc
    metaKeywords
    metaRobotsNofollow
    metaRobotsNoindex
    opengraphAuthor
    opengraphDescription
    opengraphImage {
      altText
      mediaItemUrl
    }
    opengraphModifiedTime
    opengraphPublishedTime
    opengraphPublisher
    opengraphSiteName
    opengraphTitle
    opengraphType
    opengraphUrl
    title
    twitterDescription
    twitterImage {
      altText
      mediaItemUrl
    }
    twitterTitle
  }
`);

export const PostCardFieldsFragment = graphql(`
  fragment PostCardFields on Post {
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
        ...ImageFields
      }
    }
  }
`);
