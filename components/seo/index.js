import { NextSeo } from "next-seo";
import PropTypes from "prop-types";

const Seo = ({ seo, uri, desc }) => {
  const {
    title,
    metaDesc,
    metaRobotsNoindex,
    metaRobotsNofollow,
    opengraphDescription,
    opengraphTitle,
    opengraphImage,
    opengraphSiteName,
  } = seo;

  const noIndex = (index) => {
    if (index === "index") {
      return false;
    } else {
      return true;
    }
  };

  const noFollow = (follow) => {
    if (follow === "follow") {
      return false;
    } else {
      return true;
    }
  };

  const currentLocation = process.browser ? window.location.origin : null;
  const opengraphUrl =
    (process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
      ? process.env.NEXT_PUBLIC_NEXTJS_SITE_URL
      : currentLocation) + uri;
  return (
    <NextSeo
      title={title}
      description={
        opengraphDescription ? opengraphDescription : metaDesc ? metaDesc : desc
      }
      canonical={opengraphUrl}
      noindex={noIndex(metaRobotsNoindex)}
      nofollow={noFollow(metaRobotsNofollow)}
      openGraph={{
        type: "website",
        locale: "en_US",
        url: opengraphUrl,
        title: opengraphTitle,
        description: opengraphDescription,
        images: [
          {
            url: opengraphImage?.sourceUrl,
            width: 1280,
            height: 720,
          },
        ],
        /* eslint-disable */
        site_name: opengraphSiteName,
        /* eslint-enable */
      }}
      twitter={{
        handle: "@dinvinguide",
        site: "@dinvinguide",
        cardType: "summary_large_image",
      }}
    />
  );
};

Seo.propTypes = {
  seo: PropTypes.object,
};

Seo.defaultProps = {
  seo: {
    canonical: "",
    title: "",
    metaDesc: "",
    metaRobotsNoindex: "",
    metaRobotsNofollow: "",
    opengraphDescription: "",
    opengraphTitle: "",
    opengraphImage: {
      sourceUrl: "",
    },
    opengraphUrl: "",
    opengraphSiteName: "",
  },
};

export default Seo;
