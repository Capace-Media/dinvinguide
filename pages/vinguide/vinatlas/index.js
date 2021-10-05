import AtlasList from '../../../components/atlas/AtlasList';
import GuideLayout from '../../../components/layout/GuideLayout';
import List from '../../../components/common/lists/List';
import PageIntro from '../../../components/common/PageIntro';
import ReactHtmlParser from 'react-html-parser';
import { fetchOverviewPage } from '../../../lib/api/pages/pageData';
import { getAds } from '../../../lib/api/ads';

const VinAtlasPage = ({ page, ads }) => {
  return (
    <>
      <GuideLayout>
        <PageIntro
          ads={ads}
          title={page.title}
          text={page.acf_overviewPage.ingress}
        />
        <List array={page.acf_overviewPage.sidor} />
      </GuideLayout>
    </>
  );
};

export default VinAtlasPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([
    fetchOverviewPage('vinguide/vinatlas'),
    getAds(),
  ]);
  return {
    props: {
      page: resolved[0],
      ads: resolved[1],
    },
  };
};
