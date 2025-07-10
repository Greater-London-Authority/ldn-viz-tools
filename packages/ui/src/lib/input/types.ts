import type { Snippet } from 'svelte';
import type { ChangeEventHandler } from 'svelte/elements';

export interface InputProps {
	/**
	 * String that labels the input.
	 */
	label?: string;

	/**
	 * Value set as the `name` attribute of the `<input>` element (optional, but required if providing value with a form submission)
	 */
	name?: string;

	/**
	 * Value set as the `id` attribute of the `<input>` element (defaults to randomly generated value).
	 */
	id?: string;

	/**
	 * Text that appears below the `<input>` element, in smaller font than the `label`.
	 */
	description?: string;

	/**
	 * Determines which edge of the `<input>` the description is aligned with.
	 */
	descriptionAlignment?: 'left' | 'right';

	/**
	 * Help text to be displayed in tooltip
	 */
	hint?: string;

	/**
	 * Text to be displayed next to icon in tooltip trigger.
	 */
	hintLabel?: string;

	errorId?: string;
	descriptionId?: string;

	/**
	 * Message to be displayed below `<input>` in red text (replacing description).
	 * If set, then the border of the `<input>` is also red.
	 */
	error?: string;

	/**
	 * Boolean indicating whether the checkbox is *disabled*.
	 * If `true`, then user is prevented from interacting with the `<input>`.
	 */
	disabled?: boolean;

	/**
	 * If `false`, then `required` attribute is applied to `<input>`.
	 */
	optional?: boolean;

	form?: string;

	/**
	 * Optional help snippet passed as an overlay component when a user interacts with the overlay trigger.
	 * hint and hintLabel props are superceeded if customOverlay is supplied
	 * It provides additional information to support the users decisions.
	 */
	customOverlay?: Snippet;
	children?: Snippet;
	onchange?: ChangeEventHandler<HTMLInputElement>;
}
