import type { FormatFunction } from '../input/Input.svelte';

type InputMode =
	| 'none'
	| 'text'
	| 'decimal'
	| 'numeric'
	| 'tel'
	| 'search'
	| 'email'
	| 'url'
	| 'search'
	| 'tel'
	| 'url';

export interface InputOption {
	value: string;
	label: string;
	id?: string;
	name?: string;
	disabled?: boolean;
	color?: string;
	hint?: string;
	hintLabel?: string;
}

// It would be better to create types for each input type
// and specify UniformInputProps as being one of those types.
// You might be able to specify some sets of types as a single
// one, e.g. Text, URL, Email, etc.
//
// Some new types will need to be created and others modified,
// e.g. CheckboxProps currently requires all props be present
// even though most are optional,

export interface UniformInputProps {
	type: string;
	name?: string;
	required?: boolean;
	disabled?: boolean;
	id?: string;
	label?: string;
	description?: string;
	descriptionAlignment?: 'left' | 'right';
	placeholder?: string;
	color?: string;
	rows?: number | string;
	options?: InputOption[];
	hint?: string;
	hintLabel?: string;
	inputmode?: InputMode;
	format?: null | FormatFunction;
	value?: unknown;
	error?: string;
}
