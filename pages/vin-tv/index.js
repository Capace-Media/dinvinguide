import { EPISODES, OPTIONS_TV, PLAYLISTS } from "../../lib/fragments/tv";

import PageIntro from "../../components/common/content/PageIntro";
import GuideLayout from "../../components/layout/GuideLayout";
import Playlists from "../../components/vin-tv/Playlists";
import Videos from "../../components/vin-tv/Videos";
import { getAds } from "../../lib/api/ads";
import wpFetch from "../../lib/wpFetch";

const TVPage = ({ page, episodes, playlists, ads }) => {
  //console.log("page ===>", page);
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
    wpFetch(EPISODES, { batch: 10, type: "episodes" }),
    wpFetch(PLAYLISTS, { batch: 10, type: "playlists" }),
  ]);
  // if (!resolved) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      page: resolved[0].acfOptionsInstallningarTv.tvOptionsPage,
      episodes: resolved[1],
      playlists: resolved[2],
    },
  };
};
