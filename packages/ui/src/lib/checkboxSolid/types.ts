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
	RawIcon?: Component;
	iconPlacement?: 'above' | 'below';
	'aria-controls'?: string;
	onchange?: ChangeEventHandler<HTMLInputElement>;
}

/**
 * An entry in the `options` array of `CheckboxGroupSolid`. The group passes `rawIcon` to the `RawIcon` prop of each checkbox.
 */
export interface CheckboxSolidOption extends Omit<CheckboxSolidProps, 'checked' | 'RawIcon'> {
	rawIcon?: Component;
}
