export const FALLBACK_AD = `
  query FALLBACK_AD {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        ad:fallbackannons {
          ... on Ad {
            id
            title
            acf_ads {
              link
              desktop: toppbanner {
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
                id
                altText
              }
              mobile: mobilbanner {
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
                id
                altText
              }
            }
          }
        }
      }
    }
  }`;

export const DL_TOP_AD = `
  query DL_TOP_AD {
    options: acfOptionsAnnonsplaceringar {
      settings:acf_adsettings {
        ad: adToppbannerDl {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                desktop: toppbanner {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                  id
                altText
                }
                mobile: mobilbanner {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                  id
                altText
                }
              }
            }
          }
        }
      }
    }
  }`;

export const DL_MID_AD = `
  query DL_MID_AD {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        ad: adMittenbannerDl {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                desktop: mittenbanner {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                  id
                altText
                }
                mobile: mobilbanner {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
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

export const DL_BOTTOM_AD = `
query DL_BOTTOM_AD {
  options: acfOptionsAnnonsplaceringar {
    settings: acf_adsettings {
      ad: adSidobannerDl {
        banner {
          ... on Ad {
            id
            title
            acf_ads {
              link
              desktop: toppbanner {
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
                id
              altText
              }
              mobile: mobilbanner {
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
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
