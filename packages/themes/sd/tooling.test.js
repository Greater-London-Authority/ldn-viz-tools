import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// The built outputs: tokens.json must say what tokens.css says.
const read = (file) => readFileSync(new URL(`../styles/${file}`, import.meta.url), 'utf8');
const json = JSON.parse(read('tokens.json'));
const css = read('tokens.css');

// Every declaration in one block of tokens.css, as { name: { value, references } }.
const declarations = (block) =>
	Object.fromEntries(
		[...block.matchAll(/^ {2}(--[\w-]+): (.+);$/gm)].map(([, name, raw]) => {
			const alias = raw.match(/^var\((--[\w-]+)(?:, (.+))?\)$/);
			return [name, alias ? { references: alias[1], value: alias[2] } : { value: raw }];
		})
	);

const [root, dark] = css.split(':root.dark, .dark {');
const rootProps = declarations(root);
const darkProps = declarations(dark);

describe('tokens.json', () => {
	it('holds every custom property tokens.css declares, and no others', () => {
		expect(Object.keys(json).sort()).toEqual(
			[...new Set([...Object.keys(rootProps), ...Object.keys(darkProps)])].sort()
		);
	});

	it('resolves each value to the one tokens.css writes, and names the same reference', () => {
		for (const [name, { value, references }] of Object.entries(rootProps)) {
			// The default flow ramp is written without a fallback.
			if (value !== undefined) expect(String(json[name].value), name).toBe(value);
			expect(json[name].references, name).toBe(references);
		}
	});

	it('gives a dark value wherever .dark sets one', () => {
		for (const [name, { value, references }] of Object.entries(darkProps)) {
			expect(json[name].dark, name).toEqual({ value, ...(references && { references }) });
		}
	});

	it('ends each font-family primitive in its fallback stack (ADR 0003)', () => {
		for (const name of ['default', 'display']) {
			expect(rootProps[`--primitive-typography-font-family-${name}`].value).toMatch(
				/^Inter, ui-sans-serif, .*, sans-serif, .*"Noto Color Emoji"$/
			);
		}
		expect(rootProps['--primitive-typography-font-family-code'].value).toMatch(
			/^Source Code Pro, ui-monospace, .*, monospace$/
		);
	});

	it('resolves the default flow ramp through the standard context', () => {
		expect(json['--flow-default']).toMatchObject({
			references: '--flow-standard',
			value: json['--flow-standard'].value
		});
	});
});
