# Cloudflare Workers: deploy `mrvoidbear.com`

The site uses **`@astrojs/cloudflare`**: the production build is a **Worker** that serves prerendered HTML and static files from **`dist/client`**, with the script entry at **`dist/server/entry.mjs`**.

Production URL: **https://mrvoidbear.com** (`site` in `astro.config.mjs`).

## Local build and deploy

```bash
bun install
bun run build
bun run deploy
```

`deploy` runs `wrangler deploy --config dist/server/wrangler.json`. You need `CLOUDFLARE_API_TOKEN` (and typically `CLOUDFLARE_ACCOUNT_ID` for non-interactive use) in the environment, or be logged in via `wrangler login`.

## Cloudflare dashboard (Git → Workers)

Create or use a **Workers** project (not Pages). Typical settings:

| Step | Command / value |
|------|------------------|
| Install | `bun install` or `npm ci` |
| Build | `bun run build` or `npm run build` |
| Deploy | `npx wrangler deploy --config dist/server/wrangler.json` |

If the build image has no **Bun**, use **npm** and commit a lockfile as appropriate.

**Do not** set `pages_build_output_dir` in [`wrangler.toml`](../wrangler.toml) for this setup; that is for **Pages** only and can confuse Wrangler when merging configs.

## Bindings

With the current Astro config, the Worker only needs the generated **assets** binding (`ASSETS` → `dist/client`). There is no KV or Cloudflare Images binding unless you change [`astro.config.mjs`](../astro.config.mjs) (for example, default adapter settings add KV for sessions and Images for runtime image transforms).

## Custom domain

**Workers & Pages** → your Worker → **Triggers** / **Custom Domains** → attach **mrvoidbear.com** per Cloudflare’s docs.

## Troubleshooting

### `The name 'ASSETS' is reserved in Pages projects`

Root **`wrangler.toml`** was treated as a **Pages** project (for example, `pages_build_output_dir` was set). Remove Pages-only fields when deploying a **Worker** with `@astrojs/cloudflare`.

### Old error: `main = "src/index.ts"` / `[assets]`

That message appears when **`wrangler deploy`** runs without a valid Worker + assets config. After **`bun run build`**, always point Wrangler at **`dist/server/wrangler.json`**, or use **`bun run deploy`**.

### `nodejs_compat`

[`wrangler.toml`](../wrangler.toml) enables **`nodejs_compat`** so the session driver used at build time behaves correctly in the Workers runtime. If you change session or image settings, you may need to adjust flags or bindings.
