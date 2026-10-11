/**
 * Converts the 2020 brand photography to WebP at sensible web dimensions.
 *
 * We ship ONE width per photo, not a hand-rolled srcset — next/image generates
 * responsive variants at request time on Vercel, so pre-baking them would be
 * both larger and worse.
 *
 * The two shoe cut-outs are RGBA. They must stay WebP (which supports alpha);
 * flattening them to JPEG would put a black box behind each shoe.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { statSync } from "node:fs";

const OUT = "public/img";
mkdirSync(OUT, { recursive: true });

const jobs = [
  { src: "assets/source/photos/hero-artesano.jpg", out: "hero-artesano.webp", width: 1920, opts: { quality: 72 } },
  { src: "assets/source/photos/nuestros-pasos.jpg", out: "nuestros-pasos.webp", width: 1920, opts: { quality: 74 } },
  { src: "assets/source/photos/calzado-caballero.png", out: "calzado-caballero.webp", width: 720, opts: { quality: 82, alphaQuality: 90 } },
  { src: "assets/source/photos/calzado-dama.png", out: "calzado-dama.webp", width: 720, opts: { quality: 82, alphaQuality: 90 } },
];

let before = 0;
let after = 0;

for (const { src, out, width, opts } of jobs) {
  const meta = await sharp(src).metadata();
  const dest = `${OUT}/${out}`;

  await sharp(src).resize({ width, withoutEnlargement: true }).webp(opts).toFile(dest);

  const outMeta = await sharp(dest).metadata();
  const inSize = statSync(src).size;
  const outSize = statSync(dest).size;
  before += inSize;
  after += outSize;

  // Guard the alpha channel explicitly — losing it is silent and ugly.
  if (meta.hasAlpha && !outMeta.hasAlpha) {
    console.error(`  ✗ ${out}: alpha channel lost`);
    process.exit(1);
  }

  console.log(
    `  ${out.padEnd(24)} ${meta.width}x${meta.height} → ${outMeta.width}x${outMeta.height}  ` +
      `${String(Math.round(inSize / 1024)).padStart(4)}KB → ${String(Math.round(outSize / 1024)).padStart(4)}KB` +
      `${meta.hasAlpha ? "  (alpha preserved)" : ""}`,
  );
}

console.log(`\n✓ ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB (-${Math.round((1 - after / before) * 100)}%)`);
