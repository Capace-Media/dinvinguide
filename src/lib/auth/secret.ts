import { createHash, timingSafeEqual } from "node:crypto";

const sha256 = (value: string) =>
  new Uint8Array(createHash("sha256").update(value).digest());

/**
 * Compares a secret from a request with the configured one in constant time.
 * An unset or empty configured secret never matches, so a missing environment
 * variable cannot leave a route open.
 */
export function isValidSecret(
  provided: string | null | undefined,
  expected: string | null | undefined,
): boolean {
  if (!expected || !provided) return false;
  // Hashing gives both sides the same length, which timingSafeEqual requires.
  return timingSafeEqual(sha256(provided), sha256(expected));
}

/** Returns the token of an `Authorization: Bearer <token>` header, or null. */
export function bearerToken(header: string | null | undefined): string | null {
  const match = header?.match(/^Bearer (.+)$/);
  return match ? match[1] : null;
}
