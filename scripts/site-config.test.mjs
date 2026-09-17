import assert from "node:assert/strict";
import { test } from "node:test";
import { siteOrigin, sitemapForOrigin } from "./site-config.mjs";

test("custom domain accepts HTTPS origins and normalizes a trailing slash", () => {
  assert.equal(siteOrigin("https://learn.example.com/"), "https://learn.example.com");
  assert.equal(siteOrigin(undefined), "https://tinta.pages.dev");
  for (const bad of [
    "http://example.com",
    "https://a:b@example.com",
    "https://example.com/path",
    "https://example.com?x=1",
    "not a URL",
  ]) {
    assert.throws(() => siteOrigin(bad));
  }
});

test("domain switch updates every sitemap URL while preserving nested paths", () => {
  const sitemap =
    "<urlset><loc>https://old.example/</loc><loc>https://old.example/cases/inessive</loc></urlset>";
  assert.equal(
    sitemapForOrigin(sitemap, "https://new.example"),
    "<urlset><loc>https://new.example/</loc><loc>https://new.example/cases/inessive</loc></urlset>",
  );
});
