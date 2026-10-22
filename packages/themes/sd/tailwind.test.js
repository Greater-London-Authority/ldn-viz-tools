import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

// The built preset, as a Tailwind config loads it.
const require = createRequire(import.meta.url);
const presetPath = new URL('../styles/tailwind.cjs', import.meta.url).pathname;
const preset = require(presetPath);

describe('Tailwind preset', () => {
	it('adds no plugins and no classes: those are in system.css', () => {
		expect(preset.plugins).toEqual([]);
		expect(readFileSync(presetPath, 'utf8')).not.toMatch(/require\(/);
	});

	it('maps every theme value onto a custom property, with the resolved value as fallback', () => {
		const { colors, spacing, boxShadow } = preset.theme.extend;
		for (const value of [
			...Object.values(colors),
			...Object.values(spacing),
			...Object.values(boxShadow)
		]) {
			expect(value).toMatch(/^var\(--[\w-]+, .+\)$/);
		}
	});

	it('keeps the version 3 utility keys', () => {
		expect(preset.theme.extend.colors['color-surface']).toMatch(/^var\(--color-surface,/);
		expect(preset.theme.extend.colors['color-static-white']).toMatch(/^var\(--color-static-white,/);
		expect(preset.theme.extend.colors['color-static-gla-pink']).toMatch(
			/^var\(--color-static-gla-pink,/
		);
		expect(preset.theme.extend.spacing['2.5']).toMatch(/^var\(--spacing-2-5,/);
		expect(preset.theme.extend.boxShadow.DEFAULT).toMatch(/^var\(--shadow,/);
	});

	it('exposes semantic colours only (ADR 0018)', () => {
		for (const [key, value] of Object.entries(preset.theme.extend.colors)) {
			expect(value, key).not.toMatch(/^var\(--primitive-/);
		}
		expect(
			Object.keys(preset.theme.extend.colors).filter((k) => /seed|color-mode-/.test(k))
		).toEqual([]);
	});

	it("turns off Tailwind's container: .container is in system.css (ADR 0017)", () => {
		expect(preset.corePlugins).toEqual({ container: false });
		expect(preset.theme.container).toBeUndefined();
	});

	it('reads each font family from its primitive, which holds the fallback stack', () => {
		const [sans] = preset.theme.extend.fontFamily.sans;
		const [mono] = preset.theme.extend.fontFamily.mono;
		expect(sans).toMatch(
			/^var\(--primitive-typography-font-family-default, Inter, ui-sans-serif, /
		);
		expect(mono).toMatch(
			/^var\(--primitive-typography-font-family-code, Source Code Pro, ui-monospace, /
		);
	});

	it("removes Tailwind's font sizes, weights and line heights: type is set by role classes", () => {
		expect(preset.theme.fontSize).toEqual({});
		expect(preset.theme.fontWeight).toEqual({});
		expect(preset.theme.lineHeight).toEqual({});
	});

	it('takes screens from the breakpoint tokens as px, since media queries cannot read var()', () => {
		expect(preset.theme.screens).toEqual({
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px'
		});
	});
});
