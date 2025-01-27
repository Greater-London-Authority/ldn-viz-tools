import { BROWSER } from 'esm-env';
import { derived, writable, type Readable } from 'svelte/store';
import { prefersDarkMode } from '../userPreference/mediaQueryStore';

const getLocalStorage = () => {
	if (BROWSER) {
		return globalThis.localStorage?.getItem('theme') || 'light';
	}
	return 'light';
};

export type ThemeMode = 'light' | 'dark';

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
