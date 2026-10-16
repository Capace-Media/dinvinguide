import "server-only";
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";
import { decodeSnapshot, encodeSnapshot, type SearchSnapshot } from "./search-snapshot-codec";

export type { SearchSnapshot };

// The search records as one file in a private Vercel Blob store. A new server
// downloads this instead of walking ~80 WordPress pages, so no visitor waits
// on WordPress. Without Blob credentials (local dev, tests) it does nothing.

const PATHNAME = "search/records.json.gz";

export interface StoredSnapshot {
  readonly snapshot: SearchSnapshot;
  readonly etag: string;
}

// The same credentials the SDK looks for; checked first so a missing store is
// a quiet skip instead of an error on every search.
function hasBlobCredentials(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

// `"unchanged"` when the stored file still has `etag`, so a recheck costs no
// download. `null` when there is no snapshot or it cannot be read.
export async function readSearchSnapshot(
  etag?: string
): Promise<StoredSnapshot | "unchanged" | null> {
  if (!hasBlobCredentials()) return null;
  try {
    const result = await get(PATHNAME, { access: "private", ifNoneMatch: etag });
    if (!result) return null;
    if (result.statusCode === 304) return "unchanged";
    const bytes = new Uint8Array(await new Response(result.stream).arrayBuffer());
    return { snapshot: await decodeSnapshot(bytes), etag: result.blob.etag };
  } catch (error) {
    console.error("Search snapshot read failed:", error);
    return null;
  }
}

// Returns the new ETag. With `ifMatch`, only replaces the file this server last
// saw; if another server wrote in between, theirs is kept and this returns null.
export async function writeSearchSnapshot(
  snapshot: SearchSnapshot,
  ifMatch?: string
): Promise<string | null> {
  if (!hasBlobCredentials()) return null;
  try {
    const result = await put(PATHNAME, Buffer.from(await encodeSnapshot(snapshot)), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/gzip",
      cacheControlMaxAge: 60,
      ifMatch,
    });
    return result.etag;
  } catch (error) {
    if (error instanceof BlobPreconditionFailedError) return null;
    console.error("Search snapshot write failed:", error);
    return null;
  }
}
