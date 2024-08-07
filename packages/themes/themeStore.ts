import { browser } from '$app/environment';
import { prefersDarkMode } from '@ldn-viz/utils';
import { derived, writable, type Readable } from 'svelte/store';

const getLocalStorage = () => {
  if (browser) {
    return globalThis.localStorage?.getItem('theme') || 'light';
  }
  return 'light';
};

export const userThemeSelectionStore = writable(getLocalStorage());

export const currentThemeMode: Readable<'light' | 'dark'> = derived(
  [userThemeSelectionStore, prefersDarkMode],
  ([$userThemeSelectionStore, $prefersDarkMode]) => {
    return $userThemeSelectionStore === 'dark'
      ? 'dark'
      : $prefersDarkMode
        ? $userThemeSelectionStore === 'light'
          ? 'light'
          : 'dark'
        : 'light';
  },
  'light'
);
