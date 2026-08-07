import tokens from '@ldn-viz/themes/styles/js/color-tokens.js';
import { describe, expect, it } from 'vitest';
import { theme } from './themeState.svelte';

// themeState uses Svelte runes and mode-watcher, so this runs in the browser
// (client) test project. We pass an explicit theme object to the lookups so the
// assertions do not depend on the ambient colour-scheme mode.
const lightTheme = (tokens as any).mode.light;

describe('theme (ThemeState)', () => {
	it('resolves a token name to its value for the supplied theme', () => {
		// `text` is an object whose `default` entry is the resolved colour.
		expect(theme.tokenNameToValue('text', lightTheme)).toBe(lightTheme.text.default);
	});

	it('resolves a nested token name', () => {
		expect(theme.tokenNameToValue('text.muted', lightTheme)).toBe(lightTheme.text.muted);
	});

	it('returns an [r, g, b] array for a valid colour token', () => {
		const rgb = theme.colorTokenNameToRGBArray('text', lightTheme);
		expect(rgb).toHaveLength(3);
		rgb.forEach((channel) => {
			expect(channel).toBeGreaterThanOrEqual(0);
			expect(channel).toBeLessThanOrEqual(255);
		});
	});

	it('returns undefined for an unknown top-level token name', () => {
		expect(theme.tokenNameToValue('definitely-not-a-token', lightTheme)).toBeUndefined();
	});
});
