import Ad from '../../components/ads/Ad';
import GrapeList from '../../components/grapes/GrapeList';
import GuideLayout from '../../components/layout/GuideLayout';
import List from '../../components/common/lists/List';
import { NextSeo } from 'next-seo';
import { PAGE_EXPLORER } from '../../lib/fragments/pages';
import PageIntro from '../../components/common/PageIntro';
import ReactHtmlParser from 'react-html-parser';
import { fetchGrapes } from '../../lib/api/grapes';
import flattenObject from '../../utils/flattenObject';
import { getAds } from '../../lib/api/ads';
import wpFetch from '../../lib/wpFetch';

const DruvguidenPage = ({ ads, grapes, page }) => {
  page = flattenObject(page);
  console.log(page);
  return (
    <>
      <NextSeo title='Druvguiden' />
      <GuideLayout>
        <PageIntro
          ads={ads}
          title={page.title}
          text={page['acf_explorer.slogan']}
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
    fetchGrapes(),
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
