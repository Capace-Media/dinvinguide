import { getArticles } from '../lib/api/articles';

const testPage = () => {
  return <div>Testing</div>;
};
export default testPage;

export const getStaticProps = async () => {
  const test = await getArticles();
  return {
    props: {
      data: {},
    },
  };
};
