export const AD_TOP = `
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
                id
                altText
              }
              mobilbanner {
                mediaItemUrl
                id
                altText
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
                  id
                altText
                }
                mobilbanner {
                  mediaItemUrl
                  id
                altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const AD_MID = `
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
                id
                altText
              }
              mobilbanner {
                mediaItemUrl
                id
                altText
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
                  id
                altText
                }
                mobilbanner {
                  mediaItemUrl
                  id
                altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const AD_DL_TOP = `
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
                id
                altText
              }
              mobilbanner {
                mediaItemUrl
                id
                altText
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
                  id
                altText
                }
                mobilbanner {
                  mediaItemUrl
                  id
                altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const AD_DL_MID = `
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
                id
                altText
              }
              mobilbanner {
                mediaItemUrl
                id
                altText
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
                  id
                altText
                }
                mobilbanner {
                  mediaItemUrl
                  id
                altText
                }
              }
            }
          }
        }
      }
    }
  }
`;
