import { type Snippet } from 'svelte';
import type { ButtonProps } from '../button/types';

export type MultipleActionButtonOption = {
	id: string;
	buttonLabel: string;
	menuLabel: string;
	menuDescription: string;
	default?: boolean;
};

export type MultipleActionButtonProps = ButtonProps & {
	/**
	 * Array of options that appear in the drop-down menu. Each is defined by an object with the following properties:
	 * * `id` (string)
	 * * `buttonLabel` (string) - the label that appears in the button when this option is selected
	 * * `menuLabel` (String) - the label that appears in the drop-down menu
	 * * `menuDescription` (string) - description that appears below the label in the drop-down menu
	 * * `default` (boolean) - if `true`, then this option will initially be selected
	 */
	options: MultipleActionButtonOption[];

	/**
	 * The currently selected `option`.
	 */
	state: MultipleActionButtonOption;

	/**
	 * title that appears at the top ot the drop-down menu
	 */
	menuTitle?: string;

	/**
	 * Function that will be called when the user clicks on the button.
	 * The `id` of the currently selected option will be provided as an argument.
	 */
	onClick: (id: string) => void;

	beforeLabel?: Snippet;
	afterLabel?: Snippet;
};
