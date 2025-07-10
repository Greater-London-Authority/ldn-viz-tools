import type { InputProps } from '$lib/input/types';

export interface CheckboxProps extends InputProps {
	name?: string;
	color?: string;
	checked: boolean;
	indeterminate?: boolean;

	form?: string;
	'aria-controls'?: string;
}
