import { DRINKTIPS } from '../../lib/fragments/drinks';
import DebugList from '../../components/debug/DebugList';
import DebugNav from '../../components/debug/DebugNav';
import wpFetch from '../../lib/wpFetch';

const DebugPage = ({ array }) => {
  return (
    <>
      <DebugNav />
      <DebugList array={array} type='drinktips' />
    </>
  );
};

export default DebugPage;
export const getStaticProps = async () => {
  try {
    const data = await wpFetch(DRINKTIPS, { batch: 200, type: 'drinktips' });
    const array = data.map((item) => item.node);

    return {
      props: {
        array,
      },
    };
  } catch (error) {}
};
