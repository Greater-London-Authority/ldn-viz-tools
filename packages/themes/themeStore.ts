import { prefersDarkMode } from '@ldn-viz/ui';
import { BROWSER } from 'esm-env';
import { derived, writable, type Readable } from 'svelte/store';

const getLocalStorage = () => {
  if (BROWSER) {
    return globalThis.localStorage?.getItem('theme') || 'system';
  }
  return 'light';
};

export const userThemeSelectionStore = writable(getLocalStorage());

export const currentThemeMode: Readable<'light' | 'dark'> = derived(
  [userThemeSelectionStore, prefersDarkMode],
  ([$userThemeSelectionStore, $prefersDarkMode]) => {
    if ($userThemeSelectionStore === 'system') {
      return $prefersDarkMode ? 'dark' : 'light';
    }

    return $userThemeSelectionStore;
  },
  'light'
);
