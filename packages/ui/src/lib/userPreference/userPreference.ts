import { MediaQuery } from 'svelte/reactivity';

export const prefersDarkMode = new MediaQuery('(prefers-color-scheme:dark)');
export const prefersReducedMotion = new MediaQuery('(prefers-reduced-motion)');
