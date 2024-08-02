<script context="module" lang="ts">
	export interface CheckboxProps {
		id: string;
		name: string;
		color: string;
		checked: boolean;
		indeterminate: boolean;
		label: string;
		disabled: boolean;
		hint: string;
		hintLabel: string;
	}
</script>

<script lang="ts">
	/**
	 * The `<Checkbox>` component provides a checkbox control as a Boolean input.
	 * It creates an `<input type="checkbox">`HTML element ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)), but enhances this with the ability to easily change the checkbox color, and add tooltips providing explanatory text.
	 * The `<CheckboxGroup>` component provides a way to create a set of `<Checkbox>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButton](./?path=/docs/ui-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-radiobuttongroup--documentation) component rather than the [Checkbox](./?path=/docs/ui-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-checkboxgroup--documentation).
	 * Consider using a [Switch](./?path=/docs/ui-switch--documentation).
	 * @component
	 */

	import Tooltip from '../tooltip/Tooltip.svelte';
	import { randomId } from '../utils/randomId';

	/**
	 * Value set as the `id` attribute of the `<input>` element (defaults to randomly generated value).
	 */
	export let id = randomId();

	/**
	 * Value set as the `name` attribute of the `<input>` element (optional, but required if providing value with a form submission)
	 */
	export let name = '';

	/**
	 * Color of the checkbox, as a string in any CSS color format
	 * (e.g., "LightCoral", "#FFA500", "hsl(120, 100%, 25%)", "rgb(255, 0, 0)").
	 *  The color should be selected from the design system.
	 */
	export let color: CheckboxProps['color'] = '';

	/**
	 * Boolean indicating whether or not the checkbox is currently *checked*.
	 * Can be bound to and modified from outside the component.
	 */
	export let checked: CheckboxProps['checked'] = false;

	/**
	 * Boolean indicating whether or not the checkbox is in an *indeterminate state*
	 * (indicated by a horizontal line resembling a hyphen or minus sign, rather than a check or tick).
	 * This usually indicates that a checkbox has several child checkboxes, of which some (but not all) are checked.
	 * Can be bound to and modified from outside the component.
	 */
	export let indeterminate: CheckboxProps['indeterminate'] = false;

	/**
	 * String appearing next to the checkbox.
	 */
	export let label: CheckboxProps['label'];

	/**
	 * Boolean indicating whether the checkbox is *disabled*.
	 * If it is disabled, then the user cannot change whether it is *checked* (either using the mouse or keyboard).
	 */
	export let disabled: CheckboxProps['disabled'] = false;

	/**
	 * Optional help text that appears in a tooltip when a user interacts with the tooltip trigger.
	 * It provides additional information intended to help the user decide whether or not to check the checkbox.
	 */
	export let hint: CheckboxProps['hint'] = '';

	/**
	 * Optional text that appears next to the information icon (the letter "i" in a circle) in the tooltip trigger.
	 * It provides additional clues that help text is available (e.g. "More information", "About", "Help")
	 */
	export let hintLabel: CheckboxProps['hintLabel'] = '';
</script>

<label class="flex items-center">
	<input
		{id}
		{name}
		class="form-checkbox"
		type="checkbox"
		bind:checked
		{disabled}
		{indeterminate}
		on:change
		style={color
			? `--theme-input-border: ${color}; --theme-input-background-active: ${color}; --theme-input-background-color: ${color}; --tw-ring-color: ${color};`
			: ''}
		{...$$restProps}
	/>
	<span class="ml-2 form-label">{label}</span>
	{#if hint}
		<Tooltip {hintLabel}>
			{hint}
		</Tooltip>
	{/if}
</label>
