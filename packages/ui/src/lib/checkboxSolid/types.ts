import type { IconSource } from '@steeze-ui/heroicons';
import type { Component } from 'svelte';
import type { ChangeEventHandler } from 'svelte/elements';

export interface CheckboxSolidProps {
	id: string;
	checked: boolean;
	label: string;
	name?: string;
	disabled?: boolean;
	icon?: IconSource;
	rawIcon?: Component;
	iconPlacement?: 'above' | 'below';
	'aria-controls'?: string;
	onchange?: ChangeEventHandler<HTMLInputElement>;
}
