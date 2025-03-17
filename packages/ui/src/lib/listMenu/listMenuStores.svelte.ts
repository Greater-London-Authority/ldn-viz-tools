import { writable } from 'svelte/store';

export const isExpanded = writable(false);

export const isActive = writable(false);

export const selectedValue = writable('');
