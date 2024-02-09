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
                mediaDetails {
                  width
                  height
                }
                id
                altText
              }
              mobilbanner {
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
        adToppbanner {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                toppbanner {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                  id
                altText
                }
                mobilbanner {
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
                mediaDetails {
                  width
                  height
                }
                id
                altText
              }
              mobilbanner {
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
        adMittenbanner {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                mittenbanner {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                  id
                altText
                }
                mobilbanner {
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

export const AD_BOTTOM = `
query fetchBottomAd {
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
                 mediaDetails {
                  width
                  height
                }
                 id
                 altText
               }
               mobilbanner {
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
         adSidobanner {
           banner {
             ... on Ad {
               id
               title
               acf_ads {
                 link
                 sidobanner {
                   mediaItemUrl
                   mediaDetails {
                    width
                    height
                  }
                   id
                 altText
                 }
                 mobilbanner {
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

export const AD_DL_BOTTOM = `
query fetchBottomDLAd {
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
              mediaDetails {
                width
                height
              }
              id
              altText
            }
            mobilbanner {
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
      adSidobannerDl {
        banner {
          ... on Ad {
            id
            title
            acf_ads {
              link
              toppbanner {
                mediaItemUrl
                mediaDetails {
                  width
                  height
                }
                id
              altText
              }
              mobilbanner {
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
                mediaDetails {
                  width
                  height
                }
                id
                altText
              }
              mobilbanner {
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
        adToppbannerDl {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                toppbanner {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                  id
                altText
                }
                mobilbanner {
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
                mediaDetails {
                  width
                  height
                }
                id
                altText
              }
              mobilbanner {
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

        adMittenbannerDl {
          banner {
            ... on Ad {
              id
              title
              acf_ads {
                link
                mittenbanner {
                  mediaItemUrl
                  mediaDetails {
                    width
                    height
                  }
                  id
                altText
                }
                mobilbanner {
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
