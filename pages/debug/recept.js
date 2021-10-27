import DebugList from '../../components/debug/DebugList';
import DebugNav from '../../components/debug/DebugNav';
import { RECIPES } from '../../lib/fragments/recipes';
import wpFetch from '../../lib/wpFetch';

const DebugPage = ({ recipes }) => {
  return (
    <>
      <DebugNav />
      <DebugList array={recipes} type='recipes' />
    </>
  );
};

export default DebugPage;
export const getStaticProps = async () => {
  try {
    const data = await wpFetch(RECIPES, { batch: 200, type: 'recipes' });
    const recipes = data.map((item) => item.node);

    return {
      props: {
        recipes: recipes,
      },
    };
  } catch (error) {}
};
