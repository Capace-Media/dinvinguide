import Ad from '../../components/ads/Ad';
import { GRAPES } from '../../lib/fragments/grapes';
import GuideLayout from '../../components/layout/GuideLayout';
import List from '../../components/common/lists/List';
import { NextSeo } from 'next-seo';
import { PAGE_EXPLORER } from '../../lib/fragments/pages';
import PageIntro from '../../components/common/content/PageIntro';
import flattenObject from '../../utils/flattenObject';
import { getAds } from '../../lib/api/ads';
import wpFetch from '../../lib/wpFetch';

const DruvguidenPage = ({ ads, grapes, page }) => {
  page = flattenObject(page);

  return (
    <>
      <NextSeo title='Druvguiden' />
      <GuideLayout>
        <PageIntro
          ads={ads}
          title={page.title}
          text={page['acf_explorer.slogan']}
          crumbs={[
            { text: 'Guider', href: '/guide' },
            { current: true, text: page.title, href: page.uri },
          ]}
        />
        <List
          array={grapes}
          subtitle='acf_grape.druvtyp.name'
          filterKeys={['title', 'acf_grape.druvtyp.name']}
          ads={ads}
        />
      </GuideLayout>
    </>
  );
};

export default DruvguidenPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([
    getAds(),
    wpFetch(GRAPES, { batch: 200, type: 'grapes' }),
    wpFetch(PAGE_EXPLORER, { id: 'druvguiden' }),
  ]);
  const grapes = resolved[1].map(({ node: grape }) => grape);
  return {
    props: {
      ads: resolved[0],
      grapes,
      page: resolved[2].page,
    },
  };
};
