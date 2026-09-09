import { afterAll, describe, expect, mock, test } from "bun:test";
import { toAd } from "./shape";

// Minimal valid shapes, spread-and-override per test so each case shows only
// the field it cares about.
const image = {
  mediaItemUrl: "https://cms.example/banner.jpg",
  id: "img-1",
  altText: "Annons",
  mediaDetails: { width: 980, height: 200 },
};

const node = {
  id: "ad-1",
  title: "Villa Brichot",
  acf_ads: {
    link: "https://example.com",
    desktop: image,
    mobile: { ...image, id: "img-2", mediaItemUrl: "https://cms.example/m.jpg" },
  },
};

describe("toAd", () => {
  test("maps a complete node", () => {
    expect(toAd(node)).toEqual({
      id: "ad-1",
      title: "Villa Brichot",
      link: "https://example.com",
      desktop: image,
      mobile: node.acf_ads.mobile,
    });
  });

  // Each of these means "slot is unfilled", so getAd falls through to the
  // fallback ad rather than rendering a broken banner.
  test("returns null when the node is missing", () => {
    expect(toAd(undefined)).toBeNull();
    expect(toAd(null)).toBeNull();
  });

  test("returns null when acf_ads is missing", () => {
    expect(toAd({ ...node, acf_ads: null })).toBeNull();
  });

  test("returns null when the link is missing", () => {
    expect(toAd({ ...node, acf_ads: { ...node.acf_ads, link: null } })).toBeNull();
    expect(toAd({ ...node, acf_ads: { ...node.acf_ads, link: "" } })).toBeNull();
  });

  test("returns null when the desktop image is missing", () => {
    expect(
      toAd({ ...node, acf_ads: { ...node.acf_ads, desktop: null } })
    ).toBeNull();
  });

  test("returns null when the desktop image has no URL", () => {
    expect(
      toAd({
        ...node,
        acf_ads: { ...node.acf_ads, desktop: { ...image, mediaItemUrl: "" } },
      })
    ).toBeNull();
  });

  // A missing mobile creative is fine — <Banner> falls back to the desktop
  // image. This is the current state of the DL top and bottom slots.
  test("keeps a null mobile image rather than rejecting the ad", () => {
    const ad = toAd({ ...node, acf_ads: { ...node.acf_ads, mobile: null } });
    expect(ad).not.toBeNull();
    expect(ad?.mobile).toBeNull();
    expect(ad?.desktop).toEqual(image);
  });

  // mediaDetails drives width/height on <source>; absent is tolerable because
  // Banner falls back to the slot's nominal dimensions.
  test("tolerates a missing mediaDetails", () => {
    const ad = toAd({
      ...node,
      acf_ads: { ...node.acf_ads, desktop: { ...image, mediaDetails: null } },
    });
    expect(ad?.desktop.mediaDetails).toBeNull();
  });
});

// getAd picks the slot ad, then the fallback, then nothing. Mocking WP() lets
// us drive that chain without a CMS — the smoke tests cover the real thing.
describe("getAd fallback chain", () => {
  // bun test shares one global across files by default, so an un-restored
  // module mock would leak into every other test file in the run.
  afterAll(() => mock.restore());

  const wrap = (slot: unknown, fallback: unknown) => ({
    data: { options: { settings: { slot, fallback } } },
  });

  async function getAdWith(response: unknown) {
    mock.module("../../wp", () => ({ default: async () => response }));
    const { getAd } = await import("./shape");
    return getAd("query");
  }

  test("prefers the slot ad when it is filled", async () => {
    const fallback = { ...node, id: "fallback-1", title: "Fallback" };
    const ad = await getAdWith(wrap([{ banner: [node] }], [fallback]));
    expect(ad?.id).toBe("ad-1");
  });

  test("falls through to the fallback when the slot is empty", async () => {
    const fallback = { ...node, id: "fallback-1", title: "Fallback" };
    const ad = await getAdWith(wrap([{ banner: [] }], [fallback]));
    expect(ad?.id).toBe("fallback-1");
  });

  test("returns null when both are empty", async () => {
    expect(await getAdWith(wrap([], []))).toBeNull();
  });

  test("returns null when the CMS is unreachable", async () => {
    expect(await getAdWith(undefined)).toBeNull();
  });
});
