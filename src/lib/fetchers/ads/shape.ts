import WP from "../../wp";

export interface AdImage {
  mediaItemUrl: string;
  id: string;
  altText: string | null;
  mediaDetails: {
    width: number;
    height: number;
  } | null;
}

export interface Ad {
  id: string;
  title: string;
  link: string;
  desktop: AdImage;
  mobile: AdImage | null;
}

interface AdNode {
  id: string;
  title: string;
  acf_ads: {
    link: string | null;
    desktop: AdImage | null;
    mobile: AdImage | null;
  } | null;
}

// Every ad query aliases its slot to `slot` and its fallback to `fallback`, so
// one response shape covers both the default and DL page types.
interface AdResponse {
  data?: {
    options?: {
      settings?: {
        slot?: { banner?: AdNode[] | null }[] | null;
        fallback?: AdNode[] | null;
      } | null;
    } | null;
  } | null;
}

// A slot is only renderable with both a link and a desktop image. Anything
// else is treated as unfilled so the caller falls through to the fallback ad.
// Exported for unit tests.
export function toAd(node?: AdNode | null): Ad | null {
  const acf = node?.acf_ads;
  if (!node || !acf?.link || !acf.desktop?.mediaItemUrl) return null;

  return {
    id: node.id,
    title: node.title,
    link: acf.link,
    desktop: acf.desktop,
    mobile: acf.mobile,
  };
}

// WP() catches its own errors and returns undefined, so there is nothing to
// try/catch here — an unreachable CMS reads the same as an empty slot, and
// both mean "render no ad".
export async function getAd(query: string): Promise<Ad | null> {
  const res: AdResponse = await WP(query, "ads");
  const settings = res?.data?.options?.settings;

  return toAd(settings?.slot?.[0]?.banner?.[0]) ?? toAd(settings?.fallback?.[0]);
}
