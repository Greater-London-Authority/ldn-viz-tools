import tokens from '@ldn-viz/themes/styles/js/theme-tokens';
import { BROWSER } from 'esm-env';
import { derived, get, type Readable, writable } from 'svelte/store';
import { prefersDarkMode } from '../userPreference/mediaQueryStore';
import { colorToRGBArray } from '@ldn-viz/utils';

const getLocalStorage = () => {
	if (BROWSER) {
		return globalThis.localStorage?.getItem('theme') || 'light';
	}
	return 'light';
};

export type ThemeMode = 'light' | 'dark';
type ThemeObject<T> = {
	[key: string]: T | ThemeObject<T>;
};

export const userThemeSelectionStore = writable(getLocalStorage());

export const currentThemeMode: Readable<ThemeMode> = derived(
	[userThemeSelectionStore, prefersDarkMode],
	([$userThemeSelectionStore, $prefersDarkMode]) => {
		if ($userThemeSelectionStore === 'system') {
			return $prefersDarkMode ? 'dark' : 'light';
		}

		return $userThemeSelectionStore as ThemeMode;
	},
	'light'
);

export const currentTheme: Readable<ThemeObject<any>> = derived(
	currentThemeMode,
	($currentThemeMode) => {
		return tokens.theme[$currentThemeMode];
	}
);
export const tokenNameToValue = (colorName: string, theme: any) => {
	let val = theme.color;
	for (const part of colorName.split('.')) {
		val = val[part];
		if (!val) {
			console.error(`Color name "${colorName}" not defined in theme "${get(currentThemeMode)}"`);
		}
	}
	return val as unknown as string;
};
export const colorTokenNameToRGBArray = (colorName: string, theme: any) =>
	colorToRGBArray(tokenNameToValue(colorName, theme));
