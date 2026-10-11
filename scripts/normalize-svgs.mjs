/**
 * Normalizes the Illustrator-exported SVGs from the brand pack.
 *
 * Every source file carries a `<defs><style>` block using generic `.cls-1…N`
 * class names. Those names are NOT unique across files — `.cls-1` means several
 * different things across beneficio-1..4 alone — so inlining two of them into
 * the same document would make their rules collide and both render wrong.
 *
 * Generic UI icons (menu, chevron, map pin, phone, mail, search) come from
 * lucide-react, the icon set shadcn/ui uses. Only brand art lives here, and
 * all of it is rendered via <img>. Two tiers — see README.
 */
import { optimize } from "svgo";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, basename, dirname } from "node:path";

const SRC = "assets/source/svg";

const configs = {
  // Multi-colour brand art (logos, wordmarks). Loaded as separate documents,
  // so their class rules are already scoped. Touch as little as possible and
  // never convert colours.
  brand: {
    multipass: true,
    plugins: [
      { name: "preset-default", params: { overrides: { mergePaths: false, convertPathData: false } } },
    ],
  },

  // Single-colour illustrations and social marks. Flattened so no scoped CSS
  // survives, which keeps them safe to inline if that's ever needed.
  //
  // Deliberately NOT currentColor: inside an <img>-loaded SVG, currentColor
  // resolves against that SVG's own root colour, which defaults to black.
  standalone: {
    multipass: true,
    plugins: [
      { name: "preset-default", params: { overrides: { mergePaths: false } } },
      // `onlyMatchedOnce` defaults to TRUE, which SKIPS any selector matching
      // more than one element — i.e. exactly `.cls-1` on 5 paths in
      // beneficio-1.svg. Left at the default this silently no-ops.
      { name: "inlineStyles", params: { onlyMatchedOnce: false, removeMatchedSelectors: true } },
      "convertStyleToAttrs",
      "removeStyleElement",
      "removeDimensions",
    ],
  },
};

/** Tier and output path for each source file. */
function routeOf(name) {
  if (name.startsWith("logo-") || name.startsWith("wordmark-")) return { tier: "brand", out: `public/brand/${name}` };
  if (name.startsWith("beneficio-")) return { tier: "standalone", out: `public/icons/${name}` };
  if (name.startsWith("social-")) return { tier: "standalone", out: `public/icons/social/${name.replace(/^social-/, "")}` };
  throw new Error(`normalize-svgs: no tier assigned for ${name}`);
}

const failures = [];
let count = 0;

for (const file of readdirSync(SRC).filter((f) => f.endsWith(".svg")).sort()) {
  const name = basename(file);
  const { tier, out } = routeOf(name);
  const input = readFileSync(join(SRC, file), "utf8");
  const { data } = optimize(input, { path: join(SRC, file), ...configs[tier] });

  // ── The safety net ──────────────────────────────────────────────────────
  // If the flattening silently no-opped, one of these still shows up. Fail
  // here rather than discovering it visually in production.
  if (tier === "standalone") {
    if (/<style/i.test(data)) failures.push(`${name}: <style> block survived flattening`);
    if (/\sclass=/i.test(data)) failures.push(`${name}: class attribute survived flattening`);
    if (/currentColor/i.test(data)) failures.push(`${name}: currentColor in an <img>-loaded SVG renders BLACK`);
  }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, data);
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
