import "../styles/globals.css";

import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import Layout from "../components/layout/layout";
import { GTM_ID, pageview } from "../lib/gtm";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* Google Tag Manager - Global base code */}

      <Script
        id="gtag-base"
        strategy="lazyOnload"
        onError={(err) => {
          console.error("Error", err);
        }}
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      <DefaultSeo
        defaultTitle="DinVinguide - Din guide om vin"
        openGraph={{
          type: "website",
          locale: "sv_SE",
          url: "https://dinvinguide.se",
          site_name: "DinVinguide",
        }}
      />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
