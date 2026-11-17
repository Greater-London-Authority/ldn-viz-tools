// Demo data for the example layouts. It describes fictional teams using the
// design system, so that no figure can be read as a fact about London.
// Values come from fixed formulas rather than Math.random, so the examples
// render the same way every time.

export const teams = ['Heron', 'Kestrel', 'Otter', 'Badger', 'Wren'] as const;
export type Team = (typeof teams)[number];

export const componentGroups = ['Buttons', 'Inputs', 'Charts', 'Maps', 'Tables'] as const;
export type ComponentGroup = (typeof componentGroups)[number];

export const months = Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2026, i, 1)));

const wave = (i: number, phase: number) => Math.round(10 * Math.sin((i + phase) / 2));

export type UsageRow = {
	month: Date;
	team: Team;
	group: ComponentGroup;
	/** Number of times a team's apps rendered a component from the group, in thousands. */
	renders: number;
};

export const usage: UsageRow[] = months.flatMap((month, m) =>
	teams.flatMap((team, t) =>
		componentGroups.map((group, g) => ({
			month,
			team,
			group,
			renders: Math.max(2, 20 + t * 6 + g * 4 + m * (t + 1) + wave(m, t + g))
		}))
	)
);

export type ComponentViews = { component: string; group: ComponentGroup; views: number };

/** Storybook page views for each component in the latest month. */
export const componentViews: ComponentViews[] = [
	{ component: 'Button', group: 'Buttons', views: 1840 },
	{ component: 'Select', group: 'Inputs', views: 1520 },
	{ component: 'ChartContainer', group: 'Charts', views: 1310 },
	{ component: 'RadioButtonGroup', group: 'Inputs', views: 1180 },
	{ component: 'Map', group: 'Maps', views: 960 },
	{ component: 'Table', group: 'Tables', views: 870 },
	{ component: 'CheckboxGroup', group: 'Inputs', views: 640 },
	{ component: 'LayerControlGroup', group: 'Maps', views: 410 }
];

export type Release = { version: string; month: Date; issuesClosed: number; issuesOpened: number };

export const releases: Release[] = months.map((month, m) => ({
	version: `4.${m}.0`,
	month,
	issuesClosed: 12 + ((m * 7) % 11),
	issuesOpened: 9 + ((m * 5) % 9)
}));

export type Workshop = {
	id: string;
	name: string;
	type: 'workshop' | 'drop-in' | 'research';
	team: Team;
	attendees: number;
	coordinates: [number, number];
};

/** Fictional design system sessions, placed around central London. */
export const workshops: Workshop[] = [
	{
		id: 'w1',
		name: 'Tokens 101',
		type: 'workshop',
		team: 'Heron',
		attendees: 24,
		coordinates: [-0.1276, 51.5072]
	},
	{
		id: 'w2',
		name: 'Charts clinic',
		type: 'drop-in',
		team: 'Kestrel',
		attendees: 9,
		coordinates: [-0.0877, 51.5155]
	},
	{
		id: 'w3',
		name: 'Filter panel testing',
		type: 'research',
		team: 'Otter',
		attendees: 6,
		coordinates: [-0.1419, 51.5014]
	},
	{
		id: 'w4',
		name: 'Accessible maps',
		type: 'workshop',
		team: 'Badger',
		attendees: 31,
		coordinates: [-0.0759, 51.5081]
	},
	{
		id: 'w5',
		name: 'Card layouts',
		type: 'drop-in',
		team: 'Wren',
		attendees: 12,
		coordinates: [-0.1657, 51.5226]
	},
	{
		id: 'w6',
		name: 'Dashboard interviews',
		type: 'research',
		team: 'Heron',
		attendees: 5,
		coordinates: [-0.1043, 51.5308]
	},
	{
		id: 'w7',
		name: 'Flow and spacing',
		type: 'workshop',
		team: 'Kestrel',
		attendees: 18,
		coordinates: [-0.0235, 51.5054]
	},
	{
		id: 'w8',
		name: 'Tables drop-in',
		type: 'drop-in',
		team: 'Otter',
		attendees: 7,
		coordinates: [-0.1944, 51.4975]
	}
];

export type Report = { id: string; title: string; published: string; summary: string };

export const reports: Report[] = [
	{
		id: 'r1',
		title: 'Component adoption review',
		published: 'March 2026',
		summary: 'Which components each team uses, and which they have replaced with their own.'
	},
	{
		id: 'r2',
		title: 'Accessibility audit summary',
		published: 'May 2026',
		summary: 'Contrast and keyboard checks across the five teams’ apps.'
	},
	{
		id: 'r3',
		title: 'Token migration progress',
		published: 'July 2026',
		summary: 'How far each team has moved from version 3 tokens to version 4.'
	},
	{
		id: 'r4',
		title: 'Chart usage survey',
		published: 'September 2026',
		summary: 'The chart types teams build most, and the ones they ask for.'
	},
	{
		id: 'r5',
		title: 'Documentation feedback round-up',
		published: 'November 2026',
		summary: 'What readers of the docs site and Storybook asked for this year.'
	}
];

export const formatMonth = (d: Date) =>
	d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
