import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { isToken, normaliseTokens, tokenName } from './normalise.js';
import { boundary, scopeSelector } from './content.js';
import { formatReset } from './reset.js';
import { formatSystem } from './system.js';
import * as config from './system.config.js';
import { readUsage } from './usage.js';

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url)));

const tree = normaliseTokens(read('../tokens/lcd-ds.tokens.json'));
const usageJson = read('../tokens/lcd-ds-usage.tokens.json');
const aliases = readUsage(usageJson, config.usage);

const allTokens = (node, path = []) =>
	isToken(node)
		? [{ ...node, path, name: tokenName({ ...node, path }) }]
		: Object.entries(node).flatMap(([key, child]) => allTokens(child, [...path, key]));

const content = readFileSync(new URL('./content.css', import.meta.url), 'utf8');
const dictionary = { allTokens: allTokens(tree) };
const forms = readFileSync(new URL('./forms.css', import.meta.url), 'utf8');
const css = formatSystem(dictionary, aliases, { content, forms });

const hasClass = (name) => new RegExp(`\\.${name}(?![\\w-])`).test(css);

describe('readUsage', () => {
	const bySelector = Object.fromEntries(aliases.map((a) => [a.selector, a]));

	it('maps each alias to the role its properties reference', () => {
		expect(bySelector['.card-title']).toMatchObject({
			typeset: 'product',
			role: 'title',
			size: 'sm'
		});
		expect(bySelector['.chart-tick']).toMatchObject({ role: 'caption', size: 'md' });
		const longform = (selector) =>
			aliases.find((a) => a.typeset === 'longform' && a.selector === selector);
		expect(longform('h1')).toMatchObject({ role: 'headline', size: 'lg' });
		expect(longform('p.lead')).toMatchObject({ role: 'body', size: 'lg' });
	});

	it('names product aliases {place}-{part}, without the unprefixed places', () => {
		expect(bySelector['.table-col-head']).toBeDefined();
		expect(bySelector['.ui-card-title']).toBeUndefined();
	});

	it('gives every alias a unique selector within its typeset', () => {
		const selectors = aliases.map((a) => `${a.typeset} ${a.selector}`);
		expect(new Set(selectors).size).toBe(selectors.length);
	});

	describe('product element aliases', () => {
		const style = (role) => ({
			$value: { fontSize: `{semantic-typography.product.${role}.font-size}` }
		});
		const product = (tree) => readUsage({ Usage: { product: tree } });

		it('reads styles in the formatted group as element selectors', () => {
			const read = product({
				formatted: { h2: style('headline.sm') },
				card: { title: style('title.sm') }
			});
			expect(read.map((a) => a.selector)).toEqual(['h2', '.card-title']);
		});

		it('never turns an element into a class', () => {
			expect(() => product({ h2: style('headline.sm') })).toThrow(/needs a place/);
			expect(() => product({ formatted: { h: { x: style('title.sm') } } })).toThrow(
				/needs a place/
			);
		});

		it('styles them only inside typeset-product--formatted', () => {
			const withH2 = structuredClone(usageJson);
			withH2.Usage.product.formatted = {
				h2: {
					$value: Object.fromEntries(
						['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'].map((k) => [
							k,
							`{semantic-typography.product.headline.sm.${k.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}}`
						])
					)
				}
			};
			const out = formatSystem(dictionary, readUsage(withH2, config.usage), { content, forms });
			const scopes = [...out.matchAll(/^(\.[\w-]+) :where\(h2\)/gm)].map((m) => m[1]);
			expect(scopes).toContain('.typeset-product--formatted');
			expect(scopes).not.toContain('.typeset-product');
			expect(out).not.toMatch(/\.h2[\s,{]/);
		});
	});

	it('rejects an alias that references more than one role', () => {
		const mixed = {
			Usage: {
				product: {
					card: {
						title: {
							$value: {
								fontSize: '{semantic-typography.product.title.sm.font-size}',
								fontWeight: '{semantic-typography.product.body.sm.font-weight}'
							}
						}
					}
				}
			}
		};
		expect(() => readUsage(mixed)).toThrow(/more than one role/);
	});
});

describe('layout', () => {
	it('centres .container and steps its width up to each breakpoint (ADR 0017)', () => {
		expect(css).toMatch(
			/\n\.container \{\n {2}box-sizing: border-box;\n {2}width: 100%;\n {2}margin-inline: auto;\n {2}padding-inline: var\(--grid-base-contained-container-padding\);/
		);
		for (const bp of ['sm', 'md', 'lg', 'xl', '2xl']) {
			expect(css).toContain(
				`  .container {\n    max-width: var(--primitive-breakpoint-${bp});\n    padding-inline: var(--grid-${bp}-contained-container-padding);`
			);
		}
	});
});

describe('caption coupling (ADR 0005)', () => {
	it('gives a caption after a block object the tight step', () => {
		const rule = css.match(/\n([^\n]*\) \+ :is\(\.caption-sm[^{]*) \{\n {2}margin-top: ([^;]+);/);
		expect(rule[1]).toContain(':is(figure, img, table, pre, blockquote, .chart) + ');
		expect(rule[1]).toContain(':is(.caption-sm, .caption-md, .caption-lg, .chart-note)');
		expect(rule[2]).toBe('var(--flow-tight)');
	});

	it('spaces a table caption from its table by the tight step', () => {
		expect(css).toMatch(/:where\(caption\)[^{]*\{[^}]*padding-bottom: var\(--flow-tight\);/);
	});
});

describe('formatSystem', () => {
	it('emits every class the specification names', () => {
		const roleClasses = config.roles.flatMap((role) =>
			role.sizes.length
				? role.sizes.map((size) => config.roleClass(role.token, size))
				: [config.roleClass(role.token)]
		);
		const expected = [
			...config.typesets.map((t) => t.className),
			...roleClasses,
			...config.flow.contexts.map((c) => `flow-${c}`),
			...config.flow.steps.flatMap((s) =>
				['mt-flow', 'gap-flow'].map((p) => config.flow.utility(p, s))
			),
			...Object.keys(config.emphasis),
			...config.elevation.map((n) => `elevation-${n}`),
			'container-fluid',
			'grid-gutter',
			'grid-gutter-fluid',
			...aliases.filter((a) => a.selector.startsWith('.')).map((a) => a.selector.slice(1))
		];
		expect(expected.filter((name) => !hasClass(name))).toEqual([]);
	});

	it('only reads custom properties that exist, unless it gives a fallback', () => {
		const tokenNames = new Set(dictionary.allTokens.map((t) => t.name));
		const defined = new Set([...css.matchAll(/(--[\w-]+):/g)].map(([, name]) => name.slice(2)));
		const read = [...css.matchAll(/var\(--([\w-]+)\)/g)].map(([, name]) => name);
		expect(read.filter((name) => !tokenNames.has(name) && !defined.has(name))).toEqual([]);
	});

	it('sets the default typeset on :root', () => {
		expect(css).toMatch(/:root, \.typeset-product, \.typeset-product--formatted \{/);
	});

	it('gives the longform typeset the spacious flow ramp', () => {
		expect(css).toMatch(
			/\.typeset-longform > \* \{\n {2}--flow-tight: var\(--flow-spacious-tight\);/
		);
	});

	it('names the default flow utility without the step, and lets it override the owl', () => {
		expect(css).toMatch(/^\.mt-flow \{/m);
		expect(css).toMatch(/^\.gap-flow \{/m);
		expect(css).not.toMatch(/\.(mt|gap)-flow-default\b/);
		expect(css).toContain(':not(.sr-only, [hidden], template, .mt-flow, [class*="mt-flow-"])');
	});

	it('gives metric roles and tabular aliases tabular numerals', () => {
		const tabular = (selector) =>
			new RegExp(
				`\\n${selector.replace('.', '\\.')} \\{[^}]*font-variant-numeric: tabular-nums`
			).test(css);
		for (const selector of [
			'.metric-lg',
			'.chart-tick',
			'.chart-tick-sm',
			'.table-body',
			'.table-col-head',
			'.table-col-head-sm'
		]) {
			expect(tabular(selector), selector).toBe(true);
		}
		expect(tabular('.chart-title')).toBe(false);
	});

	it('sets body text on the longform typeset, so bare markup needs no class', () => {
		expect(css).toMatch(/\n\.typeset-longform \{\n {2}font-family: var\(--body-md-font-family\);/);
	});

	it('sets product body text on body, never on :root, so rem is unchanged', () => {
		expect(css).toMatch(
			/\nbody, \.typeset-product, \.typeset-product--formatted \{\n {2}font-family: var\(--body-md-font-family\);/
		);
		expect(css).not.toMatch(/:root[^{]*\{[^}]*\n {2}font-size:/);
	});

	it('fails when a token it reads is missing', () => {
		const missing = {
			allTokens: dictionary.allTokens.filter((t) => t.name !== 'elevation-3')
		};
		expect(() => formatSystem(missing, aliases)).toThrow(/--elevation-3/);
	});
});

describe('formatReset', () => {
	const reset = formatReset(dictionary);

	it('removes list markers and spacing, as preflight does', () => {
		expect(reset).toMatch(/:where\(ol, ul, menu\) \{\n {2}list-style: none;/);
	});

	it('keeps every element selector at zero specificity', () => {
		const selectors = [...reset.matchAll(/^([^\s{}][^{}]*) \{/gm)].map((m) => m[1]);
		for (const selector of selectors) {
			for (const part of selector.split(/,\s*(?![^()]*\))/)) {
				expect(part.startsWith(':where(') || part.startsWith('::'), part).toBe(true);
			}
		}
	});

	it('fails when a token it reads is missing', () => {
		const missing = { allTokens: dictionary.allTokens.filter((t) => t.name !== 'color-border') };
		expect(() => formatReset(missing)).toThrow(/--color-border/);
	});
});

describe('content styles', () => {
	const longform = '.typeset-longform';
	const product = '.typeset-product';
	const formatted = '.typeset-product--formatted';
	const bounds = boundary(longform, [longform, product, formatted], 'not-typeset');

	it('stops at the escape and at a different nested typeset, not the same one', () => {
		expect(bounds).toBe(
			'.not-typeset, .not-typeset *, .typeset-longform :is(.typeset-product, .typeset-product--formatted), .typeset-longform :is(.typeset-product, .typeset-product--formatted) *'
		);
	});

	it('wraps the selector in :where() and moves a pseudo-element after the boundary', () => {
		expect(scopeSelector('ul li::marker', longform, bounds)).toBe(
			`${longform} :where(ul li):not(:where(${bounds}))::marker`
		);
	});

	it('scopes every rule to longform and formatted product, never to plain product', () => {
		const section = css.slice(
			css.indexOf('/* Content styles */'),
			css.indexOf('/* Usage aliases */')
		);
		const selectors = [...section.matchAll(/^\s*([^\s{}/@][^{}]*?)\s*\{/gm)].flatMap(([, list]) =>
			list.split(/,\n\s*/)
		);
		expect(selectors.length).toBeGreaterThan(0);
		for (const selector of selectors) {
			expect(selector, selector).toMatch(
				/^\.typeset-(longform|product--formatted) :where\(.+\):not\(:where\(\.not-typeset, /
			);
		}
		expect(section).toMatch(/@media print \{\n {2}\.typeset-longform :where\(pre\)/);
	});

	it('gives formatted product the standard flow ramp; plain product has none', () => {
		expect(css).toMatch(
			/\.typeset-product--formatted > \* \{\n {2}--flow-tight: var\(--flow-standard-tight\);/
		);
		expect(css).not.toMatch(/\.typeset-product > \* \{/);
	});

	it('never applies from :root, so an unclassed product page keeps the reset', () => {
		expect(css).not.toMatch(/:root :where\(/);
	});

	it('stops the element aliases at the same boundary', () => {
		expect(css).toContain(`${longform} :where(h1):not(:where(${bounds})) {`);
	});

	it('fails when the stylesheet reads a custom property that is not a token', () => {
		expect(() =>
			formatSystem(dictionary, aliases, { content: 'a { color: var(--color-link); }' })
		).toThrow(/--color-link/);
	});

	it('allows role properties and flow steps', () => {
		const sheet = 'p { font-size: var(--body-sm-font-size); margin-top: var(--flow-tight); }';
		expect(() => formatSystem(dictionary, aliases, { content: sheet })).not.toThrow();
	});
});

describe('form styles', () => {
	const section = css.slice(css.indexOf('/* Forms */'), css.indexOf('/* Roles */'));

	it('writes every .form-* class without Tailwind', () => {
		for (const name of [
			'form-input',
			'form-textarea',
			'form-select',
			'form-multiselect',
			'form-checkbox',
			'form-radio',
			'form-label',
			'form-range'
		]) {
			expect(section, name).toMatch(new RegExp(`\\.${name}(?![\\w-])`));
		}
		expect(section).not.toMatch(/--tw-/);
	});

	it('draws the select chevron in each mode from the resolved token', () => {
		expect(section).not.toMatch(/chevron\(/);
		const token = (mode, value) => ({
			name: 'color-chevron',
			path: ['color', `${mode}-mode`, 'chevron'],
			value
		});
		const withChevron = {
			allTokens: [...dictionary.allTokens, token('light', '#111111'), token('dark', '#eeeeee')]
		};
		const forms = `.form-select { background-image: chevron(light, --color-chevron); }
.dark .form-select { background-image: chevron(dark, --color-chevron); }`;
		const out = formatSystem(withChevron, aliases, { forms });
		expect(out).toContain("stroke='%23111111'");
		expect(out).toContain("stroke='%23eeeeee'");
	});

	it('fails when a chevron names a colour that is not a token', () => {
		const forms = '.form-select { background-image: chevron(dark, --color-nope); }';
		expect(() => formatSystem(dictionary, aliases, { forms })).toThrow(/--color-nope/);
	});
});

describe('muted colour', () => {
	const ruleFor = (selector) => {
		const start = css.indexOf(`\n${selector} {`);
		return css.slice(start, css.indexOf('}', start));
	};

	it('sets secondary roles, and their aliases, in the muted text colour', () => {
		for (const selector of ['.subtitle-sm', '.subhead-lg', '.eyebrow', '.card-subtitle']) {
			expect(ruleFor(selector), selector).toContain('color: var(--color-text-muted);');
		}
		expect(ruleFor('.title-sm')).not.toContain('color:');
	});

	it('sets chart axis text and the lead paragraph muted, though their roles are not', () => {
		for (const selector of ['.chart-axis-title', '.chart-tick', '.chart-tick-sm']) {
			expect(ruleFor(selector), selector).toContain('color: var(--color-text-muted);');
		}
		expect(ruleFor('.body-lg')).not.toContain('color:');
		expect(css).toMatch(/:where\(p\.lead\)[^{]*\{[^}]*color: var\(--color-text-muted\);/);
	});
});

describe('measure', () => {
	const section = css.slice(css.indexOf('/* Measure */'), css.indexOf('/* Typeset text */'));

	it('sets text and wide as multiples of body size on each formatted typeset and :root', () => {
		for (const selector of [':root', '.typeset-longform', '.typeset-product--formatted']) {
			expect(section, selector).toContain(
				`${selector} {\n  --measure-text: calc(var(--body-md-font-size) * 38);\n  --measure-wide: calc(var(--body-md-font-size) * 56);\n  --measure-full: none;\n}`
			);
		}
	});

	it('caps running text at text and block objects at wide; nested typesets and escapes are uncapped', () => {
		const text = section.match(
			/\.typeset-longform > :where\(:not\(([^)]*)\)\)[^{]*\{\n {2}max-width: var\(--measure-text\);/
		);
		expect(text).toBeTruthy();
		for (const selector of [
			'figure',
			'table',
			'pre',
			'.chart',
			'.not-typeset',
			'.typeset-product'
		]) {
			expect(text[1].split(', '), selector).toContain(selector);
		}
		expect(section).toMatch(
			/\.typeset-longform > :where\(figure, img, video, iframe, table, pre, \.chart\)[^{]*\{\n {2}max-width: var\(--measure-wide\);/
		);
		expect(section).not.toMatch(/\.typeset-product > :where/);
	});

	it('gives every width a class, after the defaults so it wins', () => {
		const at = (s) => section.indexOf(s);
		for (const [name, width] of [
			['width-content', 'text'],
			['width-content-wide', 'wide'],
			['width-content-full', 'full']
		]) {
			expect(section, name).toContain(`.${name} {\n  max-width: var(--measure-${width});\n}`);
			expect(at(`.${name} {`), name).toBeGreaterThan(at('max-width: var(--measure-wide)'));
		}
		expect(section).not.toMatch(/\.breakout/);
	});
});
