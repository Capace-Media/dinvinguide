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
        desktop: data.adToppbanner[0].banner
          ? data.adToppbanner[0].banner[0].acf_ads.toppbanner.mediaItemUrl
          : null,
      },
      fallback: {
        desktop: data.fallbackannons[0].acf_ads.toppbanner.mediaItemUrl,
      },
    },
    mid: {
      current: {
        desktop: data.adMittenbanner[0].banner
          ? data.adMittenbanner[0].banner[0].acf_ads.toppbanner.mediaItemUrl
          : null,
      },
      fallback: {
        desktop: data.fallbackannons[0].acf_ads.toppbanner.mediaItemUrl,
      },
    },
    bot: {
      current: {
        desktop: data.adSidobanner[0].banner
          ? data.adSidobanner[0].banner[0].acf_ads.toppbanner.mediaItemUrl
          : null,
      },
      fallback: {
        desktop: data.fallbackannons[0].acf_ads.toppbanner.mediaItemUrl,
      },
    },
  };
  return ads;
};
