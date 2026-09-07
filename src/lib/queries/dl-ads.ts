// Ads for the DL (dryckeslistan) page type. Each query fetches its slot and
// the DL fallback ad in one request, aliased to the same shape so the fetcher
// can try the slot first and fall through to the fallback.
//
// Note: the bottom slot reads `toppbanner`, not `sidobanner`. That matches the
// existing AD_DL_BOTTOM query, which aliases it the same way — the DL ads only
// carry a top banner creative.

export const DL_TOP_AD = `
  query DL_TOP_AD {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        slot: adToppbannerDl {
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
        fallback: fallbackannonsDl {
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

export const DL_MID_AD = `
  query DL_MID_AD {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        slot: adMittenbannerDl {
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
        fallback: fallbackannonsDl {
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

export const DL_BOTTOM_AD = `
  query DL_BOTTOM_AD {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        slot: adSidobannerDl {
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
        fallback: fallbackannonsDl {
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
