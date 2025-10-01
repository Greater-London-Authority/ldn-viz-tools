import { type Snippet } from 'svelte';
import type { Tab } from './../tabs/types';

export type PlacementType = 'left' | 'right' | 'bottom' | 'top';

export interface SidebarPlacement {
	initial?: PlacementType;
	sm?: PlacementType;
	md?: PlacementType;
	lg?: PlacementType;
	xl?: PlacementType;
	'2xl'?: PlacementType;
}

// Can maybe extend SidebarPlacement above
export type PlacementLookup = { [key: string]: string }; // tighten first key to literals

export type WidthLookup = { [key: string]: { [key: string]: string } }; // tighten first key to literals

export interface SidebarProps {
	/**
	 * Width of the sidebar.
	 */
	width?: 'standard' | 'wide';
	/**
	 * Position of the sidebar which can be `fixed` to the screen so it's always shown
	 * in the same screen location regardless of scroll position or `absolute`,
	 * positioned relative to the nearest parent  container with the `relative` CSS
	 * position (usually the `AppShell` component).
	 */
	position?: 'fixed' | 'absolute';

	/**
	 * Colour scheme to use, either `light` or `dark`.
	 */
	theme?: 'light' | 'dark';

	/**
	 * The placement on screen of the sidebar
	 */

	placement?: PlacementType;

	/**
	 * List of tabs. An array, of which each entry is an object with the following properties:
	 * * `id` (string): the value that will be assigned to `selectedValue` when this tab is selected
	 * * `label` (string): the text that should be displayed in the tab label
	 * * `icon` (optional): an icon component (imported from `@steeze-ui/heroicons`) that should be rendered in the tab label
	 * * `rawIcon` (optional): a Svelte component that directly renders an SVG that should be displayed in the tab label
	 * * `content`: a Svelte component that should be rendered in the sidebar when this tab is selected.
	 */
	tabs?: Tab[];

	/**
	 * `id` of the currently selected tab - defaults to first in array
	 */
	selectedTabId?: Tab['id'];

	/**
	 * Aria label to describe purpose of sidebar
	 */
	sidebarAriaLabel?: string;

	/**
	 * Aria label applied to tabs list
	 */
	tabsAriaLabel?: string;

	/**
	 * Randomly generated id for sidebar container. Used by `SidebarToggle` to tell screen readers what the toggle controls.
	 */
	sidebarId?: string;

	unstyledContent?: Snippet;

	header?: Snippet;

	footer?: Snippet;

	sections?: Snippet;

	/**
	 * Optional bindable prop that allows binding of state
	 */
	isOpen?: boolean;
}
