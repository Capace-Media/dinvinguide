import '../styles/globals.css';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import Layout from '../components/layout/layout';

export const reportWebVitals = (metric) => {
  console.log(metric);
};

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <DefaultSeo
        titleTemplate='%s DinVinguide'
        defaultTitle='DinVinguide - Din guide om vin'
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
