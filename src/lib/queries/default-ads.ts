// Ads for the default (non-DL) page type. Each query fetches its slot and the
// shared fallback ad in one request, aliased to the same shape so the fetcher
// can try the slot first and fall through to the fallback.

export const DEFAULT_TOP_AD = `
  query DEFAULT_TOP_AD {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        slot: adToppbanner {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                desktop: toppbanner {
                  mediaItemUrl
                  id
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
                mobile: mobilbanner {
                  mediaItemUrl
                  id
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
        fallback: fallbackannons {
          ... on Ad {
            id
            title
            acf_ads {
              link
              desktop: toppbanner {
                mediaItemUrl
                id
                altText
                mediaDetails {
                  width
                  height
                }
              }
              mobile: mobilbanner {
                mediaItemUrl
                id
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const DEFAULT_MID_AD = `
  query DEFAULT_MID_AD {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        slot: adMittenbanner {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                desktop: mittenbanner {
                  mediaItemUrl
                  id
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
                mobile: mobilbanner {
                  mediaItemUrl
                  id
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
        fallback: fallbackannons {
          ... on Ad {
            id
            title
            acf_ads {
              link
              desktop: toppbanner {
                mediaItemUrl
                id
                altText
                mediaDetails {
                  width
                  height
                }
              }
              mobile: mobilbanner {
                mediaItemUrl
                id
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const DEFAULT_BOTTOM_AD = `
  query DEFAULT_BOTTOM_AD {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        slot: adSidobanner {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                desktop: sidobanner {
                  mediaItemUrl
                  id
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
                mobile: mobilbanner {
                  mediaItemUrl
                  id
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
            }
          }
        }
        fallback: fallbackannons {
          ... on Ad {
            id
            title
            acf_ads {
              link
              desktop: toppbanner {
                mediaItemUrl
                id
                altText
                mediaDetails {
                  width
                  height
                }
              }
              mobile: mobilbanner {
                mediaItemUrl
                id
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;
