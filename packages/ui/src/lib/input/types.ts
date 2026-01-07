import type { Snippet } from 'svelte';

import type {
	ChangeEventHandler,
	HTMLInputTypeAttribute,
	HTMLTextareaAttributes
} from 'svelte/elements';

export type FormatFunction = (
	value: string,
	details?: {
		name?: string;
		type?: string;
		disabled?: boolean;
	}
) => string | number;

export type InputMode =
	| 'none'
	| 'search'
	| 'text'
	| 'tel'
	| 'url'
	| 'email'
	| 'numeric'
	| 'decimal'
	| null
	| undefined;

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
}

interface InputPropsBase {
	/**
	 * The value of the input. Can be bound to and externally modified.
	 */
	value?: string;

	/**
	 * The `inputmode` of the `<input>` element, which provides a hint about what type of virtual keyboard to display.
	 */
	inputmode?: InputMode;

	/**
	 * Text that appears within the `<input>` element when no value is present.
	 */
	placeholder?: string;

	/**
	 * Function that will be applied to transform the value when the input element loses focus.
	 * By default, it trims leading and trailing whitespace (but does nothing if `type` is `password`).
	 */
	format?: null | FormatFunction;

	/**
	 * The HTML autocomplete attribute lets web developers specify what if any permission the user agent has to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.
	 *
	 * It is available on <input> elements that take a text or numeric value as input, <textarea> elements, <select> elements, and <form> elements.
	 */
	autocomplete?: 'on' | 'off' | AutoFill | null | undefined;
}

export interface InputAsTextArea
	extends
		Pick<HTMLTextareaAttributes, 'cols' | 'rows' | 'wrap'>,
		InputPropsBase,
		Omit<InputProps, 'onchange'> {
	/**
	 * The `type` of the `<input>` element (see [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)).
	 *
	 * Additionally, passing `textarea` will render a `<textarea>` instead of an `<input>`.
	 */

	type: 'textarea';
	onchange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export interface InputAsNonTextArea extends InputPropsBase, InputProps {
	/**
	 * The `type` of the `<input>` element (see [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)).
	 *
	 * Additionally, passing `textarea` will render a `<textarea>` instead of an `<input>`.
	 */
	type: Exclude<HTMLInputTypeAttribute, 'textarea'>;

	min?: string;
	max?: string;
}

export type InputComponentProps = InputAsTextArea | InputAsNonTextArea;
