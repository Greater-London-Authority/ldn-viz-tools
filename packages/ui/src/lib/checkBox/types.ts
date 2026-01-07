import type { InputProps } from '$lib/input/types';
import type { ChangeEventHandler } from 'svelte/elements';

export interface CheckboxProps extends InputProps {
	/**
	 * Color of the checkbox, as a string in any CSS color format
	 * (e.g., "LightCoral", "#FFA500", "hsl(120, 100%, 25%)", "rgb(255, 0, 0)").
	 * The color should be selected from the design system. See section on Themes.
	 */

	color?: string;

	/**
	 * Boolean indicating whether the checkbox is currently *checked*.
	 * Can be bound to and modified from outside the component.
	 */
	checked: boolean;

	/**
	 * Boolean indicating whether the checkbox is in an *indeterminate state*
	 * (indicated by a horizontal line resembling a hyphen or minus sign, rather than a check or tick).
	 * This usually indicates that a checkbox has several child checkboxes, of which some (but not all) are checked.
	 * Can be bound to and modified from outside the component.
	 */
	indeterminate?: boolean;

	'aria-controls'?: string;

	onchange?: ChangeEventHandler<HTMLInputElement>;
}
