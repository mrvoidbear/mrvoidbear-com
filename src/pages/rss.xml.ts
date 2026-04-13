import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
	const site = context.site;
	if (!site) {
		throw new Error('Add `site` in astro.config so RSS item URLs resolve.');
	}

	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	return rss({
		title: 'Void Bear — Blog',
		description: 'Essays on engineering, platforms, and shipping.',
		site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description,
			link: `/blog/${post.id}/`,
		})),
		customData: `<language>en-us</language>`,
	});
};
