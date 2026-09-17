/**
 * Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
 * (and later receive registered routes). Noops when the app is not embedded,
 * and always no-ops in production / public standalone builds.
 */

import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  collectRoutePathsFromTree,
  installPreviewHostBridge,
} from "@/lib/preview-host-bridge";

const isPublicStandalone =
  import.meta.env.PROD ||
  import.meta.env.VITE_PUBLIC_STANDALONE === "true" ||
  import.meta.env.VITE_SHIP_GROK_CHROME === "false";

export function PreviewHostBridge() {
  const router = useRouter();

  useEffect(() => {
    if (isPublicStandalone) return;
    return installPreviewHostBridge({
      navigate: (path) => {
        router.history.push(path);
      },
      getRoutePaths: () => collectRoutePathsFromTree(router.routeTree),
    });
  }, [router]);

  return null;
}
