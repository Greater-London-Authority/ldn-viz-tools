/*===============================================
  SYSTEM CLASSES (RFC 0003, workstream 3)
  Generates system.css: every class the specification names, as plain CSS
  reading the custom properties in tokens.css. Names come from
  sd/system.config.js; this file only knows the shape of each rule.

  The sheet is unlayered, and is imported before Tailwind's directives, so
  that at equal specificity a Tailwind utility still wins. Rules are emitted in
  the order that matters for equal-specificity ties:

    base, layout, typeset properties, flow contexts, typeset text,
    longform element aliases, content styles, product aliases, forms, role
    classes, emphasis,
    flow rules and utilities, elevation

  Every custom property a rule reads is checked against the dictionary, so a
  token renamed or dropped in the export fails the build instead of shipping
  a var() that resolves to nothing.
*/

import { boundary, formatContent, scopeSelector } from './content.js';
import { formatForms } from './forms.js';
import * as config from './system.config.js';

const INDENT = '  ';

const rule = (selector, declarations) => {
	const body = Object.entries(declarations)
		.map(([property, value]) => `${INDENT}${property}: ${value};`)
		.join('\n');
	return `${selector} {\n${body}\n}`;
};

const indent = (css) =>
	css
		.split('\n')
		.map((line) => (line ? INDENT + line : line))
		.join('\n');

const section = (title, rules) => `/* ${title} */\n${rules.filter(Boolean).join('\n\n')}`;

/**
 * Builds the sheet from a Style Dictionary dictionary (names already
 * transformed), the alias list from sd/usage.js and the text of the
 * hand-written sheets: { content: sd/content.css, forms: sd/forms.css }.
 */
export const formatSystem = (dictionary, aliases, sheets = {}, cfg = config) => {
	const { content = '', forms = '' } = sheets;
	const tokens = new Map(dictionary.allTokens.map((token) => [token.name, token]));

	// var(--name), after checking the token exists.
	const ref = (name) => {
		if (!tokens.has(name)) throw new Error(`system.css reads --${name}, which is not a token`);
		return `var(--${name})`;
	};
	const valueOf = (name) => (ref(name), tokens.get(name).value);

	const media = (breakpoint, css) =>
		breakpoint === 'base'
			? css
			: `@media (min-width: ${valueOf(`primitive-breakpoint-${breakpoint}`)}) {\n${indent(css)}\n}`;

	const roleSizes = cfg.roles.flatMap((role) =>
		role.sizes.length
			? role.sizes.map((size) => ({ ...role, size, className: cfg.roleClass(role.token, size) }))
			: [{ ...role, size: undefined, className: cfg.roleClass(role.token) }]
	);
	const roleClassesFor = (roleTokens) =>
		roleSizes.filter((r) => roleTokens.includes(r.token)).map((r) => `.${r.className}`);
	const aliasesFor = (roleTokens) =>
		aliases.filter((a) => roleTokens.includes(a.role)).map((a) => a.selector);
	const roleSelectors = (roleTokens) => [
		...new Set([...aliasesFor(roleTokens), ...roleClassesFor(roleTokens)])
	];

	// Every typeset class: each typeset, then its variants, which share its
	// token and text but set their own flow and content.
	const typesetClasses = cfg.typesets.flatMap((typeset) => [
		typeset,
		...(typeset.variants ?? []).map((variant) => ({
			...typeset,
			flow: undefined,
			content: undefined,
			variants: undefined,
			isDefault: false,
			...variant
		}))
	]);
	const classesOf = (typeset) =>
		typesetClasses.filter((t) => t.token === typeset.token).map((t) => `.${t.className}`);

	const tokenPath = (breakpoint, typeset, role, size, property) =>
		['typography', breakpoint, typeset, role, size, property].filter(Boolean).join('-');

	/* Base ------------------------------------------------------------- */

	const base = section('Base', [
		rule('body', { color: ref('color-text') }),
		rule(':where(*)', {
			'--outline-size': 'max(2px, 0.08em)',
			'--outline-style': 'solid',
			'--outline-color': ref('color-interactive-focus')
		}),
		rule(':where(*:focus), :where(*:focus-visible)', {
			outline: 'var(--outline-size) var(--outline-style) var(--outline-color)',
			'outline-offset': 'var(--outline-offset, var(--outline-size))'
		}),
		rule(':where(*:focus:not(:focus-visible))', { outline: 'none' })
	]);

	/* Layout ----------------------------------------------------------- */

	const responsive = (selector, property, key, extra = {}) =>
		cfg.gridBreakpoints
			.map((bp) =>
				media(
					bp,
					rule(selector, {
						...(bp === 'base' ? extra : {}),
						[property]: ref(`grid-${bp}-${key}`)
					})
				)
			)
			.join('\n');

	const layout = section('Layout', [
		// border-box: without Tailwind's preflight, width plus padding would
		// overflow the viewport.
		responsive('.container-fluid', 'padding-inline', 'fluid-container-padding', {
			'box-sizing': 'border-box',
			width: '100%',
			'margin-inline': 'auto'
		}),
		responsive('.grid-gutter', 'gap', 'contained-gutter'),
		responsive('.grid-gutter-fluid', 'gap', 'fluid-gutter')
	]);

	/* Typesets --------------------------------------------------------- */

	// Each typeset publishes every role's properties on itself, per
	// breakpoint; role classes read them, so the innermost typeset wins by
	// inheritance. Above base, a role is restated only where one of its
	// values changes, which keeps the sheet small.
	const typesetSelector = (typeset) =>
		[...(typeset.isDefault ? [':root'] : []), ...classesOf(typeset)].join(', ');

	const roleDeclarations = (bp, typeset, role) =>
		Object.fromEntries(
			cfg.roleProperties.map((property) => [
				`--${role.className}-${property}`,
				ref(tokenPath(bp, typeset.token, role.token, role.size, property))
			])
		);

	const changed = (bp, previous, typeset, role) =>
		cfg.roleProperties.some(
			(property) =>
				valueOf(tokenPath(bp, typeset.token, role.token, role.size, property)) !==
				valueOf(tokenPath(previous, typeset.token, role.token, role.size, property))
		);

	const typesetRules = cfg.breakpoints.map((bp, index) => {
		const rules = cfg.typesets
			.map((typeset) => {
				const declarations = roleSizes
					.filter((role) => index === 0 || changed(bp, cfg.breakpoints[index - 1], typeset, role))
					.reduce((all, role) => ({ ...all, ...roleDeclarations(bp, typeset, role) }), {});
				return Object.keys(declarations).length ? rule(typesetSelector(typeset), declarations) : '';
			})
			.filter(Boolean);
		return rules.length ? media(bp, rules.join('\n\n')) : '';
	});

	const typesetSection = section('Typesets', typesetRules);

	/* Flow contexts ---------------------------------------------------- */

	const { steps, contexts } = cfg.flow;
	const flowVar = (context, step) =>
		step === 'default' ? `flow-${context}` : `flow-${context}-${step}`;
	const ramp = (context) =>
		Object.fromEntries(steps.map((step) => [`--flow-${step}`, ref(flowVar(context, step))]));

	// The ramp is set on the context's children, not on the context element.
	// A context nested in another is itself a child of the outer one, so the
	// gap above it comes from the outer ramp and only its children take the
	// new density. Set on the element, the nested context's own margin would
	// read its own ramp. Descendants inherit from the child they sit in, so a
	// utility anywhere in the subtree resolves against the nearest context.
	//
	// A typeset that brings a flow context comes first, so an explicit flow
	// class on the same element wins.
	const flowContexts = section('Flow contexts', [
		...typesetClasses.filter((t) => t.flow).map((t) => rule(`.${t.className} > *`, ramp(t.flow))),
		...contexts.map((context) => rule(`.flow-${context} > *`, ramp(context)))
	]);

	/* Measure --------------------------------------------------------- */

	// A typeset caps its children, not itself, so each child takes its own
	// width: text by default, wide for block objects, and full (no cap) for
	// nested typesets and escaped blocks. The width properties are worked
	// out on the typeset from its body size, and on :root from the default
	// typeset's, so the width classes work anywhere.
	const { measure: m } = cfg;
	const measuredClasses = typesetClasses.filter((t) => t.measure);
	const measured = measuredClasses.map((t) => `.${t.className}`);
	const widthProperties = (typeset) => {
		const size = `var(--${cfg.roleClass(typeset.text.role, typeset.text.size)}-font-size)`;
		return {
			...Object.fromEntries(
				Object.entries(m.widths).map(([name, multiple]) => [
					`--measure-${name}`,
					`calc(${size} * ${multiple})`
				])
			),
			'--measure-full': 'none'
		};
	};
	const defaultTypeset = cfg.typesets.find((t) => t.isDefault);
	const full = [`.${cfg.content.escape}`, ...typesetClasses.map((t) => `.${t.className}`)];
	const children = (filter) => measured.map((s) => `${s} > :where(${filter})`).join(', ');
	const measureSection = measured.length
		? section('Measure', [
				rule(':root', widthProperties(defaultTypeset)),
				...measuredClasses.map((t) => rule(`.${t.className}`, widthProperties(t))),
				rule(children(`:not(${[...m.wide, ...full].join(', ')})`), {
					'max-width': 'var(--measure-text)'
				}),
				rule(children(m.wide.join(', ')), { 'max-width': 'var(--measure-wide)' }),
				...Object.entries(m.classes).map(([className, width]) =>
					rule(`.${className}`, { 'max-width': `var(--measure-${width})` })
				)
			])
		: '';

	/* Roles and aliases ------------------------------------------------ */

	const roleRule = (selector, role, extra = {}) =>
		rule(selector, {
			...Object.fromEntries(
				cfg.roleProperties.map((property) => [property, `var(--${role.className}-${property})`])
			),
			...(role.extra ?? {}),
			...extra
		});

	const findSize = (token, size) => {
		const role = roleSizes.find((r) => r.token === token && r.size === size);
		if (!role) throw new Error(`Unknown role: ${cfg.roleClass(token, size)}`);
		return role;
	};

	const findRole = (alias) => findSize(alias.role, alias.size);

	// A typeset with a text role sets it on itself, so bare text inside it (a
	// rendered Markdown <p>, <li>, <blockquote>) inherits that role without a
	// class. It comes before the element aliases and role classes, which win.
	// The default typeset sets its text on body, not :root: a font-size on the
	// root element would redefine rem for every rem in the system.
	const textSelector = (typeset) =>
		[...(typeset.isDefault ? ['body'] : []), ...classesOf(typeset)].join(', ');

	const typesetText = section(
		'Typeset text',
		cfg.typesets
			.filter((t) => t.text)
			.map((t) => roleRule(textSelector(t), findSize(t.text.role, t.text.size)))
	);

	// Aliases for tabular content take tabular numerals, as metric does, so
	// figures line up in a column or along an axis. Some aliases take the muted
	// text colour although their role doesn't.
	const { tabularNumerals = [], muted = [] } = cfg.usage;
	const matches = (alias, names) =>
		names.some(
			(name) =>
				alias.selector === name ||
				alias.selector === `.${name}` ||
				alias.selector.startsWith(`.${name}-`)
		);
	const aliasExtra = (alias) => ({
		...(matches(alias, tabularNumerals) ? { 'font-variant-numeric': 'tabular-nums' } : {}),
		...(matches(alias, muted) ? { color: ref('color-text-muted') } : {})
	});

	// Extras are written in the config as var(); check they read real tokens.
	for (const role of cfg.roles)
		for (const value of Object.values(role.extra ?? {}))
			for (const [, name] of value.matchAll(/var\(--([\w-]+)/g)) ref(name);

	// Element aliases and content styles reach unclassed markup inside a
	// typeset class with `content`. Both stop at the escape class and at a
	// typeset nested inside, whose own rules take over (sd/content.js).
	const scopeOf = (typeset) => {
		const selector = `.${typeset.className}`;
		const others = typesetClasses.map((t) => `.${t.className}`);
		return { selector, bounds: boundary(selector, others, cfg.content.escape) };
	};
	const contentScopes = typesetClasses.filter((t) => t.content).map(scopeOf);

	const contentScopesFor = (token) => {
		if (!cfg.typesets.some((t) => t.token === token))
			throw new Error(`Usage aliases reference an unknown typeset: ${token}`);
		return typesetClasses.filter((t) => t.token === token && t.content).map(scopeOf);
	};

	// Longform aliases are element defaults inside the longform typeset. :where()
	// keeps them at the typeset's specificity, so any role class or utility on
	// the element wins.
	const elementAliases = section(
		'Longform element aliases',
		aliases
			.filter((a) => !a.selector.startsWith('.'))
			.flatMap((a) =>
				contentScopesFor(a.typeset).map(({ selector, bounds }) =>
					roleRule(scopeSelector(a.selector, selector, bounds), findRole(a), aliasExtra(a))
				)
			)
	);

	// Hand-written element styles for unclassed markup. They may read tokens,
	// role properties and flow steps, and nothing else.
	const readable = new Set([
		...tokens.keys(),
		...roleSizes.flatMap((r) => cfg.roleProperties.map((p) => `${r.className}-${p}`)),
		...steps.map((step) => `flow-${step}`)
	]);
	const checkSheet = (file) => (name) => {
		if (!readable.has(name)) throw new Error(`${file} reads --${name}, which is not a token`);
	};

	const contentStyles = content
		? section('Content styles', [formatContent(content, contentScopes, checkSheet('content.css'))])
		: '';

	// A colour token's resolved value in one mode, for the data URIs in
	// forms.css, which can't read a custom property.
	const resolveColour = (mode, name) => {
		const token = dictionary.allTokens.find(
			(t) => t.name === name && t.path[0] === 'color' && t.path[1] === `${mode}-mode`
		);
		if (!token) throw new Error(`forms.css reads --${name} in ${mode} mode, which is not a token`);
		return token.value;
	};

	const formStyles = forms
		? section('Forms', [formatForms(forms, checkSheet('forms.css'), resolveColour)])
		: '';

	// Product aliases resolve against the nearest typeset, like role classes.
	const classAliases = section(
		'Usage aliases',
		aliases
			.filter((a) => a.selector.startsWith('.'))
			.map((a) => roleRule(a.selector, findRole(a), aliasExtra(a)))
	);

	const roleSection = section(
		'Roles',
		roleSizes.map((role) => roleRule(`.${role.className}`, role))
	);

	const emphasis = section(
		'Emphasis',
		Object.entries(cfg.emphasis).map(([className, weight]) =>
			rule(`.${className}`, { 'font-weight': weight })
		)
	);

	/* Flow rules ------------------------------------------------------- */

	// Every rule is rooted at the element declaring the context: a child
	// combinator straight after the root. A descendant combinator there would
	// reach through nested contexts and into components, at a specificity the
	// component can't easily override.
	const roots = [
		...contexts.map((c) => `.flow-${c}`),
		...typesetClasses.filter((t) => t.flow).map((t) => `.${t.className}`)
	];
	const root = `:is(${roots.join(', ')})`;
	const collapsed = cfg.flow.collapsed.join(', ');
	const visible = `:not(${collapsed})`;
	const unset = ':not([class*="mt-flow-"])';
	const is = (selectors) => `:is(${selectors.join(', ')})`;

	const { majorHeadings, minorHeadings, companions, overline } = cfg.flowRoles;
	const major = is(roleSelectors(majorHeadings));
	const minor = is(roleSelectors(minorHeadings));
	const heading = is(roleSelectors([...majorHeadings, ...minorHeadings]));
	const companion = is(roleSelectors(companions));
	const eyebrow = is(roleSelectors([overline]));
	const blocks = is(cfg.flow.blockObjects);

	const margin = (step) => ({ 'margin-top': `var(--flow-${step})` });

	const flowRules = section('Flow rules', [
		// 0 · flow owns the block margins of its children. Browser defaults (1em
		// on p, figure, ul, dl) would otherwise collapse with the flow margin and
		// swallow any step smaller than them; Tailwind's preflight used to hide
		// this. :where() keeps it at zero specificity, so any class still wins.
		rule(`:where(${roots.join(', ')}) > *`, { 'margin-block': '0' }),
		// 1 · every visible sibling gets the default step
		rule(`${root} > ${visible} + :not(${collapsed}, [class*="mt-flow-"])`, margin('default')),
		// 2 · block objects are set off above and below
		rule(`${root} > ${visible} + ${blocks}${unset}`, margin('loose')),
		rule(`${root} > ${blocks} + :not(${collapsed}, [class*="mt-flow-"])`, margin('loose')),
		// 3 · space before headings: major and minor
		rule(`${root} > ${visible} + ${major}${unset}`, margin('section')),
		rule(`${root} > ${visible} + ${minor}${unset}`, margin('loose')),
		// 4 · stacked headings group tightly
		rule(`${root} > ${heading} + ${heading}${unset}`, margin('tight')),
		// 4b · a companion hugs the heading above it; an eyebrow hugs the heading
		// below it, and the section step moves above the eyebrow
		rule(`${root} > ${heading} + ${companion}${unset}`, margin('tight')),
		rule(`${root} > ${eyebrow} + ${heading}${unset}`, margin('tight')),
		rule(`${root} > ${visible} + ${eyebrow}${unset}:has(+ ${major})`, margin('section')),
		// 5 · a caption binds to its figure
		rule(`${root} > figure > figcaption`, margin('tight')),
		// 6 · lists that are direct children of the root keep their own rhythm
		rule(`${root} > :is(ul, ol) li + li`, margin('tight')),
		rule(`${root} > :is(ul, ol) li > :is(ul, ol)`, margin('tight')),
		rule(`${root} > dl > dd`, margin('tight')),
		rule(`${root} > dl > dt`, margin('default')),
		rule(`${root} > dl > dt:first-child`, { 'margin-top': '0' })
	]);

	// Utilities carry a relationship, never a density: the value comes from
	// the context in scope.
	const flowUtilities = section('Flow utilities', [
		...steps.map((step) => rule(`.mt-flow-${step}`, margin(step))),
		...steps.map((step) => rule(`.gap-flow-${step}`, { gap: `var(--flow-${step})` }))
	]);

	/* Elevation -------------------------------------------------------- */

	const elevation = section(
		'Elevation',
		cfg.elevation.map((step) =>
			rule(`.elevation-${step}`, { 'box-shadow': ref(`elevation-${step}`) })
		)
	);

	return [
		base,
		layout,
		typesetSection,
		flowContexts,
		measureSection,
		typesetText,
		elementAliases,
		contentStyles,
		classAliases,
		formStyles,
		roleSection,
		emphasis,
		flowRules,
		flowUtilities,
		elevation
	]
		.filter(Boolean)
		.join('\n\n');
};
