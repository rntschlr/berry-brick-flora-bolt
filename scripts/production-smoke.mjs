import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadEnv } from "vite";
import { siteOrigin } from "./site-config.mjs";

// Exercise the actual built fetch handler without a browser or external services.
// This is a server smoke check, not mobile/visual or deployed-Cloudflare QA.
const env = { ...loadEnv("production", process.cwd(), "VITE_"), ...process.env };
const origin = siteOrigin(env.VITE_PUBLIC_SITE_URL);
const { default: worker } = await import("../dist/_worker.js/index.js");
const context = { waitUntil() {}, passThroughOnException() {} };
const routes = ["/", "/alphabet", "/cases", "/cases/inessive", "/practice"];
for (const path of routes) {
  const response = await worker.fetch(new Request(`${origin}${path}`), {}, context);
  const html = await response.text();
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get("content-type"), /text\/html/, path);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff", path);
  assert.ok(response.headers.get("content-security-policy").includes("object-src 'none'"), path);
  const canonicals = html.match(/<link[^>]+rel="canonical"[^>]*>/g) ?? [];
  assert.equal(canonicals.length, 1, `single canonical URL: ${path}`);
  assert.ok(canonicals[0].includes(`href="${origin}${path}"`), `canonical URL: ${path}`);
  if (path === "/cases/inessive")
    assert.ok(
      html.includes("English job:"),
      "nested case detail renders through the parent outlet",
    );
  assert.ok(html.includes(`${origin}/og.jpg`), `share image: ${path}`);
  assert.ok(!html.includes("grok-app-builder/extensions.js"), `standalone chrome: ${path}`);
}
const health = await worker.fetch(new Request(`${origin}/health`), {}, context);
assert.equal(health.status, 200);
assert.equal(health.headers.get("cache-control"), "no-store");
assert.deepEqual(await health.json(), { status: "ok", service: "tinta" });
const missing = await worker.fetch(new Request(`${origin}/not-a-real-page`), {}, context);
assert.equal(missing.status, 404);
const missingCase = await worker.fetch(new Request(`${origin}/cases/not-a-real-case`), {}, context);
assert.equal(missingCase.status, 404);
assert.ok(readFileSync("dist/robots.txt", "utf8").includes(`${origin}/sitemap.xml`));
const locations = [
  ...readFileSync("dist/sitemap.xml", "utf8").matchAll(/<loc>([^<]+)<\/loc>/g),
].map((match) => match[1]);
assert.ok(locations.length > 20);
assert.ok(locations.every((url) => new URL(url).origin === origin));
console.log(
  `Production smoke passed: ${routes.length} rendered routes, health, 404, headers, standalone metadata, ${locations.length} sitemap URLs.`,
);
// The imported server owns background timers; this one-shot CLI has finished all awaited checks.
process.exit(0);
