import type { ComponentType } from 'svelte';
import type { Writable } from 'svelte/store';
import type { UniformInputProps } from '../uniformInput/types';

export type FormButtonhandler = (event: MouseEvent | TouchEvent) => void | Promise<unknown>;

export type FormValues = {
	[key: string]: unknown;
};

export type FormErrors = {
	[key: string]: string;
};

export type FormValueStore = Writable<FormValues>;
export type FormErrorStore = Writable<FormErrors>;
export type FormHasErrors = () => boolean;
export type FormActiveButtonStore = Writable<string>;

export interface FormFieldProps extends Omit<UniformInputProps, 'name' | 'value' | 'error'> {
	name: string;
	[key: string]: unknown;
}

export interface SchemaFormFieldProps extends Omit<UniformInputProps, 'name' | 'value' | 'error'> {
	name: string;
	exclude?: boolean;
	defaultValue?: unknown;
	[key: string]: unknown;
}

export interface SchemaFormCustomTypes {
	[key: string]: ComponentType;
}
