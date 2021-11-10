import { AD_MID, AD_TOP } from '../../../../lib/fragments/ads';

import { Client } from '../../../../lib/apollo';

const queryMap = {
  top: AD_TOP,
  mid: AD_MID,
};
const typeMap = {
  top: ['adToppbanner', 'toppbanner'],
  mid: ['adMittenbanner', 'mittenbanner'],
};
const handler = async (req, res) => {
  const { position } = req.query;

  try {
    let ad, text, url;
    const response = await Client.query({ query: queryMap[position] });
    const hasAd = response?.data?.acfOptionsAnnonsplaceringar?.acf_adsettings[
      typeMap[position][0]
    ][0]?.banner
      ? true
      : false;
    console.log('HAS AD', hasAd);

    if (hasAd) {
      ad =
        response.data.acfOptionsAnnonsplaceringar.acf_adsettings[
          typeMap[position][0]
        ][0].banner[0].acf_ads;
      text =
        response.data.acfOptionsAnnonsplaceringar.acf_adsettings[
          typeMap[position][0]
        ][0].banner[0].title;
      url =
        response.data.acfOptionsAnnonsplaceringar.acf_adsettings[
          typeMap[position][0]
        ][0].banner[0].acf_ads.link;

      res.status(200).json({
        desktop: ad[typeMap[position][1]].mediaItemUrl,
        mobile: ad.mobilbanner.mediaItemUrl,
        title: text,
        href: url,
      });
    } else {
      //USE FALLBACK
      ad =
        response.data.acfOptionsAnnonsplaceringar.acf_adsettings
          .fallbackannons[0].acf_ads;
      text =
        response.data.acfOptionsAnnonsplaceringar.acf_adsettings
          .fallbackannons[0].title;
      url =
        response.data.acfOptionsAnnonsplaceringar.acf_adsettings
          .fallbackannons[0].acf_ads.link;

      res.status(200).json({
        desktop: ad.toppbanner.mediaItemUrl,
        mobile: ad.mobilbanner.mediaItemUrl,
        title: text,
        href: url,
      });
    }
  } catch (error) {
    console.log('ERROR =>', error);
    res.status(500);
  }
};
export default handler;
