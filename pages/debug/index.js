import { ARTICLES } from '../../lib/fragments/articles';
import DebugList from '../../components/debug/DebugList';
import DebugNav from '../../components/debug/DebugNav';
import { NextSeo } from 'next-seo';
import wpFetch from '../../lib/wpFetch';

const DebugPage = ({ articles }) => {
  return (
    <>
      <DebugNav />
      <DebugList array={articles} type='posts' />
    </>
  );
};

export default DebugPage;
export const getStaticProps = async () => {
  try {
    const data = await wpFetch(ARTICLES, { batch: 200, type: 'posts' });
    const articles = data.map((item) => item.node);

    return {
      props: {
        articles: articles,
      },
    };
  } catch (error) {}
};
