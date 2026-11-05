import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
	collectReferences,
	isToken,
	normaliseTokens,
	resolvePath,
	tokenName
} from './normalise.js';
import { measure } from './system.config.js';

const raw = JSON.parse(readFileSync(new URL('../tokens/lcd-ds.tokens.json', import.meta.url)));
const tree = normaliseTokens(raw);

const allTokens = (node, path = []) =>
	isToken(node)
		? [{ ...node, path }]
		: Object.entries(node).flatMap(([key, child]) => allTokens(child, [...path, key]));

const tokens = allTokens(tree);

const CATEGORIES = [
	'color',
	'spacing',
	'typography',
	'flow',
	'grid',
	'shadow',
	'elevation',
	'breakpoint'
];

describe('normaliseTokens', () => {
	it('resolves every reference', () => {
		const unresolved = collectReferences(tree).filter(
			({ ref }) => !isToken(resolvePath(tree, ref))
		);
		expect(unresolved).toEqual([]);
	});

	it('removes the semantic prefix and nothing else', () => {
		expect(Object.keys(tree).sort()).toEqual(
			['elevation', 'flow', 'color', 'grid', 'primitive', 'spacing', 'typography'].sort()
		);
		expect(Object.keys(tree.color).sort()).toEqual(['dark-mode', 'light-mode']);
		expect(tree.color['light-mode'].text.value).toBe('{color.light-mode.palette.grey.900}');
	});

	it('strips the export mode from primitive references', () => {
		expect(
			collectReferences(tree).filter(({ ref }) =>
				/^primitive\.(base|sm|md|lg|xl|2xl|mode-1|light-mode|dark-mode)\./.test(ref)
			)
		).toEqual([]);
	});

	it('collapses multi-layer shadows into one token, in layer order', () => {
		const md = tree.primitive['shadow-md'];
		expect(md.type).toBe('shadow');
		expect(md.value.map((layer) => layer.offsetY)).toEqual(['2px', '4px']);
		expect(tree.elevation['1'].type).toBe('shadow');
		expect(tokens.filter((token) => token.type === 'custom-shadow')).toEqual([]);
	});

	it('drops the measure variables, which match the widths system.css works out', () => {
		expect(tokens.filter((token) => token.path.includes('measure'))).toEqual([]);
		for (const [breakpoint, typesets] of Object.entries(raw['semantic-typography'] ?? {})) {
			for (const [typeset, roles] of Object.entries(typesets)) {
				if (!roles.measure) continue;
				const ref = tree.typography[breakpoint][typeset].body.md['font-size'].value;
				const body = resolvePath(tree, ref.slice(1, -1)).value;
				for (const [width, multiple] of Object.entries(measure.widths)) {
					expect(parseFloat(roles.measure[width].value), `${breakpoint} ${typeset} ${width}`).toBe(
						body * multiple
					);
				}
			}
		}
	});

	it('marks inner shadows as inset', () => {
		expect(tree.primitive['shadow-inner'].value.inset).toBe(true);
		expect(tree.primitive['shadow-sm'].value.inset).toBe(false);
	});
});

describe('tokenName', () => {
	// Light and dark tokens share names; the selector carries the mode.
	const named = tokens
		.filter((token) => !(token.path[0] === 'color' && token.path[1] === 'dark-mode'))
		.map((token) => ({ path: token.path.join('.'), name: tokenName(token) }));

	it('gives every token a unique name', () => {
		const seen = new Map();
		const collisions = named.filter(({ path, name }) => {
			if (seen.has(name)) return true;
			seen.set(name, path);
			return false;
		});
		expect(collisions).toEqual([]);
	});

	it('keeps negative steps distinct from positive ones', () => {
		expect(tokenName({ path: ['primitive', 'typography', 'scale', '-1'] })).toBe(
			'primitive-typography-scale--1'
		);
	});

	it('follows the naming grammar', () => {
		const category = new RegExp(`^(primitive-)?(${CATEGORIES.join('|')})(-|$)`);
		const invalid = named.filter(({ name }) => !/^[a-z0-9-]+$/.test(name) || !category.test(name));
		expect(invalid).toEqual([]);
	});

	it('drops a trailing default from semantic tokens only', () => {
		expect(tokenName({ path: ['flow', 'standard', 'default'] })).toBe('flow-standard');
		expect(tokenName({ path: ['primitive', 'typography', 'font-family', 'default'] })).toBe(
			'primitive-typography-font-family-default'
		);
	});

	it('maps collections onto the grammar', () => {
		expect(tokenName({ path: ['color', 'dark-mode', 'text-muted'] })).toBe('color-text-muted');
		expect(tokenName({ path: ['typography', 'md', 'product', 'body', 'sm', 'font-size'] })).toBe(
			'typography-md-product-body-sm-font-size'
		);
		expect(tokenName({ path: ['primitive', 'shadow-md'], type: 'shadow' })).toBe('shadow-md');
	});
});
