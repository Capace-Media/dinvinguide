import { expect, test } from "bun:test";
import { gzipSync } from "node:zlib";
import { decodeSnapshot, encodeSnapshot, type SearchSnapshot } from "./search-snapshot-codec";

const gzipJson = (value: unknown) => new Uint8Array(gzipSync(JSON.stringify(value)));

const snapshot: SearchSnapshot = {
  version: "2-abc123",
  builtAt: "2026-10-16T04:00:00.000Z",
  records: [
    {
      id: "recipe:pasta-carbonara",
      type: "recipe",
      title: "Pasta carbonara",
      excerpt: "Krämig pasta med ägg och pecorino.",
      url: "/recept/pasta-carbonara",
      image: { url: "https://media.dinvinguide.se/wp-content/pasta.jpg", alt: "Pasta" },
      date: "2025-01-01T00:00:00",
      modified: "2025-02-01T00:00:00",
    },
    {
      id: "grape:nebbiolo",
      type: "grape",
      title: "Nebbiolo",
      excerpt: "Druvan bakom Barolo.",
      url: "/druvguiden/nebbiolo",
      date: "2024-05-01T00:00:00",
      modified: "2024-05-01T00:00:00",
    },
  ],
};

test("a snapshot survives encoding and decoding unchanged", async () => {
  const bytes = await encodeSnapshot(snapshot);
  expect(await decodeSnapshot(bytes)).toEqual(snapshot);
});

test("the stored form is gzipped", async () => {
  const bytes = await encodeSnapshot(snapshot);
  // gzip magic number
  expect([bytes[0], bytes[1]]).toEqual([0x1f, 0x8b]);
});

test("a file that is not a snapshot is rejected", async () => {
  const notASnapshot = gzipJson({ version: "1", records: "nope" });
  expect(decodeSnapshot(notASnapshot)).rejects.toThrow();
});

// Only the first record is validated (see `decodeSnapshot`), so a format
// change shows up there.
test("a first record with an unknown type is rejected", async () => {
  const outdated = {
    ...snapshot,
    records: [{ ...snapshot.records[0], type: "podcast" }],
  };
  expect(decodeSnapshot(gzipJson(outdated))).rejects.toThrow();
});

test("bytes that are not gzip are rejected", async () => {
  expect(decodeSnapshot(new TextEncoder().encode("{}"))).rejects.toThrow();
});
