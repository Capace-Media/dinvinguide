import "../styles/globals.css";

import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect } from "react";
import Layout from "../components/layout/layout";
import { CookieConsentProvider } from "../context/CookieConsent";
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
    <CookieConsentProvider>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        {/* Google Tag Manager - Global base code */}

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
    </CookieConsentProvider>
  );
}

export default MyApp;
