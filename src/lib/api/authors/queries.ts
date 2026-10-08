import { graphql } from "@/lib/wp/gql";

export const AuthorQuery = graphql(`
  query Author($id: ID!, $search: String) {
    user(id: $id, idType: USERNAME) {
      username
      name
      firstName
      description
      seo {
        metaDesc
        title
        social {
          facebook
          instagram
          linkedIn
          mySpace
          soundCloud
          pinterest
          twitter
          wikipedia
          youTube
        }
      }
      acf_user {
        email
        extratitel
        facebook
        instagram
        kortBeskrivning
        twitter
        bildExtra {
          title
          ...ImageFields
        }
        bild {
          title
          ...ImageFields
        }
      }
      posts(where: { search: $search }) {
        pageInfo {
          total
        }
      }
    }
  }
`);

export const AuthorsQuery = graphql(`
  query Authors {
    acfOptionsSkribenter {
      acf_skribenter {
        skribenter {
          name
          slug
          id
          description
          posts(first: 4) {
            nodes {
              ...PostCardFields
            }
          }
          acf_user {
            bildExtra {
              ...ImageFields
            }
            instagram
            facebook
            twitter
            email
            bild {
              ...ImageFields
            }
          }
        }
        medarbetare {
          name
          slug
          id
          description
          posts(first: 4) {
            nodes {
              ...PostCardFields
            }
          }
          acf_user {
            instagram
            facebook
            twitter
            email
            kortBeskrivning
            bild {
              ...ImageFields
            }
          }
        }
      }
    }
  }
`);
