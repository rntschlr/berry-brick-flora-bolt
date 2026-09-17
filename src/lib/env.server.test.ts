import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { env, envFlag, isAuthEnabled, isWorkspacePreview, requireEnv } from "./env.server.ts";

describe("env", () => {
  it("trims and drops empty strings", () => {
    process.env.MAGDOLNA_TEST_EMPTY = "   ";
    process.env.MAGDOLNA_TEST_VAL = "  hello ";
    assert.equal(env("MAGDOLNA_TEST_EMPTY"), undefined);
    assert.equal(env("MAGDOLNA_TEST_VAL"), "hello");
    delete process.env.MAGDOLNA_TEST_EMPTY;
    delete process.env.MAGDOLNA_TEST_VAL;
  });
});

describe("requireEnv", () => {
  it("throws a clear error when missing", () => {
    delete process.env.MAGDOLNA_TEST_REQUIRED;
    assert.throws(() => requireEnv("MAGDOLNA_TEST_REQUIRED"), /Missing required environment variable MAGDOLNA_TEST_REQUIRED/);
  });
  it("returns the value when set", () => {
    process.env.MAGDOLNA_TEST_REQUIRED = "ok";
    assert.equal(requireEnv("MAGDOLNA_TEST_REQUIRED"), "ok");
    delete process.env.MAGDOLNA_TEST_REQUIRED;
  });
});

describe("envFlag", () => {
  it("parses true/false variants", () => {
    process.env.MAGDOLNA_FLAG = "true";
    assert.equal(envFlag("MAGDOLNA_FLAG"), true);
    process.env.MAGDOLNA_FLAG = "0";
    assert.equal(envFlag("MAGDOLNA_FLAG"), false);
    delete process.env.MAGDOLNA_FLAG;
    assert.equal(envFlag("MAGDOLNA_FLAG"), undefined);
  });
  it("rejects garbage", () => {
    process.env.MAGDOLNA_FLAG = "maybe";
    assert.throws(() => envFlag("MAGDOLNA_FLAG"), /Invalid boolean/);
    delete process.env.MAGDOLNA_FLAG;
  });
});

describe("isWorkspacePreview / isAuthEnabled", () => {
  it("treats missing GROK_PROJECT_ID as workspace preview", () => {
    const prev = process.env.GROK_PROJECT_ID;
    delete process.env.GROK_PROJECT_ID;
    assert.equal(isWorkspacePreview(), true);
    process.env.GROK_PROJECT_ID = "proj_x";
    assert.equal(isWorkspacePreview(), false);
    if (prev === undefined) delete process.env.GROK_PROJECT_ID;
    else process.env.GROK_PROJECT_ID = prev;
  });

  it("auth off only when VITE_AUTH_ENABLED=false", () => {
    const prev = process.env.VITE_AUTH_ENABLED;
    process.env.VITE_AUTH_ENABLED = "false";
    assert.equal(isAuthEnabled(), false);
    process.env.VITE_AUTH_ENABLED = "true";
    assert.equal(isAuthEnabled(), true);
    if (prev === undefined) delete process.env.VITE_AUTH_ENABLED;
    else process.env.VITE_AUTH_ENABLED = prev;
  });
});
