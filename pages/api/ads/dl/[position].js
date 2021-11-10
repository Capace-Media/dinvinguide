import { AD_DL_MID, AD_DL_TOP } from '../../../../lib/fragments/ads';

import { Client } from '../../../../lib/apollo';

const queryMap = {
  top: AD_DL_TOP,
  mid: AD_DL_MID,
};
const typeMap = {
  top: ['adToppbannerDl', 'toppbanner'],
  mid: ['adMittenbannerDl', 'mittenbanner'],
};
const handler = async (req, res) => {
  const { position } = req.query;

  try {
    let ad, text, url;
    const response = await Client.query({ query: queryMap[position] });
    const hasAd =
      response?.data?.acfOptionsAnnonsplaceringar?.acf_adsettings &&
      response?.data?.acfOptionsAnnonsplaceringar?.acf_adsettings[
        typeMap[position][0]
      ] &&
      response?.data?.acfOptionsAnnonsplaceringar?.acf_adsettings[
        typeMap[position][0]
      ][0] &&
      response?.data?.acfOptionsAnnonsplaceringar?.acf_adsettings[
        typeMap[position][0]
      ][0]?.banner
        ? true
        : false;

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
          .fallbackannonsDl[0].acf_ads;
      text =
        response.data.acfOptionsAnnonsplaceringar.acf_adsettings
          .fallbackannonsDl[0].title;
      url =
        response.data.acfOptionsAnnonsplaceringar.acf_adsettings
          .fallbackannonsDl[0].acf_ads.link;

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
