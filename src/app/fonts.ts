import localFont from "next/font/local";

/**
 * Proxima Nova — the brand typeface, subset to Latin and converted to WOFF2
 * by `scripts/` (see README). 92KB OTF → 14KB WOFF2 per weight.
 *
 * Regular (400) and Bold (700) only. The guide uses Light 300 exclusively for
 * breadcrumbs, which this page doesn't have; the OTF stays in assets/source/
 * for whenever a page needs it.
 *
 * ⚠ Licensing: Proxima Nova requires a webfont licence to self-host — an Adobe
 * Fonts subscription does not cover it. All font config lives in this one file
 * behind --font-sans, so swapping to a licensed alternative (Montserrat is the
 * usual stand-in) is a single-file change.
 */
export const proxima = localFont({
  src: [
    { path: "./fonts/ProximaNova-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ProximaNova-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-proxima",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "Helvetica Neue", "Arial", "sans-serif"],
  // Metric overrides on the fallback so the swap doesn't reflow the hero.
  adjustFontFallback: "Arial",
});
