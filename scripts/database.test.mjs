import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

// Isolate process-global DB state and environment from the other test workers.
test("production DB access refuses transient storage, while imports stay lazy", () => {
  const result = spawnSync(
    process.execPath,
    [
      "--experimental-strip-types",
      "--input-type=module",
      "-e",
      `
    import assert from 'node:assert/strict';
    const { getSql } = await import('./src/lib/db.ts');
    assert.equal(globalThis.__pgliteInstance__, undefined);
    await assert.rejects(getSql(), /DATABASE_URL is required for production/);
    await assert.rejects(getSql(), /DATABASE_URL is required for production/);
    assert.equal(globalThis.__pgliteInstance__, undefined);
  `,
    ],
    {
      cwd: new URL("../", import.meta.url),
      env: { ...process.env, NODE_ENV: "production", DATABASE_URL: "   " },
      encoding: "utf8",
      timeout: 10000,
    },
  );
  assert.equal(result.status, 0, result.stderr || result.error?.message);
});
