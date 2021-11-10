import { EPISODES, OPTIONS_TV, PLAYLISTS } from '../../lib/fragments/tv';

import GuideLayout from '../../components/layout/GuideLayout';
import PageIntro from '../../components/common/content/PageIntro';
import Playlists from '../../components/vin-tv/Playlists';
import Videos from '../../components/vin-tv/Videos';
import { getAds } from '../../lib/api/ads';
import wpFetch from '../../lib/wpFetch';

const TVPage = ({ page, episodes, playlists, ads }) => {
  return (
    <GuideLayout>
      <PageIntro ad title={page.vintvTitle} text={page.vintvIngress} />
      <Playlists playlists={playlists} />
      <Videos episodes={episodes} settings={page} />
    </GuideLayout>
  );
};

export default TVPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([
    wpFetch(OPTIONS_TV),
    wpFetch(EPISODES, { batch: 200, type: 'episodes' }),
    wpFetch(PLAYLISTS, { batch: 200, type: 'playlists' }),
  ]);

  return {
    props: {
      page: resolved[0].acfOptionsInstallningarTv.tvOptionsPage,
      episodes: resolved[1],
      playlists: resolved[2],
    },
  };
};
