import { gql } from '@apollo/client';

export const AD_TOP = gql`
  query fetchTopAd {
    acfOptionsAnnonsplaceringar {
      acf_adsettings {
        fallbackannons {
          ... on Ad {
            id
            title
            acf_ads {
              link
              toppbanner {
                mediaItemUrl
              }
              mobilbanner {
                mediaItemUrl
              }
            }
          }
        }
        adToppbanner {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                toppbanner {
                  mediaItemUrl
                }
                mobilbanner {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const AD_MID = gql`
  query fetchMidAd {
    acfOptionsAnnonsplaceringar {
      acf_adsettings {
        fallbackannons {
          ... on Ad {
            id
            title
            acf_ads {
              link
              toppbanner {
                mediaItemUrl
              }
              mobilbanner {
                mediaItemUrl
              }
            }
          }
        }
        adMittenbanner {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                mittenbanner {
                  mediaItemUrl
                }
                mobilbanner {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const AD_DL_TOP = gql`
  query fetchTopDlAd {
    acfOptionsAnnonsplaceringar {
      acf_adsettings {
        fallbackannonsDl {
          ... on Ad {
            id
            title
            acf_ads {
              link
              toppbanner {
                mediaItemUrl
              }
              mobilbanner {
                mediaItemUrl
              }
            }
          }
        }
        adToppbannerDl {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                toppbanner {
                  mediaItemUrl
                }
                mobilbanner {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const AD_DL_MID = gql`
  query fetchMidDlAd {
    acfOptionsAnnonsplaceringar {
      acf_adsettings {
        fallbackannonsDl {
          ... on Ad {
            id
            title
            acf_ads {
              link
              toppbanner {
                mediaItemUrl
              }
              mobilbanner {
                mediaItemUrl
              }
            }
          }
        }

        adMittenbannerDl {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                mittenbanner {
                  mediaItemUrl
                }
                mobilbanner {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;
