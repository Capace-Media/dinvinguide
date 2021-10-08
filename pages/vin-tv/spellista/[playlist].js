import { OPTIONS_TV, PLAYLIST_SINGLE } from '../../../lib/fragments/tv';
import { useEffect, useState } from 'react';

import BreadCrumbs from '../../../components/common/BreadCrumbs/Breadcrumbs';
import EpisodesList from '../../../components/vin-tv/EpisodesList';
import GuideLayout from '../../../components/layout/GuideLayout';
import PageIntro from '../../../components/common/content/PageIntro';
import PlaylistPlayer from '../../../components/vin-tv/PlaylistPlayer';
import wpFetch from '../../../lib/wpFetch';

const PlaylistPage = ({ playlist, settings }) => {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);

  const handlePlaylist = (episodeIndex) => {
    if (episodeIndex !== null) {
      console.log(episodeIndex);
      setPlayerOpen(true);
      setCurrentEpisodeIndex(episodeIndex);
    } else {
      setPlayerOpen(false);
    }
  };
  useEffect(() => {
    if (playerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [playerOpen]);
  return (
    <>
      <GuideLayout>
        <BreadCrumbs
          crumbs={[
            { text: 'Guide', href: '/guide' },
            { text: 'Vin TV', href: '/vin-tv' },
            {
              current: true,
              text: playlist.name,
              href: '/vin-tv/spellista/' + playlist.slug,
            },
          ]}
        />

        <PageIntro
          type='Spellista'
          title={playlist.name}
          text={playlist.acf_tvSpellistor.desc}
        />
        <EpisodesList
          handlePlaylist={handlePlaylist}
          episodes={playlist.episodes.edges}
        />
      </GuideLayout>
      {playerOpen && (
        <PlaylistPlayer
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
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.playlist;
  console.log(id);
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
