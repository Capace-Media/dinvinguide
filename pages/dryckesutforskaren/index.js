import DrinkList from '../../components/drinks/DrinkList';
import { getDrinks } from '../../lib/api/drinks';

const DryckesUtforskarenPage = ({ drycker }) => {
  return (
    <>
      <div className='text-center contain row'>
        <h1 className='mb-5 text-brand-red'>Dryckesutforskaren</h1>
        <p>
          Här i dryckesutforskaren hittar du alla drycker som redaktionen har
          testat. Även de som inte ligger på topplistorna.
        </p>
      </div>

      <DrinkList drycker={drycker} />
    </>
  );
};

export default DryckesUtforskarenPage;

export const getStaticProps = async () => {
  const resolved = await Promise.all([getDrinks()]);
  return {
    props: {
      drycker: resolved[0],
    },
  };
};
