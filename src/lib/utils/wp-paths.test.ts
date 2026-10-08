import { describe, expect, test } from "bun:test";
import { isWordPressInternalPath } from "./wp-paths";

describe("isWordPressInternalPath", () => {
  test.each([
    "/wp-json/wp/v2/pages",
    "//WP-JSON/x",
    "%2Fwp-json%2Fwp",
    "%77p-json/wp/v2/pages",
    "%252Fwp-admin",
    "wp-login.php",
    "xmlrpc.php",
    "foo/bar.php",
    "FOO.PHP",
    "wp-content/uploads/x.jpg",
    "wp-includes/js/jquery.js",
  ])("blocks %p", (path) => {
    expect(isWordPressInternalPath(path)).toBe(true);
  });

  test("blocks catch-all slug arrays", () => {
    expect(isWordPressInternalPath(["wp-json", "wp", "v2", "pages"])).toBe(true);
  });

  test.each([
    "om-oss",
    "vinguide/vinatlas",
    "/guide",
    "phpmyadmin-guide",
    "%E0%A4%A",
  ])("allows %p", (path) => {
    expect(isWordPressInternalPath(path)).toBe(false);
  });

  test("allows regular slug arrays", () => {
    expect(isWordPressInternalPath(["vinguide", "vinatlas"])).toBe(false);
  });
});
