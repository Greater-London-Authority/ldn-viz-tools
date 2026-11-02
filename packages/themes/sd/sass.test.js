import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (file) => readFileSync(new URL(`../styles/${file}`, import.meta.url), 'utf8');
const json = JSON.parse(read('tokens.json'));
const scss = read('tokens.scss');

const variables = Object.fromEntries(
	[...scss.matchAll(/^\$([\w-]+): (.+) !default;$/gm)].map(([, name, value]) => [name, value])
);

describe('tokens.scss', () => {
	it('has a variable for every custom property in tokens.json, with its resolved value', () => {
		for (const [name, { value, type }] of Object.entries(json)) {
			const want = type === 'string' ? `"${value}"` : String(value);
			expect(variables[name.slice(2)]?.replace(/^\((.*)\)$/, '$1')).toBe(want);
		}
	});

	it('writes no var() references', () => {
		expect(scss).not.toMatch(/var\(/);
	});

	it('has the mode, breakpoint, typography and grid maps', () => {
		for (const map of ['modes', 'breakpoints', 'typography', 'grid']) {
			expect(scss).toMatch(new RegExp(`^\\$${map}: \\(`, 'm'));
		}
		expect(scss).toMatch(/^\tmd: 768px,?$/m);
	});
});
