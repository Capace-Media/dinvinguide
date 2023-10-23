export interface AdMedia {
  mediaItemUrl: string;
  id: string;
  altText: string;
}

export interface Ad {
  id: string;
  title: string;
  acf_ads: {
    link: string;
    toppbanner?: AdMedia;
    mittenbanner?: AdMedia;
    mobilbanner?: AdMedia;
  };
}

export interface AdSettings {
  fallbackannons: Ad;
  adToppbanner: {
    banner: Ad;
  };
  adMittenbanner: {
    banner: Ad;
  };
  // ... any other settings as per your structure
}

export interface AdsData {
  acfOptionsAnnonsplaceringar: {
    acf_adsettings: AdSettings;
  };
}
