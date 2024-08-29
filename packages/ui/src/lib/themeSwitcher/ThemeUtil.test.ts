import { describe, test, expect } from 'vitest';
import ThemeUtil from './ThemeUtil';

import tokens from '@ldn-viz/themes/styles/js/theme-tokens';
import { userThemeSelectionStore } from './themeStore';

// currentThemeMode is not writable so userThemeSelectionStore is used to
// update currentThemeMode.

describe('ThemeUtil.lookup', () => {
	test('accepts array token parts', () => {
		userThemeSelectionStore.set('light');

		const act = ThemeUtil.lookup('color', 'data', 'primary');
		expect(act).toEqual(tokens.theme.light.color.data.primary);
	});

	test('accepts dot separated token parts', () => {
		userThemeSelectionStore.set('light');

		const act = ThemeUtil.lookup('color.data.primary');
		expect(act).toEqual(tokens.theme.light.color.data.primary);
	});

	test('accepts mixture of dot separated and array token parts', () => {
		userThemeSelectionStore.set('light');

		const act = ThemeUtil.lookup('color', 'data.primary');
		expect(act).toEqual(tokens.theme.light.color.data.primary);
	});

	test('returns expected value when in light mode', () => {
		userThemeSelectionStore.set('light');

		const act = ThemeUtil.lookup('color.data.primary');
		expect(act).toEqual(tokens.theme.light.color.data.primary);
	});

	test('returns expected value when in dark mode', () => {
		userThemeSelectionStore.set('dark');

		const act = ThemeUtil.lookup('color.data.primary');
		expect(act).toEqual(tokens.theme.dark.color.data.primary);
	});
});

describe('ThemeUtil.createCategoricalDataColorNameGenerator', () => {
	test('generates expected sequence of light tokens', () => {
		userThemeSelectionStore.set('light');
		const generator = ThemeUtil.createCategoricalDataColorNameGenerator();
		const lightTokens = Object.keys(tokens.theme.light.color.data.categorical);

		let i = 0;
		for (const colorName of generator) {
			expect(colorName).toEqual(lightTokens[i]);
			i++;
		}
	});

	test('generates expected sequence of dark tokens', () => {
		userThemeSelectionStore.set('dark');
		const generator = ThemeUtil.createCategoricalDataColorNameGenerator();
		const darkTokens = Object.keys(tokens.theme.dark.color.data.categorical);

		let i = 0;
		for (const colorName of generator) {
			expect(colorName).toEqual(darkTokens[i]);
			i++;
		}
	});

	test('returns null at end of sequence', () => {
		userThemeSelectionStore.set('light');
		const generator = ThemeUtil.createCategoricalDataColorNameGenerator();

		generator.return();

		expect(generator.next()).toEqual({
			done: true,
			value: undefined
		});
	});
});

describe('ThemeUtil.createCategoricalDataColorGenerator', () => {
	test('generates expected sequence of light tokens', () => {
		userThemeSelectionStore.set('light');
		const generator = ThemeUtil.createCategoricalDataColorGenerator();
		const lightTokens = Object.values(tokens.theme.light.color.data.categorical);

		let i = 0;
		for (const color of generator) {
			expect(color).toEqual(lightTokens[i]);
			i++;
		}
	});

	test('generates expected sequence of dark tokens', () => {
		userThemeSelectionStore.set('dark');
		const generator = ThemeUtil.createCategoricalDataColorGenerator();
		const darkTokens = Object.values(tokens.theme.dark.color.data.categorical);

		let i = 0;
		for (const color of generator) {
			expect(color).toEqual(darkTokens[i]);
			i++;
		}
	});

	test('returns null at end of sequence', () => {
		userThemeSelectionStore.set('light');
		const generator = ThemeUtil.createCategoricalDataColorGenerator();

		generator.return();

		expect(generator.next()).toEqual({
			done: true,
			value: undefined
		});
	});
});
