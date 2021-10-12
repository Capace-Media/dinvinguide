import { Client } from '../apollo';
import { gql } from '@apollo/client';

export const getAds = async () => {
  const res = await Client.query({
    query: gql`
      query getAllAds {
        acfOptionsAnnonsplaceringar {
          acf_adsettings {
            fallbackannons {
              ... on Ad {
                acf_ads {
                  link
                  mobilbanner {
                    mediaItemUrl
                  }
                  toppbanner {
                    mediaItemUrl
                  }
                  mittenbanner {
                    mediaItemUrl
                  }
                  sidobanner {
                    mediaItemUrl
                  }
                }
              }
            }
            adToppbanner {
              banner {
                ... on Ad {
                  acf_ads {
                    link
                    mobilbanner {
                      mediaItemUrl
                    }
                    toppbanner {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
            adMittenbanner {
              banner {
                ... on Ad {
                  acf_ads {
                    link
                    mobilbanner {
                      mediaItemUrl
                    }
                    toppbanner {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
            adSidobanner {
              banner {
                ... on Ad {
                  acf_ads {
                    link
                    mobilbanner {
                      mediaItemUrl
                    }
                    toppbanner {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  const data = res.data.acfOptionsAnnonsplaceringar.acf_adsettings;

  const ads = {
    top: {
      current: {
        href: data.adToppbanner[0].banner
          ? data.adToppbanner[0].banner[0].acf_ads.link
          : null,
        desktop: data.adToppbanner[0].banner
          ? data.adToppbanner[0].banner[0].acf_ads.toppbanner.mediaItemUrl
          : null,
        mobile: data.adToppbanner[0].banner
          ? data.adToppbanner[0].banner[0].acf_ads.mobilbanner.mediaItemUrl
          : null,
      },
      fallback: {
        href: data.fallbackannons[0].acf_ads.link,
        desktop: data.fallbackannons[0].acf_ads.toppbanner.mediaItemUrl,
        mobile: data.fallbackannons[0].acf_ads.mobilbanner.mediaItemUrl,
      },
    },
    mid: {
      current: {
        href: data.adMittenbanner[0].banner
          ? data.adMittenbanner[0].banner[0].acf_ads.link
          : null,
        desktop: data.adMittenbanner[0].banner
          ? data.adMittenbanner[0].banner[0].acf_ads.toppbanner.mediaItemUrl
          : null,
        mobile: data.adMittenbanner[0].banner
          ? data.adMittenbanner[0].banner[0].acf_ads.mobilbanner.mediaItemUrl
          : null,
      },
      fallback: {
        href: data.fallbackannons[0].acf_ads.link,
        desktop: data.fallbackannons[0].acf_ads.toppbanner.mediaItemUrl,
        mobile: data.fallbackannons[0].acf_ads.mobilbanner.mediaItemUrl,
      },
    },
    bot: {
      current: {
        href: data.adSidobanner[0].banner
          ? data.adSidobanner[0].banner[0].acf_ads.link
          : null,
        desktop: data.adSidobanner[0].banner
          ? data.adSidobanner[0].banner[0].acf_ads.toppbanner.mediaItemUrl
          : null,
        mobile: data.adSidobanner[0].banner
          ? data.adSidobanner[0].banner[0].acf_ads.mobilbanner.mediaItemUrl
          : null,
      },
      fallback: {
        href: data.fallbackannons[0].acf_ads,
        desktop: data.fallbackannons[0].acf_ads.toppbanner.mediaItemUrl,
        mobile: data.fallbackannons[0].acf_ads.mobilbanner.mediaItemUrl,
      },
    },
  };
  return ads;
};
