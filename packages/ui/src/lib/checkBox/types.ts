import type { Snippet } from 'svelte';

export type CheckboxProps = {
	id: string;
	name: string;
	color: string;
	checked: boolean;
	indeterminate: boolean;
	label: string;
	disabled: boolean;
	hint: string;
	hintLabel: string;
	customOverlay?: Snippet;
};
