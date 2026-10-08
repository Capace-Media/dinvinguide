import { graphql } from "@/lib/wp/gql";

// Each slot reads a different ACF image for its desktop creative, so there is
// one fragment per image field, all aliased to `desktop` so every slot has the
// same shape.

export const AdImageFieldsFragment = graphql(`
  fragment AdImageFields on MediaItem {
    mediaItemUrl
    id
    altText
    mediaDetails {
      width
      height
    }
  }
`);

export const AdToppbannerFieldsFragment = graphql(`
  fragment AdToppbannerFields on Ad {
    id
    title
    acf_ads {
      link
      desktop: toppbanner {
        ...AdImageFields
      }
      mobile: mobilbanner {
        ...AdImageFields
      }
    }
  }
`);

export const AdMittenbannerFieldsFragment = graphql(`
  fragment AdMittenbannerFields on Ad {
    id
    title
    acf_ads {
      link
      desktop: mittenbanner {
        ...AdImageFields
      }
      mobile: mobilbanner {
        ...AdImageFields
      }
    }
  }
`);

export const AdSidobannerFieldsFragment = graphql(`
  fragment AdSidobannerFields on Ad {
    id
    title
    acf_ads {
      link
      desktop: sidobanner {
        ...AdImageFields
      }
      mobile: mobilbanner {
        ...AdImageFields
      }
    }
  }
`);

// One request per page type fetches every slot plus the fallback ad, aliased
// to `top`/`mid`/`bottom`/`fallback` so both page types share one shape.
export const DefaultAdsQuery = graphql(`
  query DefaultAds {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        top: adToppbanner {
          banner {
            ...AdToppbannerFields
          }
        }
        mid: adMittenbanner {
          banner {
            ...AdMittenbannerFields
          }
        }
        bottom: adSidobanner {
          banner {
            ...AdSidobannerFields
          }
        }
        fallback: fallbackannons {
          ...AdToppbannerFields
        }
      }
    }
  }
`);

// The DL bottom slot reads `toppbanner`, not `sidobanner`: the DL ads only
// carry a top banner creative.
export const DlAdsQuery = graphql(`
  query DlAds {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        top: adToppbannerDl {
          banner {
            ...AdToppbannerFields
          }
        }
        mid: adMittenbannerDl {
          banner {
            ...AdMittenbannerFields
          }
        }
        bottom: adSidobannerDl {
          banner {
            ...AdToppbannerFields
          }
        }
        fallback: fallbackannonsDl {
          ...AdToppbannerFields
        }
      }
    }
  }
`);
