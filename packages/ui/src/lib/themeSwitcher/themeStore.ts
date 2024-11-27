import { browser } from '$app/environment';
import { prefersDarkMode } from '../userPreference/mediaQueryStore';
import { derived, writable, type Readable } from 'svelte/store';

export type UserThemeSelection = 'light' | 'dark' | 'system';
export type ThemeMode = 'light' | 'dark';

const getLocalStorage = () => {
	if (browser) {
		return (globalThis.localStorage?.getItem('theme') as UserThemeSelection) || 'light';
	}
	return 'light';
};

export const userThemeSelectionStore = writable<UserThemeSelection>(getLocalStorage());

export const currentThemeMode: Readable<ThemeMode> = derived(
	[userThemeSelectionStore, prefersDarkMode],
	([$userThemeSelectionStore, $prefersDarkMode]) => {
		if ($userThemeSelectionStore === 'system') {
			return $prefersDarkMode ? 'dark' : 'light';
		}

		return $userThemeSelectionStore;
	},
	'light'
);
