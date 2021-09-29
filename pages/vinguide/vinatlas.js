import GuideLayout from '../../components/layout/GuideLayout';
import { fetchOverviewPage } from '../../lib/api/pages/pageData';
import ReactHtmlParser from 'react-html-parser';
import AtlasList from '../../components/atlas/AtlasList';

const VinAtlasPage = ({ page }) => {
  return (
    <GuideLayout>
      <div className='text-center contain row'>
        <h1 className='mb-5 text-brand-red'>{page.title}</h1>
        <p>{ReactHtmlParser(page.acf_overviewPage.ingress)}</p>
      </div>
      <AtlasList posts={page.acf_overviewPage.sidor} />
    </GuideLayout>
  );
};

export default VinAtlasPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([fetchOverviewPage('vinguide/vinatlas')]);
  return {
    props: {
      page: resolved[0],
    },
  };
};
