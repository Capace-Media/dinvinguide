import { gql } from '@apollo/client';

export const OPTIONS_TV = gql`
  query getTvOptions {
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
  }
`;

export const EPISODES = gql`
  query fetchAllEpisodes($batch: Int!, $cursor: String!) {
    episodes(first: $batch, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          title
          acf_episode {
            thumbnail
            videoId
          }
        }
      }
    }
  }
`;

export const PLAYLISTS = gql`
  query fetchAllPlaylists($batch: Int!, $cursor: String!) {
    playlists(first: $batch, after: $cursor) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          name
          slug
          acf_tvSpellistor {
            thumbnail
            desc
            playlistId
          }
          episodes {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const PLAYLIST_SINGLE = gql`
  query fetchPlaylist($id: ID!) {
    playlist(idType: SLUG, id: $id) {
      name
      slug
      episodes {
        edges {
          node {
            id
            title
            acf_episode {
              thumbnail
              beskrivning
              videoId
            }
          }
        }
      }
      acf_tvSpellistor {
        desc
      }
    }
  }
`;
