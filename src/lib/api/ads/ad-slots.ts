import type {
  AdImageFieldsFragment,
  AdToppbannerFieldsFragment,
  DefaultAdsQuery,
  DlAdsQuery,
} from "@/lib/wp/gql/graphql";

// Pure mapping from the ads response to renderable slots. Kept apart from the
// fetch so it can be unit tested without a CMS or `server-only`.

export type AdImage = AdImageFieldsFragment & { mediaItemUrl: string };

export interface Ad {
  id: string;
  title: string;
  link: string;
  desktop: AdImage;
  mobile: AdImage | null;
}

export interface AdSlots {
  top: Ad | null;
  mid: Ad | null;
  bottom: Ad | null;
}

// Every slot fragment has the same shape (only the aliased image differs).
type AdNode = AdToppbannerFieldsFragment;
type AdSettings = NonNullable<
  NonNullable<(DefaultAdsQuery | DlAdsQuery)["options"]>["settings"]
>;
type AdSlot = AdSettings["top"];

function toAdImage(image?: AdImageFieldsFragment | null): AdImage | null {
  const url = image?.mediaItemUrl;
  return image && url ? { ...image, mediaItemUrl: url } : null;
}

// A slot is only renderable with both a link and a desktop image. Anything
// else is treated as unfilled so the caller falls through to the fallback ad.
export function toAd(node?: AdNode | null): Ad | null {
  const acf = node?.acf_ads;
  const desktop = toAdImage(acf?.desktop);
  if (!node || !acf?.link || !desktop) return null;

  return {
    id: node.id,
    title: node.title ?? "",
    link: acf.link,
    desktop,
    mobile: toAdImage(acf.mobile),
  };
}

// Each slot shows its own ad, then the shared fallback, then nothing. An
// unreachable CMS (`settings` missing) reads as three empty slots.
export function toAdSlots(settings?: AdSettings | null): AdSlots {
  const fallback = toAd(settings?.fallback?.[0]);
  const pick = (slot?: AdSlot) => toAd(slot?.[0]?.banner?.[0]) ?? fallback;

  return {
    top: pick(settings?.top),
    mid: pick(settings?.mid),
    bottom: pick(settings?.bottom),
  };
}
