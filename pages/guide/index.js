import ExplorerLinks from '../../components/common/explorer/explorerLinks';
import GuideLayout from '../../components/layout/GuideLayout';
import SEO from '../../components/common/SEO';
const GuidePage = () => {
  return (
    <>
      <SEO title='Guider' description='Guider på DinVinguide.' />
      <GuideLayout>
        <ExplorerLinks />
      </GuideLayout>
    </>
  );
};

export default GuidePage;
