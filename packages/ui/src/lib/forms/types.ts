import type { Writable } from 'svelte/store';
import type { UniformInputProps } from '../uniformInput/UniformInput.svelte';

export type FormButtonhandler = (event: MouseEvent | TouchEvent) => void | Promise<unknown>;

export type FormValues = {
	[key: string]: unknown;
};

export type FormErrors = {
	[key: string]: string;
};

export type FormValueStore = Writable<FormValues>;
export type FormErrorStore = Writable<FormErrors>;
export type FormActiveButtonStore = Writable<string>;

export interface FormFieldProps extends UniformInputProps {
	name: string;
}
