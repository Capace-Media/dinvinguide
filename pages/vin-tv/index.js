import { EPISODES, OPTIONS_TV, PLAYLISTS } from '../../lib/fragments/tv';

import GuideLayout from '../../components/layout/GuideLayout';
import PageIntro from '../../components/common/content/PageIntro';
import Playlists from '../../components/vin-tv/Playlists';
import wpFetch from '../../lib/wpFetch';

const TVPage = ({ page, episodes, playlists }) => {
  return (
    <GuideLayout>
      <PageIntro title={page.vintvTitle} text={page.vintvIngress} />
      <Playlists playlists={playlists} />
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
