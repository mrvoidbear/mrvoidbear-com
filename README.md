# mrvoidbear.com

Personal CV and blog: **Astro** + **Bun** + **TypeScript**, styled to match the void-bear artwork in `assets/` (also copied to `public/images/` for static hosting).

## Commands

| Command        | Action                          |
| -------------- | ------------------------------- |
| `bun install`  | Install dependencies            |
| `bun dev`      | Dev server at `localhost:4321`  |
| `bun run build` | Production build to `dist/`    |
| `bun preview`  | Preview the `dist/` output      |
| `bun run check` | `astro check` (types)          |
| `./scripts/gen-brand-assets.sh` | Copy `assets/logo-64.png` → header; build favicons from `assets/favicon-32.png` (ImageMagick) |

## Cloudflare Pages

Per [Deploy an Astro site to Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/):

- **Build command:** `bun run build`
- **Build output directory:** `dist`
- **Environment variables:** set `ASTRO_TELEMETRY_DISABLED=1` in CI if the build user cannot write telemetry config.

Optional local preview of the built folder:

```sh
bunx wrangler pages dev dist
```

Update `astro.config.mjs` `site` to your real hostname so canonical URLs, Open Graph images, RSS, and `public/robots.txt` stay correct.

The build emits `/rss.xml` and `sitemap-index.xml` (via `@astrojs/rss` / `@astrojs/sitemap`).
