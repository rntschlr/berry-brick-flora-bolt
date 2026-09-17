export const DEFAULT_SITE_ORIGIN = "https://tinta.pages.dev";

/** @param {string | undefined} value */
export function siteOrigin(value) {
  const url = new URL(value?.trim() || DEFAULT_SITE_ORIGIN);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error(
      "VITE_PUBLIC_SITE_URL must be an HTTPS origin, for example https://example.com",
    );
  }
  return url.origin;
}

/** @param {string} sitemap @param {string} origin */
export function sitemapForOrigin(sitemap, origin) {
  const canonical = siteOrigin(origin);
  return sitemap.replace(/<loc>[^<]+<\/loc>/g, (location) => {
    const path = new URL(location.slice(5, -6)).pathname;
    return `<loc>${canonical}${path}</loc>`;
  });
}
