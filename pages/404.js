import ExplorerLinks from '../components/common/explorer/explorerLinks';
import PageIntro from '../components/common/content/PageIntro';

const Custom404 = () => {
  return (
    <>
      <PageIntro
        title='Sidan finns tyvärr inte'
        text='Denna sida finns tyvärr inte.'
      />
      <ExplorerLinks />
    </>
  );
};
export default Custom404;
