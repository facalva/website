/** Dev-only: full-page screenshots at the style guide's breakpoints. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = process.env.SHOT_DIR ?? ".shots";
const URL = process.env.SHOT_URL ?? "http://localhost:3111/";
const widths = (process.env.SHOT_WIDTHS ?? "375,768,1024,1440").split(",").map(Number);

mkdirSync(OUT, { recursive: true });
// The environment ships a pinned Chromium that may not match this Playwright
// build's expected revision; use it rather than downloading another.
const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: "networkidle" });
  // Force every image to load and wait for it. Without this, below-the-fold
  // lazy images photograph as empty boxes and the screenshot lies about what
  // the page actually renders.
  await page.evaluate(async () => {
    for (const img of document.querySelectorAll("img")) {
      img.loading = "eager";
      if (img.dataset.nimg) img.style.opacity = "1";
    }
    await Promise.all(
      [...document.querySelectorAll("img")].map((img) =>
        img.complete && img.naturalWidth > 0
          ? Promise.resolve()
          : new Promise((r) => {
              img.addEventListener("load", r, { once: true });
              img.addEventListener("error", r, { once: true });
            }),
      ),
    );
    await document.fonts.ready;
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(400);

  // Report anything that genuinely failed to decode.
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll("img")]
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.currentSrc || i.src),
  );
  if (broken.length) console.warn(`  ⚠ broken images: ${broken.join(", ")}`);
  await page.screenshot({ path: `${OUT}/w${width}.png`, fullPage: true });
  console.log(`  ${OUT}/w${width}.png`);
  await page.close();
}

await browser.close();
