// @ts-check
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import { defineConfig, sessionDrivers } from 'astro/config';

// https://docs.astro.build/en/guides/integrations-guide/cloudflare/
export default defineConfig({
	site: 'https://mrvoidbear.com',
	output: 'static',
	adapter: cloudflare({
		// Build-time optimization only; no Cloudflare Images (IMAGES) binding on the Worker.
		imageService: 'compile',
	}),
	// Default Cloudflare adapter uses KV for sessions; this site is static and does not need it.
	session: {
		driver: sessionDrivers.lruCache(),
	},
	integrations: [sitemap()],
});
