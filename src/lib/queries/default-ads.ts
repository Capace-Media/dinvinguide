import { adFields } from "./ad-fields";

// Ads for the default (non-DL) page type. One request fetches every slot plus
// the shared fallback ad, aliased to `top`/`mid`/`bottom`/`fallback` so the
// fetcher can try each slot first and fall through to the fallback.

export const DEFAULT_ADS = `
  query DEFAULT_ADS {
    options: acfOptionsAnnonsplaceringar {
      settings: acf_adsettings {
        top: adToppbanner {
          banner {
            ${adFields("toppbanner")}
          }
        }
        mid: adMittenbanner {
          banner {
            ${adFields("mittenbanner")}
          }
        }
        bottom: adSidobanner {
          banner {
            ${adFields("sidobanner")}
          }
        }
        fallback: fallbackannons {
          ${adFields("toppbanner")}
        }
      }
    }
  }
`;
