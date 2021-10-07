import GuideLayout from '../../../components/layout/GuideLayout';
import List from '../../../components/common/lists/List';
import { PAGE_OVERVIEW } from '../../../lib/fragments/pages';
import PageIntro from '../../../components/common/content/PageIntro';
import { getAds } from '../../../lib/api/ads';
import wpFetch from '../../../lib/wpFetch';

const VinAtlasPage = ({ page, ads }) => {
  return (
    <>
      <GuideLayout>
        <PageIntro
          ads={ads}
          title={page.title}
          text={page.acf_overviewPage.ingress}
          crumbs={[
            { text: 'Guider', href: '/guide' },
            { current: true, text: page.title, href: page.uri },
          ]}
        />
        <List array={page.acf_overviewPage.sidor} ads={ads} />
      </GuideLayout>
    </>
  );
};

export default VinAtlasPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([
    wpFetch(PAGE_OVERVIEW, { id: 'vinguide/vinatlas' }),
    getAds(),
  ]);
  return {
    props: {
      page: resolved[0].page,
      ads: resolved[1],
    },
  };
};
