// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/guides/deploy/cloudflare/
// Static output: deploy the `dist/` folder to Cloudflare Pages (build command + output directory).
export default defineConfig({
	site: 'https://mrvoidbear.com',
	integrations: [sitemap()],
});
