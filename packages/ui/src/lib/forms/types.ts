import type { Writable } from 'svelte';

export type FormValues = {
	[key: string]: unknown;
};

export type FormErrors = {
	[key: string]: string;
};

export type FormValueStore = Writable<FormValues>;
export type FormErrorStore = Writable<FormErrors>;
export type FormActiveButtonStore = Writable<string>;
