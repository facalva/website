# FACALVA — Website

Landing page for FACALVA, a Guatemalan leather footwear manufacturer with two
sub-brands: **Alvarado Collection** (men's) and **mónica** (women's).

Built from the 2020 brand package (`Guía de estilo web FACALVA` plus the
desktop / tablet / mobile comps).

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · shadcn/ui (Radix) · lucide icons · TypeScript.

Every section is a Server Component. Client code is limited to shadcn's
Radix-backed primitives: the navigation drawer (`sheet`) and `separator`.

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
npm run prep:svg     # normalize brand SVGs → public/
npm run prep:img     # photos → optimized WebP in public/img/
```

Font conversion is a one-off (see "Typography").

## Design tokens

All tokens live in `src/app/globals.css`, in two layers:

1. **Brand tokens** (`@theme`) — the palette, type scale and tracking values
   transcribed from the style guide.
2. **shadcn theme** (`:root` + `@theme inline`) — the structure `shadcn init`
   generates, with the brand mapped onto shadcn's semantic variables
   (`--primary`, `--background`, `--border`, …). Every shadcn component reads
   these, so components are styled here rather than in their source. See
   "UI components" below for the mapping.

Colours are **hex, not OKLCH**. These are contractual brand values from a PDF;
converting them produces values nobody can verify against the guide and that
are only *almost* right. Tailwind still emits `color-mix(in oklab, …)` for
alpha modifiers, so nothing is lost.

There is **no dark mode**. The guide defines one light palette, every comp is
light, and `logo-monica.svg` is magenta-on-white with no dark counterpart.

`--radius: 0` — the comps are square-cornered throughout. Every `rounded-*`
class in the shadcn components resolves through it.

## UI components (shadcn/ui)

UI primitives come from [shadcn/ui](https://ui.shadcn.com), installed with its
CLI into `src/components/ui/`. They are **not** hand-written; don't add a
component shadcn already provides — install it instead.

| Component | Used for |
|---|---|
| `button` | 404 call-to-action, drawer trigger and links, search submit |
| `sheet` | Tablet/mobile navigation drawer (`layout/mobile-nav.tsx`) |
| `separator` | Hairline rules: hero, "Lo que ofrecemos", drawer |
| `input-group` (+ `input`, `textarea`) | Header search field (`layout/search-field.tsx`) |

Configuration lives in `components.json` (Radix base, `radix-nova` style,
lucide icons). Icons come from `lucide-react`, the set shadcn's own components
use, drawn at `strokeWidth={1.5}` to match the guide's thin outline style.

### Adding a component

```bash
npx shadcn@latest add <name>        # e.g. dropdown-menu, checkbox, command
```

The guide already specifies dropdowns, checkboxes, tags and a search
autocomplete for the collection pages; those map to `dropdown-menu`/`select`,
`checkbox`, `badge`/`toggle-group` and `command` + `popover`.

> **Cloud sessions:** the CLI fetches from `ui.shadcn.com`, which isn't on the
> default *Trusted* network allowlist. The environment needs **Network access →
> Custom** with `ui.shadcn.com` added and **"Also include default list of
> common package managers"** checked (otherwise npm is blocked too).

### How the brand maps onto shadcn

| shadcn variable | Value | Brand role |
|---|---|---|
| `--primary` / `--primary-foreground` | `#8e7d6b` / `#ffffff` | Taupe — the guide's primary accent |
| `--background` / `--foreground` | `#ffffff` / `#532400` | Page and body copy |
| `--secondary` | `#bfb2a7` | Secondary taupe |
| `--muted` / `--accent` / `--card` | `#e9e9e9` / `#f3f2f0` / `#f3f2f0` | Surfaces |
| `--border` / `--input` | `#bfb2a7` / `#8e7d6b` | Hairlines, field outlines |
| `--destructive` / `--ring` | `#934c1c` | "Alertas y búsqueda" burnt orange |
| `--radius` | `0` | Square corners |
| `--font-sans` | Proxima Nova | Set by `next/font` in `src/app/fonts.ts` |

`--chart-*` and `--sidebar-*` are unused but mapped to the palette, so those
components arrive on-brand if added.

### Local edits to shadcn source

Styling goes through the theme. These are the only edits to CLI-generated
files — re-apply them if a component is reinstalled with `--overwrite`:

| File | Edit | Why |
|---|---|---|
| `ui/button.tsx` | `default` variant: `font-bold`, `border-primary`, hover → `bg-background text-primary` | Guide's "Botones / Primario": filled taupe, inverting to white + taupe border |
| `ui/sheet.tsx` | Close button's sr-only label `Close` → `Cerrar` | Site is in Spanish |

`init` also inserts Geist as `--font-sans` in `layout.tsx` and a `.dark`
block in `globals.css`; both were removed (Proxima is the brand face, and the
site is light-only). `@custom-variant dark` is kept on purpose — it scopes
shadcn's `dark:` utilities to a `.dark` class that's never set, so they stay
inert on a dark-mode OS.

`cn()` comes from shadcn's [`cn`](https://github.com/shadcn-ui/cn) package (a
drop-in for clsx + tailwind-merge), re-exported from `src/lib/utils.ts`.

## Feature flags

Designed-but-unfinished features are hidden, not deleted, via `features` in
`src/content/site.ts`:

| Flag | Hides | Turn on when |
|---|---|---|
| `secondaryNav` | Nuestros Pasos / Contacto links (header + drawer) | Those pages exist |
| `search` | Header search field | Search is implemented |
| `socialLinks` | Footer social icons | Instagram/Twitter/Facebook handles are confirmed — the current ones are guesses |

While `secondaryNav` and `search` are off, the desktop header is balanced as
Alvarado Collection · FACALVA · mónica. Turning either on restores the comp's
layout (both sub-brands left, nav + search right). All three are verified to
build and render with the flag on.

## SVG handling

Every file in the brand pack is an Illustrator export carrying a
`<defs><style>` block with generic `.cls-1…N` class names. Those names are not
unique across files — `.cls-1` means three different things across
`beneficio-1..4` alone — so inlining two of them into one document makes their
rules collide and both render wrong.

`scripts/normalize-svgs.mjs` removes the possibility rather than guarding
against it: after the pass no `<style>` block and no `class` attribute
survives. It asserts this and exits non-zero if anything slipped through.

Generic UI icons (menu, chevron, map pin, phone, mail, search) are
`lucide-react`, not brand files. What remains is brand art, all rendered via
`<img>`, in two tiers:

| Tier | Files | Output | Treatment |
|---|---|---|---|
| Brand art | `logo-*`, `wordmark-*` | `public/brand/` | Multi-colour, never recoloured; already scoped as separate documents |
| Standalone | `beneficio-*`, `social-*` | `public/icons/`, `public/icons/social/` | Style blocks flattened; literal `#8e7d6b` kept |

⚠ The literal hex is load-bearing. Inside an `<img>`-loaded SVG, `currentColor`
resolves against that SVG's own root colour — which defaults to **black**.
The social marks are brand files rather than lucide because lucide has no
WhatsApp icon and has deprecated its brand icons.

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

- **Search, secondary nav and social links are hidden** behind feature flags
  (see above) until they're functional. The comp's search autocomplete needs a
  product index; it maps to shadcn `command` + `popover`.
- **Sub-brand links are placeholders** (`href="#"`). This is the landing page
  only; the collection pages don't exist yet. A brand-styled `not-found.tsx`
  ships as insurance.
- **Address** is transcribed verbatim from the comp
  ("0 avenida C 3-36 zona 4 de Mixco…") and is worth confirming.
- `npm audit` reports transitive advisories in the eslint / postcss / sharp
  chains pinned by Next 16 itself. All are build-time only; no non-breaking fix
  is currently available.
