# FACALVA — Website

Landing page for FACALVA, a Guatemalan leather footwear manufacturer with two
sub-brands: **Alvarado Collection** (men's) and **mónica** (women's).

Built from the 2020 brand package (`Guía de estilo web FACALVA` plus the
desktop / tablet / mobile comps).

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Radix primitives · TypeScript.

Every section is a Server Component. The only client boundary on the page is the
mobile navigation drawer.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
```

### Asset pipeline

Source assets live in `assets/source/` and are committed but never deployed.
The pipeline is run manually — its outputs are checked in, so a normal build
needs none of it:

```bash
npm run prep         # both of the below
npm run prep:svg     # normalize SVGs → public/, regenerate icon components
npm run prep:img     # photos → optimized WebP in public/img/
```

Font conversion is a one-off (see "Typography").

## Design tokens

All tokens live in `src/app/globals.css`, in two layers:

1. **Brand tokens** (`@theme`) — the palette, type scale and tracking values
   transcribed from the style guide.
2. **Semantic layer** (`:root` + `@theme inline`) — maps those onto the
   conventional `--primary` / `--background` / `--border` names so UI
   primitives inherit the brand without per-component overrides.

Colours are **hex, not OKLCH**. These are contractual brand values from a PDF;
converting them produces values nobody can verify against the guide and that
are only *almost* right. Tailwind still emits `color-mix(in oklab, …)` for
alpha modifiers, so nothing is lost.

There is **no dark mode**. The guide defines one light palette, every comp is
light, and `logo-monica.svg` is magenta-on-white with no dark counterpart.

`--radius: 0` — the comps are square-cornered throughout.

## SVG handling

Every file in the brand pack is an Illustrator export carrying a
`<defs><style>` block with generic `.cls-1…N` class names. Those names are not
unique across files — `.cls-1` means three different things across
`beneficio-1..4` alone — so inlining two of them into one document makes their
rules collide and both render wrong.

`scripts/normalize-svgs.mjs` removes the possibility rather than guarding
against it: after the pass no `<style>` block and no `class` attribute
survives. It asserts this and exits non-zero if anything slipped through.

Three tiers, deliberately on different configs:

| Tier | Files | Output | Rendering |
|---|---|---|---|
| Brand art | `logo-*`, `wordmark-*` | `public/brand/` | `<img>` — multi-colour, never recoloured, already scoped as separate documents |
| UI icons | `icon-*` | `src/components/icons/` | Inlined TSX with `stroke="currentColor"` so Tailwind text utilities drive colour |
| Illustrations | `beneficio-*` | `public/icons/` | `<img loading="lazy">`, keeping a literal `#8e7d6b` |

⚠ The third row's literal hex is load-bearing. Inside an `<img>`-loaded SVG,
`currentColor` resolves against that SVG's own root colour — which defaults to
**black**. Tiers 2 and 3 must not share a config.

`<img>` is used rather than `next/image` for SVGs: the latter requires
`dangerouslyAllowSVG`, which enables SVG handling app-wide, and Next cannot
optimize an SVG anyway.

### The FACALVA wordmark is text, not an image

`Facalva logo principal.svg` contains a live `<text>` element in
ProximaNova-Bold. As an `<img>` it falls back to a serif; inlined it is a
fixed-offset tspan layout that cannot reflow and is invisible to search and
assistive tech. Since Proxima Bold is already loaded, the mark is set as real
text in `components/brand/facalva-wordmark.tsx`.

That component carries `margin-inline-end: -0.16em`. CSS `letter-spacing` adds
its gap after the *final* letter too, which pushes a wide-tracked wordmark off
true centre inside a centred grid cell. Cancelling it lands the mark at 50.1%
of the viewport against the comp's 49.7%.

`AC Header.svg` and `Monica Header.svg` are outlined paths, so those stay as
images — "mónica" in particular is custom lettering and must never be typeset.

## Typography

Proxima Nova, subset to Latin and converted to WOFF2 (92 KB OTF → 14 KB each):

```bash
python3 -m pip install "fonttools[woff]" brotli
python3 -m fontTools.subset "assets/source/fonts/ProximaNova-Regular.otf" \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+2000-206F,U+2074,U+20AC,U+2122,U+2212,U+FEFF,U+FFFD" \
  --layout-features="kern,liga,calt" --flavor=woff2 \
  --output-file="src/app/fonts/ProximaNova-Regular.woff2"
```

Regular (400) and Bold (700) only — the guide uses Light 300 solely for
breadcrumbs, which this page doesn't have. The OTF stays in `assets/source/`.

> **Licensing — needs resolving before launch.** Proxima Nova requires a
> webfont licence to self-host; an Adobe Fonts subscription explicitly does not
> cover it, and the files in the brand pack are desktop OTFs. All font config
> is isolated in `src/app/fonts.ts` behind `--font-sans`, so swapping to a
> licensed alternative (Montserrat is the usual stand-in) is a one-file change.

## Deviations from the comps

Three, all deliberate:

1. **Collections stay on mobile, stacked.** The mobile comp drops the
   Alvarado / mónica panels entirely. They are the only on-page route to either
   product line, so dropping them on the highest-traffic breakpoint leaves the
   drawer as the sole path to the primary CTA. Toggle
   `SHOW_COLLECTIONS_ON_MOBILE` in `src/content/site.ts` to match the comp
   exactly.

2. **Benefit body copy is `#532400`, not taupe.** The comp sets it in
   `#8e7d6b` on white — roughly 2.9:1, below the 4.5:1 WCAG AA minimum for body
   text. It now uses the guide's own designated text colour (~10:1). Taupe is
   retained for icons, hairlines and the large `CALZADO / PARA CABALLERO`
   display type, which passes the 3:1 large-text threshold.

3. **Focus and hover states added.** The comps show none. Purely additive.

## Known scope limits

- **Search is deliberately inert.** No product catalogue exists yet, so the
  header field is rendered per the guide but disabled and visibly
  de-emphasised — a control that looks live but does nothing is worse than one
  that reads as not-yet-available. The comp's autocomplete dropdown needs a
  product index and is out of scope.
- **Nav links are placeholders** (`href="#"`). This is the landing page only;
  the collection, Nuestros Pasos and Contacto routes don't exist yet. A
  brand-styled `not-found.tsx` ships as insurance.
- **Address** is transcribed verbatim from the comp
  ("0 avenida C 3-36 zona 4 de Mixco…") and is worth confirming.
- `npm audit` reports transitive advisories in the eslint / postcss / sharp
  chains pinned by Next 16 itself. All are build-time only; no non-breaking fix
  is currently available.
