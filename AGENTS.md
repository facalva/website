<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UI components

- UI primitives come from shadcn/ui via its CLI (`npx shadcn@latest add <name>`) into `src/components/ui/`. Never hand-write a component shadcn provides. If the CLI can't reach `ui.shadcn.com`, stop and say so rather than recreating it by hand.
- Style through the theme variables in `src/app/globals.css`, not by editing component source. Any unavoidable edit to a `ui/` file must be added to the "Local edits to shadcn source" table in `README.md`.
- Icons: `lucide-react`. Brand art (logos, wordmarks, illustrations, social marks) lives in `public/` and is rendered with `<img>`.
- Unfinished features are hidden with the `features` flags in `src/content/site.ts`, not deleted.
