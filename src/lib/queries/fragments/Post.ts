export const POST = ` title
slug
uri
modifiedGmt
acf_posts {
  ingress
  lasMer {
    ... on Post {
      id
      title
      slug
      uri
      modifiedGmt
      acf_posts {
        ingress
      }
      author {
        node {
          name
          nicename
        }
      }
      featuredImage {
        node {
          mediaItemUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
    ... on Grape {
      id
      title
      slug
      uri
      featuredImage {
        node {
          mediaItemUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
    ... on Recipe {
      id
      title
      slug
      uri
      featuredImage {
        node {
          mediaItemUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }

    ... on Page {
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
          mediaItemUrl
          mediaDetails {
            width
            height
          }
          altText
        }
      }
    }
  }
  sektioner {
    ... on Post_AcfPosts_Sektioner_ExtraPuff {
      fieldGroupName
      extraPuff {
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
              mediaItemUrl
              mediaDetails {
                width
                height
              }
              altText
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
              mediaItemUrl
              mediaDetails {
                width
                height
              }
              altText
            }
          }
        }
        ... on Recipe {
          __typename
          title
          slug
          uri
          passarTills {
            edges {
              node {
                name
              }
            }
          }
          featuredImage {
            node {
              mediaItemUrl
              mediaDetails {
                width
                height
              }
              altText
            }
          }
        }
      }
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
        mediaItemUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    ... on Post_AcfPosts_Sektioner_StorBild {
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
    ... on Post_AcfPosts_Sektioner_Faktalada {
      text
      fieldGroupName
    }
  }
}
featuredImage {
  node {
    mediaItemUrl
    mediaDetails {
      width
      height
    }
    altText
    
  }
}
author {
  node {
    username
    nicename
    slug
    name
    description
    acf_user {
      email
      facebook
      instagram
      kortBeskrivning
      bild {
        altText
        mediaItemUrl
        mediaDetails {
          width
          height
        }
      }
    }
  }
}`;
