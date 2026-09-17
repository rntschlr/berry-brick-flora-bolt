import assert from "node:assert/strict";
import { test } from "node:test";
import { randomBytes } from "node:crypto";
import { resolveAuthEnvironment } from "../src/lib/auth/preview.ts";

const clientSecret = randomBytes(24).toString("hex");
const signingSecret = randomBytes(32).toString("hex");
const enabled = {
  VITE_AUTH_ENABLED: "true",
  GROK_AUTH_CLIENT_ID: "test-app",
  GROK_AUTH_CLIENT_SECRET: clientSecret,
};

test("the public app starts without OAuth credentials or signing keys", () => {
  const result = resolveAuthEnvironment({
    NODE_ENV: "production",
    VITE_AUTH_ENABLED: "false",
  });
  assert.equal(result.enabled, false);
  assert.equal(result.clientId, undefined);
  assert.equal(result.clientSecret, undefined);
  assert.equal(result.secret, undefined);
});

test("disabled optional auth does not validate unused credentials", () => {
  assert.doesNotThrow(() =>
    resolveAuthEnvironment({
      NODE_ENV: "production",
      VITE_AUTH_ENABLED: " false ",
      GROK_AUTH_CLIENT_ID: "stale-config",
      BETTER_AUTH_SECRET: "unused",
    }),
  );
});

test("enabled auth fails clearly without credentials, including whitespace", () => {
  assert.throws(
    () =>
      resolveAuthEnvironment({
        VITE_AUTH_ENABLED: "true",
        GROK_AUTH_CLIENT_ID: "  ",
        GROK_AUTH_CLIENT_SECRET: "  ",
        GROK_PREVIEW_CLIENT_SECRET: "  ",
      }),
    /OAuth credentials are missing.*VITE_AUTH_ENABLED=false/,
  );
});

test("partial per-app credentials cannot fall back to preview credentials", () => {
  for (const partial of [
    { GROK_AUTH_CLIENT_ID: "test-app" },
    { GROK_AUTH_CLIENT_SECRET: clientSecret },
  ]) {
    assert.throws(
      () =>
        resolveAuthEnvironment({
          VITE_AUTH_ENABLED: "true",
          GROK_PREVIEW_CLIENT_SECRET: clientSecret,
          ...partial,
        }),
      /Set both GROK_AUTH_CLIENT_ID and GROK_AUTH_CLIENT_SECRET/,
    );
  }
});

test("preview authentication requires an environment-provided secret", () => {
  const result = resolveAuthEnvironment({
    VITE_AUTH_ENABLED: "true",
    GROK_PREVIEW_CLIENT_SECRET: clientSecret,
  });
  assert.equal(result.enabled, true);
  assert.equal(result.clientId, "grok_preview");
  assert.equal(result.clientSecret, clientSecret);
});

test("complete per-app credentials take precedence over preview credentials", () => {
  const result = resolveAuthEnvironment({
    ...enabled,
    GROK_AUTH_CLIENT_ID: " test-app ",
    GROK_PREVIEW_CLIENT_SECRET: "unused-preview-value",
  });
  assert.equal(result.clientId, "test-app");
  assert.equal(result.clientSecret, clientSecret);
});

test("production auth requires a stable signing key", () => {
  assert.throws(
    () => resolveAuthEnvironment({ ...enabled, NODE_ENV: "production" }),
    /Set a stable BETTER_AUTH_SECRET/,
  );
});

test("persistent database auth requires a stable signing key in development", () => {
  assert.throws(
    () =>
      resolveAuthEnvironment({
        ...enabled,
        DATABASE_URL: "postgresql://localhost/tinta_test",
      }),
    /Set a stable BETTER_AUTH_SECRET/,
  );
});

test("enabled auth rejects short signing keys without disclosing their value", () => {
  const shortSecret = "sensitive-test-value";
  assert.throws(
    () => resolveAuthEnvironment({ ...enabled, BETTER_AUTH_SECRET: shortSecret }),
    (error) => {
      assert.match(error.message, /at least 32 characters/);
      assert.equal(error.message.includes(shortSecret), false);
      assert.equal(error.message.includes(clientSecret), false);
      return true;
    },
  );
});

test("complete production configuration preserves its stable signing key", () => {
  const result = resolveAuthEnvironment({
    ...enabled,
    NODE_ENV: "production",
    BETTER_AUTH_SECRET: signingSecret,
    GROK_AUTH_ISSUER: "https://auth.example.com",
    DATABASE_URL: "postgresql://localhost/tinta_test",
  });
  assert.equal(result.enabled, true);
  assert.equal(result.secret, signingSecret);
  assert.equal(result.issuer, "https://auth.example.com");
  assert.equal(result.databaseUrl, "postgresql://localhost/tinta_test");
});
