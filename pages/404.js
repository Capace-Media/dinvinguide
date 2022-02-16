import ExplorerLinks from '../components/common/explorer/explorerLinks';
import PageIntro from '../components/common/content/PageIntro';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined && window) {
      const w = window;
      const dl = (w.dataLayer = w.dataLayer || []);
      dl.push({
        event: 'page_not_found',
        path: router.asPath,
      });
    }
  }, [router.asPath]);
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
