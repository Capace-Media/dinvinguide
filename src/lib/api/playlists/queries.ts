import { graphql } from "@/lib/wp/gql";

export const PlaylistQuery = graphql(`
  query Playlist($id: ID!) {
    acfOptionsInstallningarTv {
      tvOptionsPage {
        vintvTitle
        vintvIngress
        vintvBillboardBild {
          mediaItemUrl
        }
        vintvBillboardDelay
        vintvBillboardLink
        vintvBillboardLinkWindow
        vintvBillboardShow
        vintvBillboardText
      }
    }
    playlist(idType: URI, id: $id) {
      name
      slug
      description
      acf_tvSpellistor {
        thumbnail
        desc
      }
      seo {
        metaDesc
        title
        opengraphTitle
        opengraphDescription
        opengraphImage {
          mediaItemUrl
        }
      }
      episodes {
        edges {
          node {
            id
            title
            seo {
              metaDesc
              title
              opengraphTitle
              opengraphDescription
              opengraphImage {
                mediaItemUrl
              }
            }
            acf_episode {
              thumbnail
              beskrivning
              videoId
            }
          }
        }
      }
    }
  }
`);
