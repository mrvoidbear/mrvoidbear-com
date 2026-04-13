# mrvoidbear.com

Personal CV and blog: **Astro** + **Bun** + **TypeScript**, styled to match the void-bear artwork in `assets/` (also copied to `public/images/` for static hosting).

## Commands

| Command        | Action                          |
| -------------- | ------------------------------- |
| `bun install`  | Install dependencies            |
| `bun dev`      | Dev server at `localhost:4321`  |
| `bun run build` | Production build (`dist/`)     |
| `bun run deploy` | Deploy Worker (`wrangler deploy --config dist/server/wrangler.json`) after a build |
| `bun preview`  | Preview (Astro)                 |
| `bun run check` | `astro check` (types)          |
| `./scripts/gen-brand-assets.sh` | Copy `assets/logo-64.png` → header; build favicons from `assets/favicon-32.png` (ImageMagick) |

## Cloudflare Workers

Production domain: **https://mrvoidbear.com** (`site` is set in `astro.config.mjs`). The app uses [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/): build output is a **Worker** plus static assets under `dist/client`, not a flat static-only `dist/` upload.

**Deploy:** run `bun run build`, then `bun run deploy` (requires Wrangler auth). Details, dashboard/Git settings, and troubleshooting: **[docs/deploy-cloudflare.md](docs/deploy-cloudflare.md)**.

The build emits `/rss.xml` and `sitemap-index.xml` (via `@astrojs/rss` / `@astrojs/sitemap`).
