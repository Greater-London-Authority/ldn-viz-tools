import { BROWSER } from 'esm-env';
import { writable } from 'svelte/store';

export const mediaQueryStore = (mediaQueryString: string) => {
  const initialiseUserPrefListner = (mediaQuery: MediaQueryList, callback: () => void) => {
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', callback);
    } else {
      mediaQuery.addListener(callback);
    }
  };

  const destroyUserPrefListner = (mediaQuery: MediaQueryList, callback: () => void) => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', callback);
    } else {
      mediaQuery.removeListener(callback);
    }
  };

  const { subscribe, set } = writable(false, () => {
    if (BROWSER) {
      let mql = window.matchMedia(mediaQueryString);

      set(mql.matches);
      const onchange = () => set(mql.matches);
      initialiseUserPrefListner(mql, onchange);
      return () => {
        destroyUserPrefListner(mql, onchange);
      };
    }
  });

  return { subscribe };
};

export const prefersDarkMode = mediaQueryStore('(prefers-color-scheme:dark)');
export const prefersReducedMotion = mediaQueryStore('(prefers-reduced-motion)');
