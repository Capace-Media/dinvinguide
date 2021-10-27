import { DRINKS } from '../../lib/fragments/drinks';
import DebugList from '../../components/debug/DebugList';
import DebugNav from '../../components/debug/DebugNav';
import wpFetch from '../../lib/wpFetch';

const DebugPage = ({ array }) => {
  return (
    <>
      <DebugNav />
      <DebugList array={array} type='drinks' />
    </>
  );
};

export default DebugPage;
export const getStaticProps = async () => {
  try {
    const data = await wpFetch(DRINKS, { batch: 200, type: 'drinks' });
    const array = data.map((item) => item.node);

    return {
      props: {
        array,
      },
    };
  } catch (error) {}
};
