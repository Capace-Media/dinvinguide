import { adFields } from "./ad-fields";

// Ads for the DL (dryckeslistan) page type. One request fetches every slot
// plus the DL fallback ad, aliased to `top`/`mid`/`bottom`/`fallback` so the
// fetcher can try each slot first and fall through to the fallback.
//
// Note: the bottom slot reads `toppbanner`, not `sidobanner`. That matches the
// existing AD_DL_BOTTOM query, which aliases it the same way — the DL ads only
// carry a top banner creative.

export const DL_ADS = `
  query DL_ADS {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        top: adToppbannerDl {
          banner {
            ${adFields("toppbanner")}
          }
        }
        mid: adMittenbannerDl {
          banner {
            ${adFields("mittenbanner")}
          }
        }
        bottom: adSidobannerDl {
          banner {
            ${adFields("toppbanner")}
          }
        }
        fallback: fallbackannonsDl {
          ${adFields("toppbanner")}
        }
      }
    }
  }
`;
