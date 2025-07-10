<script lang="ts">
	import Overlay from '../overlay/Overlay.svelte';
	import Trigger from '../overlay/Trigger.svelte';
	import { randomId } from '../utils/randomId';
	import type { CheckboxProps } from './types.js';

	/**
	 * The `<Checkbox>` component provides a checkbox control as a Boolean input.
	 * It creates an `<input type="checkbox">`HTML element ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)), but enhances this with the ability to easily change the checkbox color, and add tooltips providing explanatory text.
	 * The `<CheckboxGroup>` component provides a way to create a set of `<Checkbox>` components defined by an array of objects.
	 *
	 * **Alternatives**: if representing a set of options that are mutually exclusive, use the [RadioButton](./?path=/docs/ui-components-radiobuttons-radiobutton--documentation)/[RadioButtonGroup](./?path=/docs/ui-components-radiobuttons-radiobuttongroup--documentation) component rather than the [Checkbox](./?path=/docs/ui-components--checkboxes-checkbox--documentation)/[CheckboxGroup](./?path=/docs/ui-components-checkboxes-checkboxgroup--documentation).
	 * Consider using a [Switch](./?path=/docs/ui-components-switch--documentation).
	 * @component
	 */

	let {
		/**
		 * Value set as the `id` attribute of the `<input>` element (defaults to randomly generated value).
		 */
		id = randomId(),

		/**
		 * Value set as the `name` attribute of the `<input>` element (optional, but required if providing value with a form submission)
		 */
		name = '',

		/**
		 * Color of the checkbox, as a string in any CSS color format
		 * (e.g., "LightCoral", "#FFA500", "hsl(120, 100%, 25%)", "rgb(255, 0, 0)").
		 *  The color should be selected from the design system.
		 */
		color = '',

		/**
		 * Boolean indicating whether the checkbox is currently *checked*.
		 * Can be bound to and modified from outside the component.
		 */
		checked = $bindable(false),

		/**
		 * Boolean indicating whether the checkbox is in an *indeterminate state*
		 * (indicated by a horizontal line resembling a hyphen or minus sign, rather than a check or tick).
		 * This usually indicates that a checkbox has several child checkboxes, of which some (but not all) are checked.
		 * Can be bound to and modified from outside the component.
		 */
		indeterminate = false,

		/**
		 * String appearing next to the checkbox.
		 */
		label,

		/**
		 * Boolean indicating whether the checkbox is *disabled*.
		 * If it is disabled, then the user cannot change whether it is *checked* (either using the mouse or keyboard).
		 */
		disabled = false,

		/**
		 * Optional help text that appears in a tooltip when a user interacts with the tooltip trigger.
		 * It provides additional information intended to help the user decide whether to check the checkbox.
		 */
		hint = '',

		/**
		 * Optional text that appears next to the information icon (the letter "i" in a circle) in the tooltip trigger.
		 * It provides additional clues that help text is available (e.g. "More information", "About", "Help")
		 */
		hintLabel = '',

		/**
		 * Optional help snippet passed as an overlay component when a user interacts with the overlay trigger.
		 * hint and hintLabel props are superceeded if customOverlay is supplied
		 * It provides additional information intended to help the user decide whether to check the checkbox.
		 */
		customOverlay = undefined,

		...restProps
	}: CheckboxProps = $props();
</script>

<div class="flex items-center">
	<input
		{id}
		{name}
		class="form-checkbox"
		type="checkbox"
		bind:checked
		{disabled}
		{indeterminate}
		style={color
			? `--theme-input-border: ${color}; --theme-input-background-active: ${color}; --theme-input-background-color: ${color}; --tw-ring-color: ${color};`
			: ''}
		{...restProps}
	/>

	{#if label}
		<label class="form-label ml-2 font-normal" for={id}>{label}</label>
	{/if}

	{#if hint}
		<Overlay>
			{#snippet trigger(props)}
				<Trigger {...props} size="xs" {hintLabel} />
			{/snippet}
			{hint}
		</Overlay>
	{/if}

	{#if customOverlay}
		{@render customOverlay()}
	{/if}
</div>
