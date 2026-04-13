/**
 * Public persona + CV facts. No legal name and no employer names (per site policy).
 * Primary bio line is aligned with the public GitHub profile tagline.
 */
export const persona = {
	displayName: 'Void Bear',
	title: 'Startup veteran and technologist',
	tagline: ' I\'m here for the tech.',
	links: {
		x: 'https://x.com/mrvoidbear',
		github: 'https://github.com/mrvoidbear',
		githubOrg: 'https://github.com/voidbear-io',
	},
} as const;

export type CvHighlight = string;

export type CvRole = {
	title: string;
	period: string;
	context: string;
	highlights: CvHighlight[];
};

export const summary = [
	'I\'ve run teams and built startups, reliable tools, software, and infra.',
	'I also write: on techology, startups, and life.',
].join(' ');

export const focusAreas = [
	'Platform & API design',
	'Delivery under constraints',
	'Technical writing & developer experience',
	'Reliability, observability, and pragmatic architecture',
];

export const experience: CvRole[] = [
	{
		title: 'Principal / staff-level engineering',
		period: 'Recent years',
		context: 'Large-scale distributed systems; cross-team technical direction.',
		highlights: [
			'Shaped roadmaps where platform work enables product velocity without sacrificing safety.',
			'Partnered across product, security, and infrastructure to turn ambiguous requirements into incremental releases.',
		],
	},
	{
		title: 'Lead engineer',
		period: 'Prior chapter',
		context: 'High-traffic services and internal developer tooling.',
		highlights: [
			'Reduced incident frequency through better runbooks, guardrails, and ownership boundaries.',
			'Mentored engineers through design reviews and crisp written proposals.',
		],
	},
	{
		title: 'Senior engineer',
		period: 'Earlier career',
		context: 'Product engineering with a growing focus on maintainability.',
		highlights: [
			'Delivered customer-facing features end-to-end: discovery, implementation, rollout, and follow-up.',
			'Invested in tests and automation where they meaningfully reduce future risk.',
		],
	},
];

export const writing = [
	{ label: 'X', href: persona.links.x },
	{ label: 'GitHub (profile)', href: persona.links.github },
	{ label: 'GitHub (voidbear-io)', href: persona.links.githubOrg },
];

/** Broad stack signals; tune to match what you want to emphasize publicly. */
export const skills = [
	{ label: 'Languages', items: ['TypeScript', 'C#', 'Go', 'SQL'] },
	{ label: 'Systems', items: ['REST & event-driven APIs', 'Cloud-native services',  'Observability'] },
	{ label: 'Practice', items: ['Documentation', 'Review', 'Security', 'Automation', 'Research & Development'] },
];

export type Project = {
	name: string;
	summary: string;
	role: string;
};

/** Representative work without naming products or employers. */
export const projects: Project[] = [
	{
		name: 'FinTech Portfolio Platform',
		summary:
			'An early employee at a fintech startup that built a platform for portfolios in a niche market.',
		role: 'Many rolls from devops, developer, IT, system admin, security and a C-Level position.',
	},
	{
		name: 'Investment Manager Firm',
		summary:
			'Built a custom portfolio management system for a niche market that was a precursor to the modern portfolio management systems.',
		role: 'Senior developer and manager that built parts of the system and internal tooling.',
	},
	{
		name: 'Government Contracting & Consultant',
		summary: 'Multiple projects that required a clearance and travel to work on.',
		role: 'Senior developer and consultant that worked on secret and non-secret projects.',
	},
];

/** Longer-form intro for /about (edit freely). */
export const about = {
	/** Short line under the title */
	intro:
		'This site is my public notebook: a CV, a blog, and links to where I hang out online. No employer names: just how I like to work and what I care about.',
	paragraphs: [
		'I go by Void Bear online. I’ve spent years building and operating software where reliability, clarity, and shipping actually matter: platforms, APIs, and the glue between teams when requirements get fuzzy.',
		'I believe good engineering is part craft and part communication: design docs that earn their length, code review that teaches, and observability that answers questions before pager fatigue sets in.',
		'Outside of day-job work, I write here and on X, tinker on GitHub, and keep a lightweight /now page when I want to snapshot what I’m focused on.',
	],
} as const;

/**
 * Snapshot for /now: update the label when you change the bullets.
 * Each bullet may include trusted HTML (e.g. `<a href="...">`), rendered with `set:html` on `/now`.
 */
export const now = {
	updatedLabel: 'April 2026',
	bullets: [
		'I\'m looking for a new opportunity to work on interesting problems and build something new.',
		'Migrating my opensource work from the <a href="https://github.com/frostyeti">frostyeti organization</a> to the <a href="https://github.com/voidbear-io">voidbear.io organization</a>.',
		'Publishing engineering notes on this site and the <a href="/blog">blog</a>.',
		'Always happy to talk shop. Reach out on <a href="https://x.com/mrvoidbear">X</a>.',
	],
} as const;
