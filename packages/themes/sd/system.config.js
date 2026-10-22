/*===============================================
  SYSTEM CLASS NAMES (RFC 0003, workstream 3)
  Every class in system.css is named here. The generator (sd/system.js) reads
  this file and the token dictionary; it never spells a name itself, so a
  rename (RFC 0002) is an edit here, not in the generator.

  Each entry pairs a token segment (what the export calls it) with the class
  name (what the specification calls it). They are the same today.
*/

// Breakpoints the typography tokens are keyed on, in ascending order. `base`
// has no media query; the others take their min-width from
// --primitive-breakpoint-{name} at build time (media queries can't use var()).
export const breakpoints = ['base', 'sm', 'md', 'lg', 'xl'];

// Grid tokens also have a 2xl step.
export const gridBreakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];

// `token` is the typeset segment in --typography-{bp}-{token}-*.
// The default typeset is also set on :root, so a role class outside any
// typeset still resolves. `flow` is the flow context the typeset brings with
// it; `text` is the role bare text inside it takes, so unclassed markup (such
// as rendered Markdown) is set without a class on every element, and a typeset
// nested in another resets text to its own size. `content` scopes the element
// styles in sd/content.css, and the typeset's element aliases, to the typeset
// (see `content` below). A variant is a further class for the same typeset,
// with its own flow and content settings.
export const typesets = [
	{
		token: 'longform',
		className: 'typeset-longform',
		flow: 'spacious',
		text: { role: 'body', size: 'md' },
		content: true,
		measure: true
	},
	{
		token: 'product',
		className: 'typeset-product',
		isDefault: true,
		text: { role: 'body', size: 'md' },
		// Product sets type only: component roots carry it, and their markup
		// must not pick up content styles. Formatted content (Markdown, CMS
		// output) in a product setting takes the variant, which adds flow and
		// content styles. It works alone or beside the base class.
		variants: [
			{ className: 'typeset-product--formatted', flow: 'standard', content: true, measure: true }
		]
	}
];

export const roleProperties = [
	'font-family',
	'font-size',
	'font-weight',
	'letter-spacing',
	'line-height'
];

// Role sets: sm, md and lg, except eyebrow, which has no size.
// `extra` is added to the role class and to every alias of the role, for
// behaviour the role's description requires but no token carries. Secondary
// roles (subhead, subtitle, eyebrow) are set in the muted text colour, which
// the theme switches for dark mode.
const MUTED = { color: 'var(--color-text-muted)' };
export const roles = [
	{ token: 'display', sizes: ['sm', 'md', 'lg'] },
	{ token: 'headline', sizes: ['sm', 'md', 'lg'] },
	{ token: 'subhead', sizes: ['sm', 'md', 'lg'], extra: MUTED },
	{ token: 'title', sizes: ['sm', 'md', 'lg'] },
	{ token: 'subtitle', sizes: ['sm', 'md', 'lg'], extra: MUTED },
	{ token: 'body', sizes: ['sm', 'md', 'lg'] },
	{ token: 'label', sizes: ['sm', 'md', 'lg'] },
	{
		token: 'metric',
		sizes: ['sm', 'md', 'lg'],
		extra: { 'font-variant-numeric': 'tabular-nums' }
	},
	{ token: 'caption', sizes: ['sm', 'md', 'lg'] },
	{ token: 'eyebrow', sizes: [], extra: MUTED }
];

// The role class for a role and size: .title-md, .eyebrow
export const roleClass = (role, size) => (size ? `${role}-${size}` : role);

// Roles by the part they play in flow. Majors take the section step above
// them, minors the loose step; companions couple tight to the heading they
// sit under; the overline couples tight to the heading below it.
export const flowRoles = {
	majorHeadings: ['display', 'headline'],
	minorHeadings: ['title'],
	companions: ['subhead', 'subtitle'],
	overline: 'eyebrow',
	// A caption couples tight to the block object above it (ADR 0005). Only
	// the role classes and the aliases named here count: other aliases on the
	// caption role, such as .chart-tick and .hint-text, aren't captions.
	caption: 'caption',
	captionAliases: ['.chart-note']
};

export const flow = {
	contexts: ['spacious', 'standard', 'compact'],
	steps: ['tight', 'default', 'loose', 'section'],
	// Elements set off from their neighbours by the loose step.
	blockObjects: ['figure', 'img', 'table', 'pre', 'blockquote', '.chart'],
	// Never spaced, and never what a neighbour is spaced from.
	collapsed: ['.sr-only', '[hidden]', 'template'],
	// Utility names follow the implied-default rule (ADR 0002): `.mt-flow`, not
	// `.mt-flow-default`.
	utility: (prefix, step) => (step === 'default' ? prefix : `${prefix}-${step}`)
};

// Element styles for unclassed markup (Markdown, CMS output), hand-written in
// `file` and scoped by sd/content.js to every typeset class with `content: true`.
// They apply only under the typeset's class, never from :root, so a product
// page with no typeset class keeps the reset. `escape` opts a block out, and
// also stops the typeset's element aliases.
export const content = {
	file: 'sd/content.css',
	escape: 'not-typeset'
};

// The measure: three widths for the direct children of a typeset class
// with `measure`. Text and wide are multiples of the font size of the
// typeset's text role, so they hold their character count at every
// breakpoint and grow if the body size does; full is the container.
//
//   text  running text: paragraphs, headings, lists, quotes
//   wide  the default for the `wide` elements (figures, charts, media)
//   full  nested typesets and .not-typeset blocks
//
// 38 times body size is about 79 characters of running text in Inter, the
// widest that stays inside WCAG 1.4.8's 80; wide is about one and a half
// times that. Widths are worked out on the typeset rather than in ch on each
// element, so every child at a width shares one right edge. They are also
// set on :root, so the classes work outside a formatted typeset.
//
// `classes` set a child's width explicitly; they sit at the typeset's
// specificity and come after its defaults, so they win, and a max-width
// utility wins over both. The multiples are set here rather than in the
// export because a Figma variable can't follow the body size (ADR 0015).
export const measure = {
	widths: { text: 38, wide: 56 },
	wide: ['figure', 'img', 'video', 'iframe', 'table', 'pre', '.chart'],
	classes: {
		'width-content': 'text',
		'width-content-wide': 'wide',
		'width-content-full': 'full'
	}
};

// The .form-* classes, hand-written in `file` (sd/forms.js).
export const forms = {
	file: 'sd/forms.css'
};

export const emphasis = {
	'text-strong': 'var(--primitive-typography-font-weight-semi-bold)',
	'text-soft': 'var(--primitive-typography-font-weight-regular)'
};

export const elevation = [0, 1, 2, 3, 4, 5, 6];

/**
 * Usage aliases are read from the Figma usage export
 * (tokens/lcd-ds-usage.tokens.json, see sd/usage.js). Product aliases are
 * named {place}-{part}; places listed here contribute no prefix because their
 * part names already say where they are used (ui.card-title -> .card-title).
 * Longform keys are selectors (h1, p.lead) and are applied inside the
 * longform typeset.
 */
export const usage = {
	file: 'tokens/lcd-ds-usage.tokens.json',
	unprefixedPlaces: ['ui'],
	// Aliases that set figures in columns or on axes, given tabular numerals.
	// Each matches the alias of that name and any alias it prefixes
	// (table-col matches .table-col-head and .table-col-head-sm); an element
	// alias is matched by its selector (p.lead).
	tabularNumerals: ['chart-tick', 'table-body', 'table-col'],
	// Aliases set in the muted text colour although their role is not, matched
	// the same way: chart axis text, and the longform lead paragraph.
	muted: ['chart-axis-title', 'chart-tick', 'p.lead']
};
