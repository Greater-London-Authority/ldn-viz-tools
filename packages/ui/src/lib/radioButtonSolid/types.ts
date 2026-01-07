import type { IconSource } from '@steeze-ui/heroicons';
import type { Component } from 'svelte';

export interface RadioButtonSolidProps {
	id: string;
	selectedId?: RadioButtonSolidProps['id'];
	label: string;
	name?: string;
	disabled?: boolean;
	icon?: IconSource;
	rawIcon?: Component;
	iconPlacement?: 'above' | 'below';
}
