import { describe, expect, test } from "bun:test";
import { toSearchRecords } from "./search-records";

// Minimal valid shapes, spread-and-override per test so each case shows only
// the field it cares about. They mirror the selections in
// `src/lib/api/search/queries.ts`.
const image = {
  node: { mediaItemUrl: "https://cms.example/bild.jpg", altText: "Bild" },
};
const base = {
  date: "2025-03-01T10:00:00",
  modifiedGmt: "2025-03-02T10:00:00",
  featuredImage: image,
};

const post = {
  ...base,
  title: "Resa till Rioja",
  slug: "resa-till-rioja",
  excerpt: "<p>En resa genom Spaniens vinland.</p>",
  author: { node: { slug: "anna" } },
};
const recipe = {
  ...base,
  title: "Lammstek",
  slug: "lammstek",
  acf_recipe: { desc: "Långkokt lamm." },
};
const drinktip = {
  ...base,
  title: "Sommarvin",
  slug: "sommarvin",
  acf_dryckestips: { beskrivning: "Friskt och lätt." },
};
const drink = {
  ...base,
  title: "Rioja Reserva",
  slug: "rioja-reserva",
  acf_drinks: { beskrivning: "Mörka bär och vanilj." },
};
const grape = {
  ...base,
  title: "Tempranillo",
  slug: "tempranillo",
  acf_grape: { kortBeskrivning: "Spaniens viktigaste blå druva." },
};

const empty = { posts: [], recipes: [], drinktips: [], drinks: [], grapes: [] };

describe("toSearchRecords", () => {
  test("maps every type to its type and URL", () => {
    const records = toSearchRecords({
      posts: [post],
      recipes: [recipe],
      drinktips: [drinktip],
      drinks: [drink],
      grapes: [grape],
    });

    expect(records.map(({ type, url }) => ({ type, url }))).toEqual([
      { type: "post", url: "/skribenter/anna/resa-till-rioja" },
      { type: "recipe", url: "/recept/lammstek" },
      { type: "drinktip", url: "/dryckestips/sommarvin" },
      { type: "drink", url: "/drycker/rioja-reserva" },
      { type: "grape", url: "/druvor/tempranillo" },
    ]);
  });

  test("maps the shared fields", () => {
    const [record] = toSearchRecords({ ...empty, drinks: [drink] });

    expect(record).toMatchObject({
      type: "drink",
      title: "Rioja Reserva",
      excerpt: "Mörka bär och vanilj.",
      url: "/drycker/rioja-reserva",
      image: { url: "https://cms.example/bild.jpg", alt: "Bild" },
      date: "2025-03-01T10:00:00",
      modified: "2025-03-02T10:00:00",
    });
    expect(typeof record.id).toBe("string");
  });

  test("takes the excerpt from each type's own field", () => {
    const records = toSearchRecords({
      posts: [post],
      recipes: [recipe],
      drinktips: [drinktip],
      drinks: [drink],
      grapes: [grape],
    });

    expect(records.map((record) => record.excerpt)).toEqual([
      "En resa genom Spaniens vinland.",
      "Långkokt lamm.",
      "Friskt och lätt.",
      "Mörka bär och vanilj.",
      "Spaniens viktigaste blå druva.",
    ]);
  });

  // A post URL needs the author, so a post without one cannot be linked.
  test("drops a post without an author slug", () => {
    const records = toSearchRecords({
      ...empty,
      posts: [
        { ...post, author: null },
        { ...post, author: { node: { slug: null } } },
      ],
    });
    expect(records).toEqual([]);
  });

  test("drops nodes without a slug or title", () => {
    const records = toSearchRecords({
      ...empty,
      drinks: [
        { ...drink, slug: null },
        { ...drink, title: null },
        { ...drink, title: "  " },
      ],
    });
    expect(records).toEqual([]);
  });

  test("strips HTML and decodes entities in the excerpt", () => {
    const [record] = toSearchRecords({
      ...empty,
      posts: [
        {
          ...post,
          excerpt:
            "<p>Ost &amp; vin.</p>\n<p>Det&#8217;s <strong>gott</strong>&nbsp;ihop.</p>",
        },
      ],
    });
    expect(record.excerpt).toBe("Ost & vin. Det’s gott ihop.");
  });

  test("cuts long excerpts to at most 200 characters", () => {
    const [record] = toSearchRecords({
      ...empty,
      drinks: [
        { ...drink, acf_drinks: { beskrivning: "Mycket fruktig. ".repeat(40) } },
      ],
    });
    expect(record.excerpt.length).toBeGreaterThan(0);
    expect(record.excerpt.length).toBeLessThanOrEqual(200);
  });

  test("uses an empty excerpt when the field is missing", () => {
    const records = toSearchRecords({
      ...empty,
      posts: [{ ...post, excerpt: null }],
      drinks: [{ ...drink, acf_drinks: null }],
    });
    expect(records.map((record) => record.excerpt)).toEqual(["", ""]);
  });

  test("leaves image undefined without a featured image", () => {
    const records = toSearchRecords({
      ...empty,
      drinks: [
        { ...drink, featuredImage: null },
        { ...drink, slug: "utan-url", featuredImage: { node: { mediaItemUrl: null, altText: null } } },
      ],
    });
    expect(records).toHaveLength(2);
    expect(records[0].image).toBeUndefined();
    expect(records[1].image).toBeUndefined();
  });

  test("falls back to the title when the image has no alt text", () => {
    const [record] = toSearchRecords({
      ...empty,
      drinks: [
        { ...drink, featuredImage: { node: { ...image.node, altText: "" } } },
      ],
    });
    expect(record.image?.alt).toBe("Rioja Reserva");
  });

  test("gives unique ids when types share a slug", () => {
    const records = toSearchRecords({
      ...empty,
      drinks: [{ ...drink, slug: "tempranillo" }],
      grapes: [grape],
    });
    expect(records).toHaveLength(2);
    expect(new Set(records.map((record) => record.id)).size).toBe(2);
  });
});
