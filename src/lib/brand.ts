export const APP_NAME = "Tinta";
export const APP_TAGLINE = "Hungarian field notes";
export const APP_DESCRIPTION =
  "Hungarian field notes for English speakers — grammar, cases, verbs, and the words you will actually use.";
export const APP_MEANING = "tinta, ink";
export const REPO_URL = "https://github.com/rntschlr/berry-brick-flora-bolt";
export const SUPPORT_EMAIL = "johnkrentschler@icloud.com";
export const THEME_COLOR = "#F4EFE4";
/** Public origin after Cloudflare Pages project `tinta` is created. Override with VITE_PUBLIC_SITE_URL. */
export const SITE_ORIGIN = (
  typeof import.meta !== "undefined" && import.meta.env?.VITE_PUBLIC_SITE_URL
    ? String(import.meta.env.VITE_PUBLIC_SITE_URL)
    : "https://tinta.pages.dev"
).replace(/\/$/, "");
