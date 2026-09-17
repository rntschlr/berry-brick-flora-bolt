import assert from "node:assert/strict";
import { test } from "node:test";
import securityHeaders from "../server/middleware/00-security.ts";
import health from "../server/routes/health.get.ts";

test("SSR security headers preserve response status, cookies and streamed content", async () => {
  const event = { res: { headers: new Headers() } };
  const response = new Response("streamed page", {
    status: 201,
    headers: { "content-type": "text/html", "set-cookie": "test=value; HttpOnly" },
  });
  const result = await securityHeaders(event, () => response);
  assert.equal(result.status, 201);
  assert.equal(result.headers.get("set-cookie"), "test=value; HttpOnly");
  assert.equal(result.headers.get("x-content-type-options"), "nosniff");
  assert.equal(result.headers.get("content-security-policy"), "object-src 'none'; base-uri 'self'");
  assert.equal(await result.text(), "streamed page");
});

test("non-Response handlers receive headers on the event response", async () => {
  const event = { res: { headers: new Headers() } };
  assert.equal(await securityHeaders(event, () => "plain response"), "plain response");
  assert.equal(event.res.headers.get("x-content-type-options"), "nosniff");
});

test("health endpoint is non-cacheable and reveals only liveness", async () => {
  const response = health();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { status: "ok", service: "tinta" });
});
