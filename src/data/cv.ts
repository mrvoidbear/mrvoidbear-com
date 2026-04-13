/**
 * Public persona + CV facts. No legal name and no employer names (per site policy).
 * Primary bio line is aligned with the public GitHub profile tagline.
 */
export const persona = {
	displayName: 'Void Bear',
	title: 'Software engineer & writer',
	tagline: 'Gritty and grizzled bear that writes about technology and startups.',
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
	'I build reliable software in complex domains, with a bias for clear interfaces, measurable outcomes, and teams that ship.',
	'I also write: long-form notes on engineering practice, platform decisions, and what it takes to bring products from idea to production.',
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

/** Broad stack signals—tune to match what you want to emphasize publicly. */
export const skills = [
	{ label: 'Languages', items: ['TypeScript', 'C#', 'Go', 'SQL'] },
	{ label: 'Systems', items: ['REST & event-driven APIs', 'Cloud-native services', 'Observability'] },
	{ label: 'Practice', items: ['Design docs', 'Code review', 'On-call & incident response'] },
];

export type Project = {
	name: string;
	summary: string;
	role: string;
};

/** Representative work without naming products or employers. */
export const projects: Project[] = [
	{
		name: 'Platform control plane',
		summary:
			'Unified APIs and workflows for provisioning, configuration, and safe rollout of internal services.',
		role: 'Architecture and incremental migration from legacy paths.',
	},
	{
		name: 'Developer portal',
		summary:
			'Docs, service catalog, and golden paths so teams ship faster with fewer one-off integrations.',
		role: 'End-to-end ownership from information design to implementation.',
	},
	{
		name: 'Reliability program',
		summary: 'SLOs, error budgets, and post-incident learning loops tied to real customer impact.',
		role: 'Cross-functional facilitation and tooling where it removes toil.',
	},
];

/** Snapshot for /now — update the label when you change the bullets. */
export const now = {
	updatedLabel: 'April 2026',
	bullets: [
		'Publishing engineering notes on this site and the blog.',
		'Interested in clear platform boundaries, small batches, and writing that survives handoffs.',
		'Always happy to talk shop—reach out on X.',
	],
} as const;
