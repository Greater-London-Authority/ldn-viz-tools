import type { Component } from 'svelte';

export interface HeaderProps {
	/**
	 * Text of label/column heading.
	 */
	label: string;
	/**
	 * Text to display above the label (optional).
	 */
	superscriptText?: string;
	/**
	 * If `true`, then allow user to sort by clicking on header.
	 */
	allowSorting?: boolean;
	/**
	 * Current sort order (used to determine icons if `allowSorting` is `true`).
	 */
	order?: 'ascending' | 'descending' | undefined;
	/**
	 * Function called when user changes sort order.
	 */
	toggle?: (ev: Event) => void;
	/**
	 * Text to be displayed in tooltip/popover/modal after user hovers or clicks on info icon after column heading.
	 */
	hintText?: string;
	/**
	 * A Svelte component to be displayed instead of hintText.
	 */
	hintComponent?: undefined | Component;
	/**
	 * The type of overlay in which the hint will be displayed.
	 */
	hintType?: 'tooltip' | 'popover' | 'modal';
	/**
	 * The text color.
	 */
	color?: string;
	alignHeader?: 'left' | 'right' | 'center' | undefined;

	[key: string]: any;
}
