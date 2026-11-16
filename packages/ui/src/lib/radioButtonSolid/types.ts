import type { IconSource } from '@steeze-ui/heroicons';
import type { Component } from 'svelte';

export interface RadioButtonSolidProps {
	id: string;
	selectedId?: RadioButtonSolidProps['id'];
	label: string;
	name?: string;
	disabled?: boolean;
	icon?: IconSource;
	RawIcon?: Component;
	iconPlacement?: 'above' | 'below';
}

/**
 * An entry in the `options` array of `RadioButtonGroupSolid`. The group passes `rawIcon` to the `RawIcon` prop of each button.
 */
export interface RadioButtonSolidOption extends Omit<RadioButtonSolidProps, 'RawIcon'> {
	rawIcon?: Component;
}
