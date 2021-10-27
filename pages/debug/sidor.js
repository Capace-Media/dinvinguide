import DebugList from '../../components/debug/DebugList';
import DebugNav from '../../components/debug/DebugNav';
import { PAGES } from '../../lib/fragments/pages';
import wpFetch from '../../lib/wpFetch';

const DebugPage = ({ recipes }) => {
  return (
    <>
      <DebugNav />
      <DebugList array={recipes} type='pages' />
    </>
  );
};

export default DebugPage;
export const getStaticProps = async () => {
  try {
    const data = await wpFetch(PAGES, { batch: 200, type: 'pages' });
    const recipes = data.map((item) => item.node);

    return {
      props: {
        recipes: recipes,
      },
    };
  } catch (error) {}
};
