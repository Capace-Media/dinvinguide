import { promisify } from "node:util";
import { gunzip, gzip } from "node:zlib";
import { z } from "zod";
import { SEARCH_TYPES } from "./search-types";
import type { SearchRecord } from "./search-records";

// The stored form of the search records: gzipped JSON, about 1.5 MB for the
// ~18 500 records (7.6 MB raw). Pure, so it can be unit tested without Blob.

export interface SearchSnapshot {
  readonly version: string;
  readonly builtAt: string;
  readonly records: readonly SearchRecord[];
}

const recordSchema = z.object({
  id: z.string(),
  type: z.enum(SEARCH_TYPES),
  title: z.string(),
  excerpt: z.string(),
  url: z.string(),
  image: z.object({ url: z.string(), alt: z.string() }).optional(),
  date: z.string(),
  modified: z.string(),
});

// Only the first record is checked: validating all ~19 400 took ~0.6 s of
// every cold start on Vercel. The file is only written by this code, so one
// record is enough to catch a format change between deployments.
const snapshotSchema = z.object({
  version: z.string(),
  builtAt: z.iso.datetime(),
  records: z.array(z.unknown()),
});

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

export async function encodeSnapshot(snapshot: SearchSnapshot): Promise<Uint8Array> {
  return new Uint8Array(await gzipAsync(JSON.stringify(snapshot)));
}

// Throws on anything that is not a snapshot this code wrote, so a corrupt or
// outdated file falls back to WordPress instead of becoming the index.
export async function decodeSnapshot(bytes: Uint8Array): Promise<SearchSnapshot> {
  const json: unknown = JSON.parse((await gunzipAsync(bytes)).toString("utf8"));
  const { version, builtAt, records } = snapshotSchema.parse(json);
  if (records.length > 0) recordSchema.parse(records[0]);
  return { version, builtAt, records: records as SearchRecord[] };
}
