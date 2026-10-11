/**
 * Normalizes the Illustrator-exported SVGs from the brand pack.
 *
 * Every source file carries a `<defs><style>` block using generic `.cls-1…N`
 * class names. Those names are NOT unique across files — `.cls-1` means five
 * different things across beneficio-1..4 alone — so inlining two of them into
 * the same document makes their rules collide and both render wrong.
 *
 * Rather than guard against that at runtime, we remove the possibility: after
 * this pass no `<style>` block and no `class` attribute survives anywhere.
 *
 * Three tiers, three different treatments — see README.
 */
import { optimize } from "svgo";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const SRC = "assets/source/svg";
const OUT_BRAND = "public/brand";
const OUT_ICONS = "public/icons";
const OUT_INLINE = ".svg-inline"; // scratch: path data for the TSX icon components

const BRAND_TAUPE = "#8e7d6b";

/** Flattens `<style>` into presentation attributes. Shared by tiers 2 and 3. */
const flattenPlugins = [
  { name: "preset-default", params: { overrides: { mergePaths: false } } },
  // `onlyMatchedOnce` defaults to TRUE, which SKIPS any selector matching more
  // than one element — i.e. exactly `.cls-1` on 5 paths in beneficio-1.svg.
  // Left at the default this silently no-ops and ships the collision bug.
  { name: "inlineStyles", params: { onlyMatchedOnce: false, removeMatchedSelectors: true } },
  "convertStyleToAttrs",
  "removeStyleElement",
  "removeDimensions",
];

const configs = {
  // Tier 1 — multi-colour brand art. Loaded as separate documents via <img>,
  // so their class rules are already scoped. Touch as little as possible and
  // never convert colours.
  brand: {
    multipass: true,
    plugins: [
      { name: "preset-default", params: { overrides: { mergePaths: false, convertPathData: false } } },
    ],
  },

  // Tier 2 — single-colour UI icons, inlined as React components.
  // #8e7d6b (and the white variants) become currentColor so Tailwind text
  // utilities drive them, which is what hover states need.
  inline: {
    multipass: true,
    plugins: [...flattenPlugins, { name: "convertColors", params: { currentColor: true } }],
  },

  // Tier 3 — decorative illustrations rendered via <img loading="lazy">.
  // NOTE: deliberately NOT currentColor. Inside an <img>-loaded SVG,
  // currentColor resolves against that SVG's own root colour, which defaults
  // to black. Tier 2 and tier 3 must stay on different configs for this reason.
  standalone: {
    multipass: true,
    plugins: flattenPlugins,
  },
};

/** Which tier each file belongs to. */
function tierOf(name) {
  if (name.startsWith("logo-") || name.startsWith("wordmark-")) return "brand";
  if (name.startsWith("beneficio-")) return "standalone";
  if (name.startsWith("icon-")) return "inline";
  throw new Error(`normalize-svgs: no tier assigned for ${name}`);
}

const outDirs = { brand: OUT_BRAND, standalone: OUT_ICONS, inline: OUT_INLINE };
for (const d of Object.values(outDirs)) mkdirSync(d, { recursive: true });

const failures = [];
let count = 0;

for (const file of readdirSync(SRC).filter((f) => f.endsWith(".svg")).sort()) {
  const name = basename(file);
  const tier = tierOf(name);
  const input = readFileSync(join(SRC, file), "utf8");
  const { data } = optimize(input, { path: join(SRC, file), ...configs[tier] });

  // ── The safety net ──────────────────────────────────────────────────────
  // If the flattening silently no-opped, one of these still shows up. Fail the
  // build here rather than discovering it visually in production.
  if (tier !== "brand") {
    if (/<style/i.test(data)) failures.push(`${name}: <style> block survived flattening`);
    if (/\sclass=/i.test(data)) failures.push(`${name}: class attribute survived flattening`);
  }
  if (tier === "inline" && new RegExp(BRAND_TAUPE, "i").test(data)) {
    failures.push(`${name}: literal ${BRAND_TAUPE} survived — should be currentColor`);
  }
  if (tier === "standalone" && /currentColor/i.test(data)) {
    failures.push(`${name}: currentColor in an <img>-loaded SVG renders BLACK`);
  }

  writeFileSync(join(outDirs[tier], name), data);
  const delta = Math.round((1 - data.length / input.length) * 100);
  console.log(`  ${tier.padEnd(10)} ${name.padEnd(28)} ${String(input.length).padStart(6)} → ${String(data.length).padStart(6)} (${delta > 0 ? "-" : "+"}${Math.abs(delta)}%)`);
  count++;
}

if (failures.length) {
  console.error("\nnormalize-svgs FAILED:");
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}

console.log(`\n✓ ${count} SVGs normalized, no scoped CSS survived.`);
