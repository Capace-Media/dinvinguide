import { useEffect, useState } from "react";
import {
  OPTIONS_TV,
  PLAYLISTPATHS,
  PLAYLIST_SINGLE,
} from "../../../lib/fragments/tv";

import BreadCrumbs from "../../../components/common/BreadCrumbs/Breadcrumbs";
import PageIntro from "../../../components/common/content/PageIntro";
import GuideLayout from "../../../components/layout/GuideLayout";
import EpisodesList from "../../../components/vin-tv/EpisodesList";
import Player from "../../../components/vin-tv/Player";
import { Client } from "../../../lib/apollo";
import wpFetch from "../../../lib/wpFetch";

const PlaylistPage = ({ playlist, settings }) => {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const handlePlaylist = (episodeIndex) => {
    if (episodeIndex !== null) {
      setPlayerOpen(true);
      setCurrentEpisodeIndex(episodeIndex);
    } else {
      setPlayerOpen(false);
    }
  };
  useEffect(() => {
    if (playerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [playerOpen]);
  return (
    <>
      <GuideLayout>
        <BreadCrumbs
          crumbs={[
            { text: "Guide", href: "/guide" },
            { text: "Vin TV", href: "/vin-tv" },
            {
              current: true,
              text: playlist.name,
              href: "/vin-tv/spellista/" + playlist.slug,
            },
          ]}
        />

        <PageIntro type="Spellista" title={playlist.name} />
        <EpisodesList
          handlePlaylist={handlePlaylist}
          episodes={playlist.episodes.edges}
        />
      </GuideLayout>
      {playerOpen && (
        <Player
          handlePlaylist={handlePlaylist}
          currentEpisode={currentEpisodeIndex}
          playlist={playlist}
          settings={settings}
        />
      )}
    </>
  );
};

export default PlaylistPage;

export const getStaticPaths = async () => {
  const { data } = await Client.query({ query: PLAYLISTPATHS });

  const playlistPaths = [];

  data?.playlists?.nodes &&
    data?.playlists?.nodes?.map((playlist) => {
      if (playlist?.slug) {
        playlistPaths.push({ params: { playlist: playlist?.slug } });
      }
    });

  console.log("playlistPaths====>", playlistPaths);

  return {
    paths: playlistPaths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.playlist;
  console.log("the id????", id);
  const resolved = await Promise.all([
    wpFetch(PLAYLIST_SINGLE, { id: id }),
    wpFetch(OPTIONS_TV),
  ]);

  return {
    props: {
      playlist: resolved[0].playlist,
      settings: resolved[1].acfOptionsInstallningarTv.tvOptionsPage,
    },
  };
};
