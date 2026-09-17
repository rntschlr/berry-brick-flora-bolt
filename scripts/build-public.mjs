import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { exitStatusFromChild } from "./with-app-env.mjs";

// The public target is a contract, independent of shell and preview overrides.
// Preserve VITE_PUBLIC_SITE_URL so every artifact uses the operator's domain.
const env = {
  ...process.env,
  NITRO_PRESET: "cloudflare-pages",
  VITE_AUTH_ENABLED: "false",
  VITE_PUBLIC_STANDALONE: "true",
  VITE_SHIP_GROK_CHROME: "false",
};
const root = fileURLToPath(new URL("../", import.meta.url));
for (const args of [
  ["scripts/with-app-env.mjs", "vite", "build"],
  ["scripts/with-app-env.mjs", process.execPath, "scripts/finalize-public.mjs"],
]) {
  const result = spawnSync(process.execPath, args, { cwd: root, env, stdio: "inherit" });
  if (result.error) {
    console.error("[public build] Could not start build command:", result.error.message);
    process.exit(1);
  }
  const status = exitStatusFromChild(result.status, result.signal);
  if (status !== 0) process.exit(status);
}
